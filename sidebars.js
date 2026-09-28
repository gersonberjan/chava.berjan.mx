/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  knowledgeSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Cybersecurity',
      items: ['cybersecurity/index'],
    },
    {
      type: 'category',
      label: 'Infrastructure',
      items: ['infrastructure/index'],
    },
    {
      type: 'category',
      label: 'Automation',
      items: ['automation/index'],
    },
    {
      type: 'category',
      label: 'Artificial Intelligence',
      items: ['ai/index'],
    },
  ],
};

module.exports = sidebars;
