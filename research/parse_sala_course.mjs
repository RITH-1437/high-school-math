import fs from 'fs';

async function checkNext() {
  const url = 'https://sala.moeys.gov.kh/kh/courses/655ec6e28936848736e526f0/learn/65892cb890cb5f68455fb5e2';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const text = await res.text();
  fs.writeFileSync('research/temp_course.html', text, 'utf8');

  // Next.js App router streams payload in self.__next_f.push([1,"..."])
  const matches = text.match(/self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g);
  console.log('Matches:', matches ? matches.length : 0);
  if (matches) {
    let combined = '';
    for (const m of matches) {
      const inner = m.match(/self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/)[1];
      combined += inner.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }
    fs.writeFileSync('research/temp_course_data.txt', combined, 'utf8');
    console.log('Saved temp_course_data.txt, length:', combined.length);
    // Find chapters / lessons
    const titles = combined.match(/"title":"([^"]+)"/g);
    console.log('Found titles count:', titles ? titles.length : 0);
    if (titles) {
      console.log('Sample titles:', titles.slice(0, 30));
    }
  }
}

checkNext();
