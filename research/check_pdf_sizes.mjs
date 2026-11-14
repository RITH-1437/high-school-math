async function checkPdfSizes() {
  const books = [
    { name: 'Grade 7', url: 'https://api.saladigital.org/public/books/673c43e3ab57f5b6c7c70b98/60616328-e720-4a0a-a07f-cb813a49bff6.pdf' },
    { name: 'Grade 8', url: 'https://api.saladigital.org/public/books/673c3ba1ab57f5b6c7c70b81/68e52df8-186e-419a-ab69-2932e51ddb47.pdf' },
    { name: 'Grade 9', url: 'https://api.saladigital.org/public/books/673bfe4cab57f5b6c7c70b2c/7f6b5074-137e-4bf9-8792-02b4ace96760.pdf' },
    { name: 'Grade 10 Part 1', url: 'https://api.saladigital.org/public/books/673bf4e2ab57f5b6c7c70b08/e9345e50-a672-4ae9-80a1-87beac4695ec.pdf' },
    { name: 'Grade 10 Part 2', url: 'https://api.saladigital.org/public/books/673bf549ab57f5b6c7c70b0c/b4509e9e-6e60-48c8-8099-13a493ccd910.pdf' },
    { name: 'Grade 11 Basic', url: 'https://api.saladigital.org/public/books/673aed3fab57f5b6c7c70a49/d31d338a-7a73-4e95-b91a-ea8976b2b882.pdf' },
    { name: 'Grade 11 Adv', url: 'https://api.saladigital.org/public/books/673aec94ab57f5b6c7c70a44/0de7045d-76bc-45c9-b7a6-904b65cda267.pdf' },
    { name: 'Grade 12 Basic', url: 'https://api.saladigital.org/public/books/673af0d3ab57f5b6c7c70a5c/b0500c69-6200-4ba8-a7ee-495bad68a726.pdf' },
    { name: 'Grade 12 Adv', url: 'https://api.saladigital.org/public/books/673af15fab57f5b6c7c70a5f/9ece6fa3-0710-4514-a014-34e86d3bff5f.pdf' }
  ];

  for (const b of books) {
    try {
      // range request for first 100KB
      const res = await fetch(b.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Range': 'bytes=0-100000'
        }
      });
      console.log(`${b.name} -> status: ${res.status}, content-range: ${res.headers.get('content-range')}`);
    } catch (e) {
      console.log(`Error ${b.name}: ${e.message}`);
    }
  }
}

checkPdfSizes();
