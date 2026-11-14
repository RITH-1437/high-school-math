import fs from 'fs';

const sourcesToTest = [
  {
    id: 'OER-HOME',
    name: 'MoEYS OER Portal Homepage',
    url: 'https://oer.moeys.gov.kh/',
    expected: 'HTML portal page'
  },
  {
    id: 'OER-CURRICULA-UPPER',
    name: 'MoEYS Upper Secondary Mathematics Curriculum (2006/2015)',
    url: 'https://oer.moeys.gov.kh/2015/10/curricula-upper-secondary-education.html',
    expected: 'Blog post with embedded curriculum doc'
  },
  {
    id: 'OER-GDRIVE-EMBED',
    name: 'MoEYS OER Embedded Google Drive Curriculum PDF',
    url: 'https://drive.google.com/file/d/0B5UlSl5KbceuZmRVRjhvczcyZWs/preview',
    expected: 'PDF preview / stream'
  },
  {
    id: 'OER-GDRIVE-DIRECT',
    name: 'MoEYS OER Embedded Google Drive Direct Download',
    url: 'https://drive.google.com/uc?export=download&id=0B5UlSl5KbceuZmRVRjhvczcyZWs',
    expected: 'Direct PDF download'
  },
  {
    id: 'ICMI-GRADES-1-9',
    name: 'Cambodian Basic Education Mathematics Curriculum, Grades 1–9 (ICMI/IMU)',
    url: 'https://www.mathunion.org/fileadmin/ICMI/files/Other_activities/Database/Cambodia/Math-Curiculum_Grades_1_-_9.pdf',
    expected: 'Full official MoEYS curriculum PDF (Grades 1-9)'
  },
  {
    id: 'MOEYS-MAIN',
    name: 'MoEYS Official Ministry Website',
    url: 'https://moeys.gov.kh/',
    expected: 'Ministry official website'
  },
  {
    id: 'SALA-HOME',
    name: 'MoEYS Sala Digital Platform Homepage',
    url: 'https://sala.moeys.gov.kh/',
    expected: 'E-learning portal'
  },
  {
    id: 'SALA-LIBRARY',
    name: 'MoEYS Sala Digital Library - Mathematics',
    url: 'https://sala.moeys.gov.kh/en/library?subject=mathematics',
    expected: 'Catalog of math books'
  },
  {
    id: 'ELEARNING-K7',
    name: 'MoEYS eLearning Portal Grade 7 Maths',
    url: 'https://elearning.moeys.gov.kh/k7/maths/',
    expected: 'Course / lessons'
  },
  {
    id: 'ELEARNING-K12',
    name: 'MoEYS eLearning Portal Grade 12 Maths',
    url: 'https://elearning.moeys.gov.kh/k12/maths/',
    expected: 'Course / lessons'
  },
  {
    id: 'ODC-CURRICULUM-FRAMEWORK',
    name: 'MoEYS Curriculum Framework for General Education 2016 (ODC Mirror)',
    url: 'https://data.opendevelopmentcambodia.net/en/dataset/e1fdd9b1-7e42-4cff-b91d-8631459e3063/resource/aa78b1a2-3c58-4bc2-841f-aaae5fe3f8a0/download/curriculum-framework-for-general-education-and-tvet.pdf',
    expected: 'Official 2016 Framework PDF'
  },
  // Textbooks on Sala Digital API
  {
    id: 'SALA-PDF-G07',
    name: 'Official MoEYS Grade 7 Mathematics Textbook',
    url: 'https://api.saladigital.org/public/books/673c43e3ab57f5b6c7c70b98/60616328-e720-4a0a-a07f-cb813a49bff6.pdf',
    expected: 'Grade 7 student textbook PDF'
  },
  {
    id: 'SALA-PDF-G08',
    name: 'Official MoEYS Grade 8 Mathematics Textbook',
    url: 'https://api.saladigital.org/public/books/673c3ba1ab57f5b6c7c70b81/68e52df8-186e-419a-ab69-2932e51ddb47.pdf',
    expected: 'Grade 8 student textbook PDF'
  },
  {
    id: 'SALA-PDF-G09',
    name: 'Official MoEYS Grade 9 Mathematics Textbook',
    url: 'https://api.saladigital.org/public/books/673bfe4cab57f5b6c7c70b2c/7f6b5074-137e-4bf9-8792-02b4ace96760.pdf',
    expected: 'Grade 9 student textbook PDF'
  },
  {
    id: 'SALA-PDF-G10-P1',
    name: 'Official MoEYS Grade 10 Mathematics Textbook (Part 1)',
    url: 'https://api.saladigital.org/public/books/673bf4e2ab57f5b6c7c70b08/e9345e50-a672-4ae9-80a1-87beac4695ec.pdf',
    expected: 'Grade 10 Part 1 student textbook PDF'
  },
  {
    id: 'SALA-PDF-G10-P2',
    name: 'Official MoEYS Grade 10 Mathematics Textbook (Part 2)',
    url: 'https://api.saladigital.org/public/books/673bf549ab57f5b6c7c70b0c/b4509e9e-6e60-48c8-8099-13a493ccd910.pdf',
    expected: 'Grade 10 Part 2 student textbook PDF'
  },
  {
    id: 'SALA-PDF-G11-BASIC',
    name: 'Official MoEYS Grade 11 Basic Mathematics Textbook',
    url: 'https://api.saladigital.org/public/books/673aed3fab57f5b6c7c70a49/d31d338a-7a73-4e95-b91a-ea8976b2b882.pdf',
    expected: 'Grade 11 Basic student textbook PDF'
  },
  {
    id: 'SALA-PDF-G11-ADV',
    name: 'Official MoEYS Grade 11 Advanced Mathematics Textbook',
    url: 'https://api.saladigital.org/public/books/673aec94ab57f5b6c7c70a44/0de7045d-76bc-45c9-b7a6-904b65cda267.pdf',
    expected: 'Grade 11 Advanced student textbook PDF'
  },
  {
    id: 'SALA-PDF-G12-BASIC',
    name: 'Official MoEYS Grade 12 Basic Mathematics Textbook',
    url: 'https://api.saladigital.org/public/books/673af0d3ab57f5b6c7c70a5c/b0500c69-6200-4ba8-a7ee-495bad68a726.pdf',
    expected: 'Grade 12 Basic student textbook PDF'
  },
  {
    id: 'SALA-PDF-G12-ADV',
    name: 'Official MoEYS Grade 12 Advanced Mathematics Textbook',
    url: 'https://api.saladigital.org/public/books/673af15fab57f5b6c7c70a5f/9ece6fa3-0710-4514-a014-34e86d3bff5f.pdf',
    expected: 'Grade 12 Advanced student textbook PDF'
  }
];

async function testSource(src) {
  const start = Date.now();
  const result = {
    id: src.id,
    name: src.name,
    url: src.url,
    expected: src.expected,
    status: null,
    statusText: null,
    contentType: null,
    contentLength: null,
    durationMs: 0,
    success: false,
    failureCategory: null, // 'network-restriction' | 'waf-block' | 'auth-required' | 'timeout' | 'token-limit' | 'redirect-loop' | 'none'
    errorDetails: null,
    preview: null
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(src.url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,application/pdf,*/*;q=0.8'
      },
      signal: controller.signal,
      redirect: 'follow'
    });
    clearTimeout(timeoutId);

    result.status = res.status;
    result.statusText = res.statusText;
    result.contentType = res.headers.get('content-type');
    result.contentLength = res.headers.get('content-length');
    result.durationMs = Date.now() - start;

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        result.failureCategory = 'auth-required';
        result.errorDetails = `HTTP ${res.status}: Access forbidden or authentication required`;
      } else {
        result.failureCategory = 'http-error';
        result.errorDetails = `HTTP ${res.status} ${res.statusText}`;
      }
      return result;
    }

    // Check if WAF blocked with 200 OK (e.g. "The requested URL was rejected")
    const isPdf = result.contentType?.includes('pdf') || src.url.endsWith('.pdf');
    if (isPdf) {
      // Fetch small slice / check length
      const buf = await res.arrayBuffer();
      result.contentLength = String(buf.byteLength);
      // Check PDF magic bytes '%PDF-'
      const header = Buffer.from(buf.slice(0, 5)).toString('utf8');
      if (header.startsWith('%PDF')) {
        result.success = true;
        result.preview = `Valid PDF (${(buf.byteLength / (1024 * 1024)).toFixed(2)} MB, header: ${header})`;
      } else {
        result.failureCategory = 'invalid-payload';
        result.errorDetails = `Expected PDF but got header: ${header}`;
      }
    } else {
      const text = await res.text();
      result.preview = text.substring(0, 300).replace(/\s+/g, ' ').trim();
      if (text.includes('The requested URL was rejected') || text.includes('Request Rejected')) {
        result.failureCategory = 'waf-block';
        result.errorDetails = 'MoEYS WAF / Application Firewall rejected request';
      } else if (text.includes('Google Drive: Sign-in') || text.includes('accounts.google.com')) {
        result.failureCategory = 'auth-required';
        result.errorDetails = 'Google Workspace authentication required';
      } else {
        result.success = true;
      }
    }
  } catch (err) {
    clearTimeout(timeoutId);
    result.durationMs = Date.now() - start;
    if (err.name === 'AbortError') {
      result.failureCategory = 'timeout';
      result.errorDetails = 'Request timed out after 12000ms';
    } else {
      result.failureCategory = 'network-restriction';
      result.errorDetails = err.message;
    }
  }

  return result;
}

async function runAll() {
  console.log(`Diagnosing ${sourcesToTest.length} sources...`);
  const results = [];
  for (const s of sourcesToTest) {
    process.stdout.write(`Testing [${s.id}] ${s.name} ... `);
    const r = await testSource(s);
    console.log(r.success ? `✓ SUCCESS (${r.durationMs}ms)` : `✗ FAILED: ${r.failureCategory} - ${r.errorDetails}`);
    results.push(r);
  }

  fs.writeFileSync('research/source_diagnostic_results.json', JSON.stringify(results, null, 2), 'utf8');
  console.log('Results saved to research/source_diagnostic_results.json');
}

runAll();
