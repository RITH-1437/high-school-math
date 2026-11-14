async function inspectG12Adv() {
  const url = 'https://sala.moeys.gov.kh/en/library/00004284';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  const title = html.match(/<title>([^<]+)<\/title>/i);
  console.log('Title:', title ? title[1] : 'N/A');
  const pdfs = html.match(/https?:\/\/[^\s"'>]+\.pdf/gi) || [];
  console.log('PDFs:', [...new Set(pdfs)].filter(p => p.includes('books') || p.includes('pdf')));
}

inspectG12Adv();
