import fs from 'fs';

async function testPtec() {
  const url = 'https://library.ptec.edu.kh/books/curricula-upper-secondary-education-maths';
  console.log('Fetching PTEC:', url);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    console.log('PTEC Status:', res.status, res.headers.get('content-type'));
    const html = await res.text();
    fs.writeFileSync('research/temp_ptec.html', html, 'utf8');
    const pdfs = html.match(/https?:\/\/[^\s"'>]+\.pdf/gi) || [];
    console.log('PTEC PDFs:', pdfs);
    const iframes = html.match(/<iframe[^>]*src=["']([^"']+)["']/gi) || [];
    console.log('PTEC Iframes:', iframes);
    const drives = html.match(/https?:\/\/[^\s"']*(?:drive\.google|docs\.google|dropbox|moeys)[^\s"']*/gi) || [];
    console.log('PTEC Drive/Docs:', drives);
  } catch (e) {
    console.log('PTEC Error:', e.message);
  }
}

async function testNie() {
  const url = 'https://nielibrary.com/download_pdf/journal/37/17788175225H1ks4ZYdD.pdf';
  console.log('Fetching NIE PDF:', url);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Range': 'bytes=0-200000' } });
    console.log('NIE Status:', res.status, res.headers.get('content-type'), res.headers.get('content-range'));
    const buf = await res.arrayBuffer();
    fs.writeFileSync('research/nie_journal_sample.pdf', Buffer.from(buf));
    console.log('Saved NIE sample, length:', buf.byteLength);
  } catch (e) {
    console.log('NIE Error:', e.message);
  }
}

async function run() {
  await testPtec();
  await testNie();
}

run();
