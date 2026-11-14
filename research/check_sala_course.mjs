async function checkCourse() {
  const url = 'https://sala.moeys.gov.kh/kh/courses/655ec6e28936848736e526f0/learn/65892cb890cb5f68455fb5e2';
  console.log('Fetching Grade 12 course...');
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  console.log('Status:', res.status);
  const text = await res.text();
  console.log('Length:', text.length);
  // look for chapter / lesson titles or json in script tags
  const nextData = text.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (nextData) {
    console.log('Found __NEXT_DATA__!');
    const data = JSON.parse(nextData[1]);
    console.log('Keys:', Object.keys(data));
    console.log('PageProps keys:', Object.keys(data.props?.pageProps || {}));
    if (data.props?.pageProps?.course) {
      console.log('Course title:', data.props.pageProps.course.title);
      console.log('Course chapters/sections:', JSON.stringify(data.props.pageProps.course.sections || data.props.pageProps.course.curriculum || [], null, 2).substring(0, 2000));
    }
  } else {
    // search for text
    console.log('No next data, preview:', text.substring(0, 500));
  }
}

checkCourse();
