const urls = [
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFwSOcO-ZEXGFbzFfdBGnIp-y05HdXnK54nDfzkmnSXpbNnir3wM_pSm9rNhzCANvsx_bpTCS0TSL9uw7LjK8KACtyKlIKa4FhtamfO18cKki6Db_XmVwEaSsh-7fQjO3RAH98wtrfszkAM_mYQBCoPygaX',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGZbNbj_9bZEF2z6kiIRlL6rHMhScz-2i5G3ODnF-K2WBvfWmc9vZzPMwo69SkqZJcChaTnOMV6N1egtm4JKDwQ7p87R0rb0v9273OVG3bsCCgkQ1njq0BDTMhBXLwzqBBOm0VM-CLKXUrDJFX41I-nTe9holquryt0u-_qgVqrmM9RkIq_5wLSr1NCjB7YYqm-w1SeEjpWxgkL97S9JpWb0R7ScH_aMSE=',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHCpyZWCaGdyHk4cTOV6bR6-K4gZbdUiTfW-tGYUoTqDJPpEwAgFzLR29EVcAwECnEyC9d7wP1uhrNAS2J5Nxno30piFItVdv8n0bShvPQJ5C81VCYO-a5JAMhCdSS0dFEJABu3RuKe4OmbUU7Qgp5ioJZ0gkyXXjT6HUUi',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGFj9o89HokLA4e46a_8vSnwkWD5r-3e5T-ocmURwUadZp6vK4AdAn2RhBKYxlLr40Loqf8N3n6hzvbvs-UBXucRJqpHxjHNjG76xrnFA1LL75ccyXgFG0NWz9F5vXL'
];

async function resolveUrls() {
  for (const u of urls) {
    try {
      const res = await fetch(u, { method: 'HEAD', redirect: 'follow' });
      console.log('Resolved:', res.url);
    } catch (e) {
      console.log('Error:', e.message);
    }
  }
}

resolveUrls();
