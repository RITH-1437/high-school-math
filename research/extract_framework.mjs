import fs from 'fs';
import zlib from 'zlib';

function extractTextFromPdfBuffer(buf) {
  const str = buf.toString('latin1');
  const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
  let match;
  let allText = [];

  while ((match = streamRegex.exec(str)) !== null) {
    const rawStream = Buffer.from(match[1], 'latin1');
    let decompressed;
    try {
      decompressed = zlib.inflateSync(rawStream);
    } catch (e) {
      decompressed = rawStream;
    }

    const streamStr = decompressed.toString('utf8');
    const textMatches = streamStr.match(/\(([^)]+)\)\s*Tj/g);
    if (textMatches) {
      for (const tm of textMatches) {
        const t = tm.replace(/^\(/, '').replace(/\)\s*Tj$/, '');
        if (t.trim()) allText.push(t);
      }
    }
    const tjMatches = streamStr.match(/\[([^\]]+)\]\s*TJ/g);
    if (tjMatches) {
      for (const tm of tjMatches) {
        const inner = tm.replace(/^\[/, '').replace(/\]\s*TJ$/, '');
        const strings = inner.match(/\(([^)]+)\)/g) || [];
        const combined = strings.map(s => s.slice(1, -1)).join('');
        if (combined.trim()) allText.push(combined);
      }
    }
  }

  return allText;
}

const file = 'research/Cambodia_Curriculum_Framework_2016_English.pdf';
if (fs.existsSync(file)) {
  const buf = fs.readFileSync(file);
  console.log(`Reading ${file} (${buf.length} bytes)...`);
  const words = extractTextFromPdfBuffer(buf);
  console.log(`Extracted ${words.length} text fragments.`);
  console.log('Sample:', words.slice(0, 50).join(' '));
  fs.writeFileSync('research/framework_2016_extracted.txt', words.join('\n'), 'utf8');
}
