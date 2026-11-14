import fs from 'fs';

async function downloadFull(name, url) {
  console.log(`Downloading full ${name}...`);
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  console.log(`${name} status:`, res.status, res.headers.get('content-type'), res.headers.get('content-length'));
  if (res.ok) {
    const buf = await res.arrayBuffer();
    const file = `research/MoEYS_2018_Syllabus_${name}.pdf`;
    fs.writeFileSync(file, Buffer.from(buf));
    console.log(`✓ Saved ${file} (${buf.byteLength} bytes)`);
  }
}

async function run() {
  await downloadFull(
    'Upper_Secondary_Science_Track',
    'https://api.saladigital.org/public/books/672b182eab57f5b6c7c6fe8d/b1651a06-a0e3-4bd0-a2ca-290357473f28.pdf'
  );
  await downloadFull(
    'Upper_Secondary_Social_Science_Track',
    'https://api.saladigital.org/public/books/672b186fab57f5b6c7c6fe8f/942f21c5-183e-4f33-bea8-ea5a5ee371fb.pdf'
  );
}

run();
