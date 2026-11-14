import fs from 'fs';

async function downloadMathUnion() {
  const url = 'https://www.mathunion.org/fileadmin/ICMI/files/Other_activities/Database/Cambodia/Math-Curiculum_Grades_1_-_9.pdf';
  console.log('Downloading from mathunion.org...');
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  console.log('Status:', res.status, 'Content-Type:', res.headers.get('content-type'));
  const buf = await res.arrayBuffer();
  fs.writeFileSync('research/Math-Curiculum_Grades_1_-_9.pdf', Buffer.from(buf));
  console.log(`Saved Math-Curiculum_Grades_1_-_9.pdf, size: ${buf.byteLength} bytes`);
}

downloadMathUnion();
