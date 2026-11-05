// Validate the public bilingual routes and basic SEO metadata after Docusaurus builds.
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..', 'build');
const routes = [
  '', 'about', 'archive', 'articles',
  'articles/devops-es-una-cultura-no-un-equipo',
  'articles/la-nube-casi-diez-anos-despues',
  'experience/memorias-profesionales',
  'experience/fortinet-xtreme-team',
  'experience/entrevistas-sgsi',
  'experience/encuentros-tecnologicos',
  'knowledge/intro',
];
const errors = [];
const read = (locale, route) => {
  const file = path.join(root, locale, route, 'index.html');
  if (!fs.existsSync(file)) {
    errors.push('Missing route: ' + file);
    return null;
  }
  return fs.readFileSync(file, 'utf8');
};
for (const route of routes) {
  const spanish = read('', route);
  const english = read('en', route);
  for (const [locale, html] of [['es', spanish], ['en', english]]) {
    if (!html) continue;
    const expectedLang = locale === 'en' ? 'en-US' : 'es-MX';
    const langMatch = html.match(/<html[^>]+lang=["']([^"']+)["']/i);
    if (!langMatch || langMatch[1] !== expectedLang) {
      errors.push('Missing expected HTML language on ' + locale + '/' + route);
    }
    if (!/<link[^>]+rel=["']canonical["']/i.test(html)) {
      errors.push('Missing canonical link on ' + locale + '/' + route);
    }
    if (!/<link[^>]+hreflang=["'](?:es-MX|es|en-US|en)["']/i.test(html)) {
      errors.push('Missing hreflang alternate on ' + locale + '/' + route);
    }
  }
}
if (errors.length) {
  console.error('Bilingual validation failed:\\n' + errors.join('\\n'));
  process.exitCode = 1;
} else {
  console.log('Bilingual route and SEO checks passed for ' + routes.length + ' route pairs.');
}
