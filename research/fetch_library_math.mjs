import fs from 'fs';

async function fetchLibraryMath() {
  const url = 'https://sala.moeys.gov.kh/en/library?subject=mathematics';
  console.log('Fetching:', url);
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  fs.writeFileSync('research/temp_library_math.html', html, 'utf8');
  console.log('Saved temp_library_math.html, length:', html.length);

  // find library links
  const links = html.match(/\/library\/[a-zA-Z0-9_-]+/g) || [];
  console.log('Library links count:', links.length);
  console.log('Unique library links:', [...new Set(links)]);
}

fetchLibraryMath();
