import fs from 'fs';

async function checkSala() {
  const url = 'https://sala.moeys.gov.kh/';
  console.log('Fetching sala.moeys.gov.kh...');
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  console.log('Status:', res.status);
  const html = await res.text();
  fs.writeFileSync('research/temp_sala.html', html, 'utf8');
  console.log('Saved temp_sala.html, length:', html.length);

  // find links or keywords
  const regex = /<a\s+[^>]*?href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gis;
  let match;
  const links = [];
  while ((match = regex.exec(html)) !== null) {
    let href = match[1];
    let text = match[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    try {
      href = new URL(href, url).href;
    } catch (e) {}
    links.push({ href, text });
  }

  const mathLinks = links.filter(l => /math|គណិត|ថ្នាក់|grade|curricul|book|សៀវភៅ/i.test(l.text + ' ' + l.href));
  console.log('Math / Curriculum links in sala:', mathLinks.slice(0, 30));
}

checkSala();
