async function fetchCollections() {
  const url = 'https://sala.moeys.gov.kh/en/library/collections';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  const regex = /<a[^>]*href=["'](\/(?:en|kh)\/library\/collections\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  console.log('Collections:');
  while ((match = regex.exec(html)) !== null) {
    const link = match[1];
    const text = match[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    console.log(`- ${link}: ${text}`);
  }
}

fetchCollections();
