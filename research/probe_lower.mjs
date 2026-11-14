async function probeLowerSecondary() {
  const ids = [];
  for (let i = 4302; i <= 4330; i++) {
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
        if (title.includes('គណិត') || title.includes('Math')) {
          console.log(`FOUND MATH: ${id} -> ${title}`);
          const pdfs = html.match(/https:\/\/api\.saladigital\.org\/public\/books\/[^\s"'>]+\.pdf/gi) || [];
          console.log(`  PDF: ${pdfs[0]}`);
        } else {
          // let's print other subjects too just in case
          // console.log(`${id} -> ${title}`);
        }
      }
    } catch (e) {}
  }
}

probeLowerSecondary();
