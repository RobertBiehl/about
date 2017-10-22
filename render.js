/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

const paths = ['/project/fashionfreax'];

if (
  true ||
  process.argv.indexOf('--pre-render') !== -1 ||
  process.argv.indexOf('--prerender') !== -1
) {
  require('pre-render')('./build', paths);
}
/*
if (
  true ||
  process.argv.indexOf('--pdf') !== -1
) {
  const baseURL = 'http://localhost:3000/';//process.argv['--pdf'];
  const RenderPDF = require('chrome-headless-render-pdf');

  paths.map((path) => [path, (baseURL+path).replace('index.html/', '').replace(/\/\/+/g, '/')]).forEach(([path, url]) => {
    const filename = path.replace(new RegExp('/', 'g'), '_')+'.pdf';
    console.log("Creating "+filename+" for url "+url)
    RenderPDF.generateSinglePdf(url, filename);
  })
}
*/
