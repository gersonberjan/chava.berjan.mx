import React, {useEffect, useRef, useState} from 'react';
import './XtremeGallery.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function XtremeGallery({photos}) {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const en = currentLocale === 'en';
  const [selected, setSelected] = useState(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = event => {
      if (event.key === 'Escape') setSelected(null);
    };
    document.addEventListener('keydown', onKeyDown);
    closeRef.current?.focus();
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [selected]);

  return (
    <>
      <div className="xtreme-gallery">
        {photos.map(photo => (
          <figure key={photo.src} className="xtreme-gallery__item">
            <button type="button" className="xtreme-gallery__thumbnail" onClick={() => setSelected(photo)} aria-label={`${en ? 'Enlarge photo' : 'Ampliar fotografía'}: ${photo.alt}`}>
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
              />
            </button>
          </figure>
        ))}
      </div>
      {selected && (
        <div className="xtreme-lightbox" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setSelected(null); }}>
          <div className="xtreme-lightbox__content" role="dialog" aria-modal="true" aria-label={en ? "Enlarged photograph" : "Fotografía ampliada"}>
            <button ref={closeRef} className="xtreme-lightbox__close" type="button" onClick={() => setSelected(null)} aria-label={en ? "Close photograph" : "Cerrar fotografía"}>×</button>
            <img src={selected.src} alt={selected.alt} />
            <a href={selected.src} target="_blank" rel="noopener noreferrer">{en ? 'Open original image ↗' : 'Abrir imagen original ↗'}</a>
          </div>
        </div>
      )}
    </>
  );
}
