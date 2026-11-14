import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function extractTextFromPdf(pdfRelativePath) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const fullPath = path.resolve(__dirname, '..', pdfRelativePath);
  const fileUrl = `file://${fullPath.replace(/\\/g, '/')}`;
  console.log(`Opening ${fileUrl}...`);

  await page.goto(fileUrl, { waitUntil: 'load' });
  await page.waitForTimeout(2000);

  // In chromium PDF viewer, let's see what DOM or text exists
  const textContent = await page.evaluate(() => document.body.innerText);
  console.log('Document text length:', textContent.length);
  if (textContent.length > 0) {
    console.log('Sample text:', textContent.substring(0, 500));
  } else {
    console.log('No text in body innerText, checking plugins / embed:');
    const embeds = await page.$$eval('embed', els => els.map(e => e.type));
    console.log('Embeds:', embeds);
  }

  await browser.close();
}

extractTextFromPdf('research/sample_g12_adv.pdf');
