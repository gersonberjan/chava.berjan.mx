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
