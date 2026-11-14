import fs from 'fs';

const html = fs.readFileSync('research/temp_curricula_upper.html', 'utf8');
const postBodyMatch = html.match(/<div class=['"]post-body[^>]*>([\s\S]*?)<div class=['"]post-footer/i);
if (postBodyMatch) {
  console.log('--- POST BODY ---');
  console.log(postBodyMatch[1].replace(/<script[\s\S]*?<\/script>/gi, '').trim());
} else {
  // Let's search for any iframes or drive links
  console.log('Post body not matched, searching for iframes or download links:');
  const iframes = html.match(/<iframe[^>]*src=['"]([^'"]*)['"][^>]*>/gi);
  console.log('Iframes:', iframes);
  const drives = html.match(/https?:\/\/[^\s"'>]+(?:drive\.google|docs\.google|dropbox|onedrive|moeys)[^\s"'>]*/gi);
  console.log('Special links:', drives);
}
