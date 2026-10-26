const fs = require('node:fs');
const path = require('node:path');

const file = path.join(__dirname, '..', 'build', '404.html');
const html = fs.readFileSync(file, 'utf8');
const robotsTag = '<meta name="robots" content="noindex, follow">';
if (/<meta\\s+[^>]*name=["']robots["']/i.test(html)) {
  throw new Error('404.html already contains a robots meta tag; review it before changing');
}
if (!html.includes('</head>')) {
  throw new Error('404.html does not contain a closing head tag');
}
fs.writeFileSync(file, html.replace('</head>', robotsTag + '</head>'));
console.log('Added noindex only to build/404.html');
