import fs from 'fs';

async function downloadSyllabus(name, url, bytes = 1000000) {
  console.log(`Downloading ${name} (${bytes} bytes)...`);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Range': `bytes=0-${bytes}`
    }
  });
  console.log(`${name} status:`, res.status, res.headers.get('content-range'));
  const buf = await res.arrayBuffer();
  const file = `research/syllabus_${name}.pdf`;
  fs.writeFileSync(file, Buffer.from(buf));
  console.log(`Saved ${file} (${buf.byteLength} bytes)`);
}

async function run() {
  await downloadSyllabus('upper_science', 'https://api.saladigital.org/public/books/672b182eab57f5b6c7c6fe8d/b1651a06-a0e3-4bd0-a2ca-290357473f28.pdf');
  await downloadSyllabus('upper_social', 'https://api.saladigital.org/public/books/672b186fab57f5b6c7c70fe8f/942f21c5-183e-4f33-bea8-ea5a5ee371fb.pdf');
}

run();
