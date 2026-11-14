async function inspectMoreIds() {
  const ids = ['00000226', '00000608', '00007578', '00007577', '00007808'];
  for (const id of ids) {
    const url = `https://sala.moeys.gov.kh/kh/library/${id}`;
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const html = await res.text();
      const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
      console.log(`=== Library ${id} ===`);
      console.log('Title:', titleMatch ? titleMatch[1].trim() : 'N/A');
      const pdfs = html.match(/https?:\/\/[^\s"'>]+\.pdf/gi) || [];
      console.log('PDF links:', [...new Set(pdfs)].filter(p => p.includes('books') || p.includes('pdf')));
    } catch (e) {
      console.log(`Error ${id}:`, e.message);
    }
  }
}

inspectMoreIds();
