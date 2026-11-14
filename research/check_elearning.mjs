async function checkElearning() {
  const grades = [
    { grade: 7, url: 'https://elearning.moeys.gov.kh/k7/maths/' },
    { grade: 8, url: 'https://elearning.moeys.gov.kh/k8/maths/' },
    { grade: 9, url: 'https://elearning.moeys.gov.kh/k9/maths/' },
    { grade: 10, url: 'https://elearning.moeys.gov.kh/k10/maths/' },
    { grade: 11, url: 'https://elearning.moeys.gov.kh/k11/maths/' },
    { grade: 12, url: 'https://elearning.moeys.gov.kh/k12/maths/' }
  ];

  for (const g of grades) {
    try {
      const res = await fetch(g.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      console.log(`Grade ${g.grade} (${g.url}) -> status: ${res.status}`);
      if (res.ok) {
        const text = await res.text();
        // find lessons or chapter titles
        const titles = text.match(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/gi) || [];
        console.log(`  Grade ${g.grade} Headings (${titles.length}):`, titles.slice(0, 10).map(t => t.replace(/<[^>]+>/g, '').trim()));
      }
    } catch (e) {
      console.log(`Error Grade ${g.grade}:`, e.message);
    }
  }
}

checkElearning();
