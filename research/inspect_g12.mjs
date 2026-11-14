async function inspectG12Pages() {
  const urls = [
    'https://sala.moeys.gov.kh/en/library/collections/673aff27ab57f5b6c7c70a8e',
    'https://sala.moeys.gov.kh/en/library/00004282',
    'https://sala.moeys.gov.kh/kh/library/00005672'
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const html = await res.text();
      const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
      console.log(`=== ${url} ===`);
      console.log('Title:', titleMatch ? titleMatch[1].trim() : 'N/A');
      const pdfs = html.match(/https?:\/\/[^\s"'>]+\.pdf/gi) || [];
      console.log('PDF links:', [...new Set(pdfs)].filter(p => p.includes('books') || p.includes('pdf')));
    } catch (e) {
      console.log(`Error ${url}:`, e.message);
    }
  }
}

inspectG12Pages();
