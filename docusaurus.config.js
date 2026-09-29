// @ts-check

const config = {
  title: 'Chava Berjan',
  tagline: 'Cybersecurity · Infrastructure · Automation · AI',
  favicon: 'img/favicon.ico',
  url: 'https://chava.berjan.mx',
  baseUrl: '/',
  organizationName: 'gersonberjan',
  projectName: 'chava.berjan.mx',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'knowledge',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          routeBasePath: 'articles',
          showReadingTime: true,
          blogTitle: 'Artículos',
          blogDescription: 'Seguridad desde la operación, infraestructura, automatización e inteligencia artificial.',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-S3T6P57NZN',
          anonymizeIP: true,
        },
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'Chava Berjan',
      items: [
        {to: '/knowledge/intro', label: 'Knowledge', position: 'left'},
        {to: '/articles', label: 'Articles', position: 'left'},
        {to: '/archive', label: 'Archive', position: 'left'},
        {to: '/projects', label: 'Projects', position: 'left'},
        {to: '/about', label: 'About', position: 'left'},
        {href: 'https://github.com/gersonberjan', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Chava Berjan.`,
    },
    prism: {
      additionalLanguages: ['powershell', 'bash', 'python'],
    },
  },
};

module.exports = config;
