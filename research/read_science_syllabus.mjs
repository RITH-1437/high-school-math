import fs from 'fs';
import zlib from 'zlib';

function extractText(file) {
  const buf = fs.readFileSync(file);
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

const words = extractText('research/MoEYS_2018_Syllabus_Upper_Secondary_Science_Track.pdf');
console.log('Extracted fragments:', words.length);
if (words.length > 0) {
  fs.writeFileSync('research/MoEYS_2018_Science_Track_text.txt', words.join('\n'), 'utf8');
  console.log('Sample text (first 30 fragments):');
  console.log(words.slice(0, 30).join(' '));
} else {
  console.log('No direct Tj/TJ text found, checking image vs font internals:');
  const buf = fs.readFileSync('research/MoEYS_2018_Syllabus_Upper_Secondary_Science_Track.pdf');
  const str = buf.toString('latin1');
  console.log('Images:', (str.match(/\/Subtype\s*\/Image/g) || []).length);
  console.log('Fonts:', (str.match(/\/Type\s*\/Font/g) || []).length);
}
