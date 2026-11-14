async function checkGdrive() {
  const fileId = '0B5UlSl5KbceuZmRVRjhvczcyZWs';
  const urls = [
    `https://drive.google.com/uc?export=download&id=${fileId}`,
    `https://drive.google.com/file/d/${fileId}/view`,
    `https://drive.google.com/file/d/${fileId}/preview`
  ];

  for (const u of urls) {
    try {
      const res = await fetch(u, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        redirect: 'follow'
      });
      console.log(`${u} -> status: ${res.status}, content-type: ${res.headers.get('content-type')}, length: ${res.headers.get('content-length')}`);
      if (res.headers.get('content-type')?.includes('pdf')) {
        const buf = await res.arrayBuffer();
        console.log(`Fetched PDF! Length: ${buf.byteLength} bytes`);
      } else {
        const text = await res.text();
        console.log(`Text preview (first 300 chars): ${text.substring(0, 300).replace(/\n/g, ' ')}`);
        // check if title is in html
        const titleMatch = text.match(/<title>([^<]+)<\/title>/i);
        if (titleMatch) console.log('Page Title:', titleMatch[1]);
      }
    } catch (e) {
      console.log(`Error checking ${u}:`, e.message);
    }
  }
}

checkGdrive();
