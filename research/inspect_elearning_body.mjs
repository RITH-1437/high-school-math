import fs from 'fs';

async function inspectElearningBody() {
  const url = 'https://elearning.moeys.gov.kh/k12/maths/';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  fs.writeFileSync('research/temp_k12_elearning.html', html, 'utf8');
  console.log('Saved temp_k12_elearning.html, length:', html.length);
  // look for text / links / lessons
  const regex = /<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  const links = [];
  while ((match = regex.exec(html)) !== null) {
    const text = match[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (text) links.push({ href: match[1], text });
  }
  console.log('Sample links (total ' + links.length + '):', links.slice(0, 25));
}

inspectElearningBody();
