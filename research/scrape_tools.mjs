import fs from 'fs';

async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    return await res.text();
  } catch (err) {
    console.error(`Error fetching ${url}:`, err.message);
    return null;
  }
}

function extractLinks(html, baseUrl) {
  const links = [];
  const regex = /<a\s+[^>]*?href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gis;
  let match;
  while ((match = regex.exec(html)) !== null) {
    let href = match[1];
    let text = match[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    try {
      href = new URL(href, baseUrl).href;
    } catch (e) {}
    links.push({ href, text });
  }
  return links;
}

async function run() {
  const url = 'https://oer.moeys.gov.kh/2015/10/curricula-upper-secondary-education.html';
  console.log('Fetching', url);
  const html = await fetchPage(url);
  if (!html) return;
  fs.writeFileSync('research/temp_curricula_upper.html', html, 'utf8');
  console.log('Saved temp_curricula_upper.html, length:', html.length);

  const links = extractLinks(html, url);
  console.log('Total links:', links.length);
  const filtered = links.filter(l => 
    /math|គណិត|curricul|pdf|grade|ថ្នាក់|download/i.test(l.text + ' ' + l.href)
  );
  console.log('Matched links:');
  console.log(filtered);
}

run();
