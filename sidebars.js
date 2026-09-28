/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  knowledgeSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Cybersecurity',
      items: [
        'cybersecurity/index',
        {
          type: 'category',
          label: 'Network Security',
          items: [
            'cybersecurity/network-security/fortigate-ssl-vpn-no-more-addresses',
            'cybersecurity/network-security/forticlient-ssl-vpn-stuck-98',
          ],
        },
      ],
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
