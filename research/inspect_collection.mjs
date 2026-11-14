import fs from 'fs';

async function inspectCollection() {
  const url = 'https://sala.moeys.gov.kh/en/library/collections/673aff27ab57f5b6c7c70a8e';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  
  // Extract book cards / titles / links
  const regex = /<a[^>]*href=["'](\/(?:en|kh)\/library\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  console.log('Books in collection:');
  while ((match = regex.exec(html)) !== null) {
    const link = match[1];
    const text = match[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (text) {
      console.log(`- ${link}: ${text}`);
    }
  }
}

inspectCollection();
