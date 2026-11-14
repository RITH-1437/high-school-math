import fs from 'fs';

const html = fs.readFileSync('research/temp_course.html', 'utf8');
const apis = html.match(/\/api\/[^\s"'>]+/g) || [];
console.log('API routes in page:', [...new Set(apis)]);
const urls = html.match(/https?:\/\/[^\s"'>]+/g) || [];
console.log('External/Internal URLs in page:', [...new Set(urls)].filter(u => u.includes('moeys') || u.includes('backend') || u.includes('api')));
