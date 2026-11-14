import fs from 'fs';

async function dumpCollections() {
  const url = 'https://sala.moeys.gov.kh/en/library/collections';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  fs.writeFileSync('research/temp_collections.html', html, 'utf8');
  console.log('Saved temp_collections.html, length:', html.length);
  // look for hrefs
  const matches = html.match(/href="[^"]+"/g) || [];
  console.log('Sample hrefs:', [...new Set(matches)].slice(0, 30));
}

dumpCollections();
