async function testSalaApi() {
  const courseId = '655ec6e28936848736e526f0';
  const urls = [
    `https://api.saladigital.org/public/courses/${courseId}`,
    `https://api.saladigital.org/courses/${courseId}`,
    `https://api.saladigital.org/public/courses/${courseId}/lessons`,
    `https://api.saladigital.org/public/courses/${courseId}/curriculum`,
    `https://api.saladigital.org/v1/courses/${courseId}`
  ];

  for (const u of urls) {
    try {
      const res = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      console.log(`${u} -> status: ${res.status}`);
      if (res.ok) {
        const json = await res.json();
        console.log('Result keys:', Object.keys(json));
        console.log('Preview:', JSON.stringify(json).substring(0, 500));
      }
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }
}

testSalaApi();
