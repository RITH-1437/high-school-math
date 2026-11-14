import fs from 'fs';
import zlib from 'zlib';

function checkPdfType(file) {
  if (!fs.existsSync(file)) return console.log('Missing:', file);
  const buf = fs.readFileSync(file);
  const str = buf.toString('latin1');
  const hasImages = (str.match(/\/Subtype\s*\/Image/g) || []).length;
  const hasFonts = (str.match(/\/Type\s*\/Font/g) || []).length;
  const hasTextStreams = (str.match(/BT[\s\S]*?ET/g) || []).length;
  console.log(`${file}:`);
  console.log(`  Size: ${buf.length} bytes`);
  console.log(`  Images: ${hasImages}`);
  console.log(`  Fonts: ${hasFonts}`);
  console.log(`  BT/ET text blocks: ${hasTextStreams}`);
}

checkPdfType('research/sample_g10_p1.pdf');
checkPdfType('research/sample_g11_adv.pdf');
checkPdfType('research/sample_g12_adv.pdf');
