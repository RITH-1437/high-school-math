async function inspectLibraryItems() {
  const ids = ['00002579', '00004300', '00004301', '00002331', '00004433', '00004272'];
  for (const id of ids) {
    const url = `https://sala.moeys.gov.kh/kh/library/${id}`;
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const html = await res.text();
      const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
      const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
      console.log(`=== Library ${id} ===`);
      console.log('Title:', titleMatch ? titleMatch[1].trim() : 'N/A');
      console.log('H1:', h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'N/A');
      console.log('Desc:', descMatch ? descMatch[1].trim() : 'N/A');
      // Look for PDF or download links or drive links
      const pdfs = html.match(/https?:\/\/[^\s"'>]+\.pdf/gi) || [];
      console.log('PDF links:', [...new Set(pdfs)]);
    } catch (e) {
      console.log(`Error ${id}:`, e.message);
    }
  }
}

inspectLibraryItems();
