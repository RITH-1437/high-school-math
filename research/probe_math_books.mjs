async function probeRange() {
  const ids = [];
  for (let i = 4260; i <= 4305; i++) {
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
        if (title.includes('គណិត')) {
          console.log(`FOUND MATH: ${id} -> ${title}`);
          const pdfs = html.match(/https:\/\/api\.saladigital\.org\/public\/books\/[^\s"'>]+\.pdf/gi) || [];
          console.log(`  PDF: ${pdfs[0]}`);
        }
      }
    } catch (e) {}
  }
}

probeRange();
