async function testPdfUrls() {
  const books = [
    { title: 'Grade 10 Part 1', url: 'https://api.saladigital.org/public/books/673bf4e2ab57f5b6c7c70b08/e9345e50-a672-4ae9-80a1-87beac4695ec.pdf' },
    { title: 'Grade 10 Part 2', url: 'https://api.saladigital.org/public/books/673bf549ab57f5b6c7c70b0c/b4509e9e-6e60-48c8-8099-13a493ccd910.pdf' },
    { title: 'Grade 10 Teacher Guide', url: 'https://api.saladigital.org/public/books/6758f8c74a234b72bca53fb8/b99eeca0-925a-4841-8f55-d91784579aa7.pdf' },
    { title: 'Grade 11 Basic', url: 'https://api.saladigital.org/public/books/673aed3fab57f5b6c7c70a49/d31d338a-7a73-4e95-b91a-ea8976b2b882.pdf' }
  ];

  for (const b of books) {
    try {
      const res = await fetch(b.url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } });
      console.log(`${b.title} -> status: ${res.status}, type: ${res.headers.get('content-type')}, length: ${res.headers.get('content-length')}`);
    } catch (e) {
      console.log(`Error ${b.title}:`, e.message);
    }
  }
}

testPdfUrls();
