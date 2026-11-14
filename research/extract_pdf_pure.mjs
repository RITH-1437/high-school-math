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
      // not flate compressed or partial
      decompressed = rawStream;
    }

    const streamStr = decompressed.toString('utf8');
    // Extract text inside ( ... ) Tj or [ ... ] TJ
    const textMatches = streamStr.match(/\(([^)]+)\)\s*Tj/g);
    if (textMatches) {
      for (const tm of textMatches) {
        const t = tm.replace(/^\(/, '').replace(/\)\s*Tj$/, '');
        if (t.trim()) allText.push(t);
      }
    }
  }

  return allText;
}

const file = 'research/Math-Curiculum_Grades_1_-_9.pdf';
if (fs.existsSync(file)) {
  const buf = fs.readFileSync(file);
  console.log(`Reading ${file} (${buf.length} bytes)...`);
  const words = extractTextFromPdfBuffer(buf);
  console.log(`Extracted ${words.length} text fragments.`);
  console.log('Sample:', words.slice(0, 50).join(' '));
} else {
  console.log('File does not exist:', file);
}
