import React, {useEffect, useRef} from 'react';
import BlogPostItemContent from '@theme-original/BlogPostItem/Content';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useColorMode} from '@docusaurus/theme-common';

function GiscusComments() {
  const containerRef = useRef(null);
  const {colorMode} = useColorMode();
  const {siteConfig} = useDocusaurusContext();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', 'gersonberjan/chava.berjan.mx');
    script.setAttribute('data-repo-id', 'R_kgDOUw5CRg');
    script.setAttribute('data-category', 'Artículos');
    script.setAttribute('data-category-id', 'DIC_kwDOUw5CRs4DGrax');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', colorMode === 'dark' ? 'dark' : 'light');
    script.setAttribute('data-lang', 'es');
    script.setAttribute('data-loading', 'lazy');

    container.appendChild(script);

    return () => {
      container.replaceChildren();
    };
  }, []);

  useEffect(() => {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe?.contentWindow) return;

    iframe.contentWindow.postMessage(
      {
        giscus: {
          setConfig: {
            theme: colorMode === 'dark' ? 'dark' : 'light',
          },
        },
      },
      'https://giscus.app',
    );
  }, [colorMode, siteConfig]);

  return <div ref={containerRef} className="giscus-wrapper" />;
}

export default function BlogPostItemContentWrapper(props) {
  const {isBlogPostPage} = useBlogPost();

  return (
    <>
      <BlogPostItemContent {...props} />
      {isBlogPostPage && <GiscusComments />}
    </>
  );
}
