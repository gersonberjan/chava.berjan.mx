import React from 'react';
import TOCOriginal from '@theme-original/TOC';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';

const memorySubpages = new Set([
  '/experience/fortinet-xtreme-team',
  '/experience/encuentros-tecnologicos',
]);

export default function TOC(props) {
  const {pathname} = useLocation();
  const showReturn = memorySubpages.has(pathname.replace(/\/$/, ''));

  const isMemoriesIndex = pathname.replace(/\/$/, '') === '/experience/memorias-profesionales';
  if (isMemoriesIndex) {
    // The headings are nested under their employer sections in the TOC tree.
    const remapLinks = (items = []) => items.map((item) => {
      const target = item.value === 'Fortinet Xtreme Team'
        ? '/experience/fortinet-xtreme-team'
        : item.value === 'Encuentros tecnológicos'
          ? '/experience/encuentros-tecnologicos'
          : null;
      return {
        ...item,
        ...(target ? {href: target} : {}),
        ...(item.children ? {children: remapLinks(item.children)} : {}),
      };
    });
    const toc = remapLinks(props.toc);
    return <TOCOriginal {...props} toc={toc} />;
  }

  if (!showReturn) return <TOCOriginal {...props} />;

  return (
    <div className="memories-toc-navigation">
      <Link className="memories-toc-return" to="/experience/memorias-profesionales">
        ← Volver a Memorias
      </Link>
      <TOCOriginal {...props} />
    </div>
  );
}
