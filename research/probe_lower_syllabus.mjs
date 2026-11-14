import fs from 'fs';

async function probeLower() {
  const ids = [];
  for (let i = 4165; i <= 4220; i++) {
    ids.push(String(i).padStart(8, '0'));
  }

  for (const id of ids) {
    const url = `https://sala.moeys.gov.kh/en/library/${id}`;
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res.ok) {
        const html = await res.text();
        const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
        const title = titleMatch ? titleMatch[1].replace('- សាលាឌីជីថល', '').trim() : '';
        if (title.includes('គណិតវិទ្យា') && title.includes('បឋមភូមិ')) {
          console.log(`FOUND LOWER MATH SYLLABUS: [${id}] ${title}`);
          const pdfs = html.match(/https:\/\/api\.saladigital\.org\/public\/books\/[^\s"'>]+\.pdf/gi) || [];
          console.log(`   PDF: ${pdfs[0]}`);
          break;
        } else if (title.includes('គណិត') || title.includes('កម្មវិធីសិក្សា')) {
          console.log(`Candidate: [${id}] ${title}`);
        }
      }
    } catch (e) {}
  }
}

probeLower();
