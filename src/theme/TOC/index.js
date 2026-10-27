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
    const toc = props.toc?.map((item) => {
      const target = item.value === 'Fortinet Xtreme Team'
        ? '/experience/fortinet-xtreme-team'
        : item.value === 'Encuentros tecnológicos'
          ? '/experience/encuentros-tecnologicos'
          : null;
      return target ? {...item, href: target} : item;
    });
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
