import fs from 'fs';

const html = fs.readFileSync('research/temp_curricula_upper.html', 'utf8');

// Look for iframes, drive links, embeds
const iframes = html.match(/<iframe[^>]*src=["']([^"']+)["']/gi) || [];
console.log('IFRAMES:', iframes);

const drives = html.match(/https?:\/\/[^\s"']*(?:drive\.google|docs\.google|onedrive|dropbox|mediafire|mega\.nz|pdf)[^\s"']*/gi) || [];
console.log('DRIVE / FILE LINKS:', drives);

const postBody = html.match(/<div class=['"]post-body[^>]*>([\s\S]*?)<\/div>/i);
if (postBody) {
  console.log('POST BODY TEXT:\n', postBody[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 1000));
}
