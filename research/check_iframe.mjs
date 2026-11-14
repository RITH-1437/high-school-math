import fs from 'fs';

const html = fs.readFileSync('research/temp_curricula_upper.html', 'utf8');
const idx = html.indexOf('0B5UlSl5KbceuZmRVRjhvczcyZWs');
console.log('Around iframe:');
console.log(html.substring(Math.max(0, idx - 800), Math.min(html.length, idx + 800)));
