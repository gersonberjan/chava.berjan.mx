import React from 'react';
import TOCOriginal from '@theme-original/TOC';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';

const memorySubpages = new Set([
  '/experience/fortinet-xtreme-team',
  '/experience/encuentros-tecnologicos',
]);

// This index has a fixed hierarchy: employers are in-page anchors and
// their related memories are separate pages.
function MemoriesTOC() {
  return (
    <nav aria-label="Índice de Memorias">
      <ul className="table-of-contents table-of-contents__left-border memories-toc-list">
        <li>
          <a className="table-of-contents__link" href="#cero-uno-software-corporativo">Cero Uno Software Corporativo</a>
          <ul>
            <li><Link className="table-of-contents__link" to="/experience/fortinet-xtreme-team">Fortinet Xtreme Team</Link></li>
          </ul>
        </li>
        <li>
          <a className="table-of-contents__link" href="#assetel">Assetel</a>
        </li>
        <li>
          <a className="table-of-contents__link" href="#contpaqi">CONTPAQi</a>
          <ul>
            <li><Link className="table-of-contents__link" to="/experience/encuentros-tecnologicos">Encuentros tecnológicos</Link></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default function TOC(props) {
  const {pathname} = useLocation();
  const path = pathname.replace(/\/$/, '');

  if (path === '/experience/memorias-profesionales') {
    return <MemoriesTOC />;
  }

  if (!memorySubpages.has(path)) return <TOCOriginal {...props} />;

  return (
    <div className="memories-toc-navigation">
      <Link className="memories-toc-return" to="/experience/memorias-profesionales">
        ← Volver a Memorias
      </Link>
      <TOCOriginal {...props} />
    </div>
  );
}
