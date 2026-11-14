import fs from 'fs';

const ids = [
  '00004160', '00004161', '00004162',
  '00004222', '00004223', '00004224', '00004225', '00004226', '00004227'
];

async function run() {
  for (const id of ids) {
    const url = `https://sala.moeys.gov.kh/en/library/${id}`;
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const html = await res.text();
      const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1].replace('- សាលាឌីជីថល', '').trim() : '';
      const pdfs = html.match(/https:\/\/api\.saladigital\.org\/public\/books\/[^\s"'>]+\.pdf/gi) || [];
      console.log(`[${id}] ${title}`);
      if (pdfs[0]) console.log(`   PDF: ${pdfs[0]}`);
    } catch (e) {
      console.log(`Error ${id}:`, e.message);
    }
  }
}

run();
