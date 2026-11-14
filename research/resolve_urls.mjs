const urls = [
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHJf7KF0CycUZsHg3s08C9tmalv5twnttDZFJUaNj448e5qEM4sypuFq49aTlQoXuBbZadq9iRTTJ_MRwAwJ62C_9n3ApvoL34D4u_TxxdIp0HduKYyE5FWo8IZ92cDvg==',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFAGqh3RyyZGAQ9Fr4PjKfQ01QJGntZfD-d_YHFZkJV5YyYtX-uz4SGmSVpofbrxjg8lp5OsMyMHI7lGSVL_hyd1v7uUUOHeouYY-_vFtC2co99ljdrcYiI8aGx8SKwYg==',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFQaJnw4LPPgwf4cHLE_RDnkpyCZpYnYCioHQxsHER2-eFyyNF6o8Rhf4tYE5p0Ti_hL8XNn96OUtvjAaxRcv1UQlZM8uPpH5DSd-h4zBZ8nPJLAjgFrxrH0SvExGzd43I=',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFC9JDS3-Y5GOkr5sAzjq449uvLhoGefMYP7jpjnIUbIkAuwfpDtZNNQi6O4tuytP8wv2-P65VMJANHm0zT4EXmoNVVchrn33evNnvRfB9Pcbcucux8Q0rCoszbRkxI0A==',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGQtf957bEe8LycloyVSYtJcHyx80CMy1daZv28oUyG8v9DELQt67f8zICO5fvQM1v8aOev5h8GSUDQxsI08tROJ03Bvzy6qiMevXM_w45prUrQQQugnyc9IRjWDpCR8A==',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHxeSAUYksUxtZjo1IZYuOhBrF9SrL5mSEL2EyAeN-miK3HvuPWUSxqYaTY89Z0Yq8yp1Ss7G6Z_uUNDvGUgRGr0TLN6AsKcY08jL8w-mAJwREhh5Xc_-RQMuEFSRvfkA==',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFWspeyl4OHqwrkEXulV1CHex1F5eZMYgOj-vrSfQ4I4QLifOV2KCec5Jyd3_uzC253deCL57fVrF0-djsmGB6Lx-CqfVSYZNhn6bpCx4WCjQaorMxOVGwZmd6oU-q8BSQ==',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFfjTpzqMPAaXXTwkBKtoX_X79AQ8vutR0LagT4Sdyy3k3XH6uKba0XCm_QzNr0Xq61Jd9htJsilOMBFM4JG-Tkso_PIrkL1ovTKN2fY7Mc0ZJTnbuxJv_Y7eV6xU29I2KHEZPhQytIr84CZ3w7l-eZ-1viXgGs5pQlKI_ng8la2WRhu4iyv9MU5eGmvpkW',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGWI2EX0iDBjqnziRFjltj6ODUe8ed9pA_S8uBHBwIRRmmmwXeRkv1xI6JgrN1kq6gfCoqG0jALwQ2Jiz0yYq2AUpamPoAoAuPAMDIS1fLWgQ_3I7KbPuRnmcsfgbr596M83RJq6LFlsCCN4rutl0JeHWgSXMxs-0KEnypGVrqzlQ4Hb7SMEdiyi1PLdot_i-FSvwwek9yPNivXrajXeUbN8HKaUbs2xLL-HbK0NkkEjB-_YOmtre7jidxUytBYfFX-U8NFuC1iOwQJ'
];

async function resolveUrls() {
  for (const u of urls) {
    try {
      const res = await fetch(u, { method: 'HEAD', redirect: 'follow' });
      console.log('Resolved:', res.url);
    } catch (e) {
      console.log('Error resolving:', e.message);
    }
  }
}

resolveUrls();
