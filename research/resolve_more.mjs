const urls = [
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEt9WanfnGH7WKv2PAcnDvliuoORjF_4PuYh0cY-DVy9Sv-sr4kbM0zp3mZJn3N5fK2utw_Gc_VgtY7NjdJG5_HzKPQ31rC2_dMkrwFBCBKVLqeNxOMsT4LPEkiNh9-ANc=',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFMEHvAqfvrVE8zBYRe7-gDjqjUrtRoDltfAcf9-QQt9IdqxZOVMt_9sc4JtY_vN_pmvSzAVmz7UYLT54PRv2NjFx-NMsuox1pPqXShGPmZuR4TxHJs_dg=',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFWCH4InUtb6W9FJkO-CDcl0Qukbdy7TI2t5IsJ-KyGZhq2z-JOVWym8cvGsjiJ1-HgShnXivnXDg6xjKEcWpW8MXsauCtJtgrgsZpwwz9BpUt4umGmWPc_S7RsrSeipcbNktbIJjcnEdEd0De10Q==',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEwt3jJHhwFkLZN5DQp2wxBSFUfzri3vFGo-BhiJLIrpXjMpYBNitB3fi3r6KSpotg-puNQDr8B_m_FuMA-jlsqE1vvDn0XIJsRLFh1vkpVEwzZO-pgVTt0pdccjTdhkEE='
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
