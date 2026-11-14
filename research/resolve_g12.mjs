const urls = [
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGBx3J_eBRzKSj3ZvODsmdD2usN52Pkjl1E3wGIzTFsmSBb0tUkRIGGXrSrFEPgDx5A8NBHrgOdAVs9mY65mMvCMnFFrkg7VZg4S-fDypnnjMjGlRIVpxq69gmo79oL3dOgPIV3nOtMxFEZrWKkQEb0bi1_xP3y8vtUEGOn_vw=',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHh3RIL0nFHgQn3arQ-kBvaJiNqPgGFw58NWlKTQ6TYCdkO6T0iD1TSyl2R9mxiYUACC8OTFVTLIVRfxS7o-9mjC0_jqnrNoDN9pBqg7Dun4BADernqeCT8qXn8jIxjzUPwFA==',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHqokC4oHp7ZdG5r_dBRIMjAYRpllbLZTRFbW7HfUcRXNLSOiqbmpdlOnMQ09ljJEZC1TFNzIlDmGpEF89OLC1nbd8gKTTW-22oqTomhdfYFJecPEePrGFbTEbGFSniaA=='
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
