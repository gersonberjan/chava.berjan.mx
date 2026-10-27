import React from 'react';
import TOCOriginal from '@theme-original/TOC';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';

const memorySubpages = new Set([
  '/experience/fortinet-xtreme-team',
  '/experience/encuentros-tecnologicos',
]);

const destinationById = {
  'fortinet-xtreme-team': '/experience/fortinet-xtreme-team',
  'encuentros-tecnologicos': '/experience/encuentros-tecnologicos',
};

// Render this page's TOC ourselves: Docusaurus's automatic TOC is designed
// primarily for in-page anchors, not links to other pages.
function MemoriesTOCItems({items = []}) {
  return (
    <ul className="table-of-contents table-of-contents__left-border">
      {items.map((item) => {
        const id = item.id || (item.href || '').replace(/^#/, '');
        // Docusaurus may retain accented characters in generated heading IDs.
        const normalizedId = decodeURIComponent(id).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const destination = destinationById[normalizedId];
        const label = destination
          ? (normalizedId === 'fortinet-xtreme-team' ? 'Fortinet Xtreme Team' : 'Encuentros tecnológicos')
          : item.value;
        return (
          <li key={item.id || item.href} className="memories-toc-item">
            {destination ? (
              <Link className="table-of-contents__link" to={destination}>{label}</Link>
            ) : (
              <a className="table-of-contents__link" href={item.href}
                dangerouslySetInnerHTML={{__html: label}} />
            )}
            {item.children?.length > 0 && <MemoriesTOCItems items={item.children} />}
          </li>
        );
      })}
    </ul>
  );
}

export default function TOC(props) {
  const {pathname} = useLocation();
  const path = pathname.replace(/\/$/, '');

  if (path === '/experience/memorias-profesionales') {
    return <nav aria-label="Índice de Memorias"><MemoriesTOCItems items={props.toc} /></nav>;
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
