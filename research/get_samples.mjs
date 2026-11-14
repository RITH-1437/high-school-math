import fs from 'fs';

async function downloadSample(name, url, bytes = 2000000) {
  console.log(`Downloading sample for ${name}...`);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Range': `bytes=0-${bytes}`
    }
  });
  const buf = await res.arrayBuffer();
  const filePath = `research/sample_${name}.pdf`;
  fs.writeFileSync(filePath, Buffer.from(buf));
  console.log(`Saved ${filePath} (${buf.byteLength} bytes)`);
}

async function run() {
  await downloadSample('g10_p1', 'https://api.saladigital.org/public/books/673bf4e2ab57f5b6c7c70b08/e9345e50-a672-4ae9-80a1-87beac4695ec.pdf');
  await downloadSample('g11_adv', 'https://api.saladigital.org/public/books/673aec94ab57f5b6c7c70a44/0de7045d-76bc-45c9-b7a6-904b65cda267.pdf');
  await downloadSample('g12_adv', 'https://api.saladigital.org/public/books/673af15fab57f5b6c7c70a5f/9ece6fa3-0710-4514-a014-34e86d3bff5f.pdf');
}

run();
