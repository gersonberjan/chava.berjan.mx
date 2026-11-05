/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  knowledgeSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Ciberseguridad',
      items: ['cybersecurity/index'],
    },
    {
      type: 'category',
      label: 'Infraestructura',
      items: ['infrastructure/index'],
    },
    {
      type: 'category',
      label: 'Automatización',
      items: ['automation/index'],
    },
    {
      type: 'category',
      label: 'Inteligencia artificial',
      items: ['ai/index'],
    },
  ],
};

module.exports = sidebars;
