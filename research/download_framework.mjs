import fs from 'fs';

async function downloadCurriculumFramework() {
  const url = 'https://data.opendevelopmentcambodia.net/en/dataset/e1fdd9b1-7e42-4cff-b91d-8631459e3063/resource/aa78b1a2-3c5c-4ce2-8277-7ed10fa71750/download/document-13.pdf';
  console.log('Downloading Curriculum Framework PDF...');
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, redirect: 'follow' });
    console.log('Status:', res.status, 'Type:', res.headers.get('content-type'));
    const buf = await res.arrayBuffer();
    fs.writeFileSync('research/Cambodia_Curriculum_Framework_2016_English.pdf', Buffer.from(buf));
    console.log(`Saved Cambodia_Curriculum_Framework_2016_English.pdf (${buf.byteLength} bytes)`);
  } catch (e) {
    console.log('Error downloading:', e.message);
  }
}

downloadCurriculumFramework();
