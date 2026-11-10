import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

const content = {
  es: {
    eyebrow: 'TECNOLOGÍA · CIBERSEGURIDAD · EXPERIENCIA',
    title: 'Tecnología con', accent: 'propósito',
    intro: 'Experiencia, conocimiento y una mirada práctica sobre ciberseguridad, infraestructura, innovación y liderazgo tecnológico.',
    cta: 'Explorar publicaciones', secondary: 'Conocer mi trayectoria',
    topics: [
      ['◇', 'Ciberseguridad', 'Seguridad desde la operación'],
      ['◎', 'Innovación', 'Tecnología que transforma'],
      ['♧', 'Liderazgo', 'Personas, equipos y decisiones'],
      ['▤', 'Compartir', 'Experiencias y aprendizaje'],
    ],
    latest: 'Últimas publicaciones', all: 'Ver todas las publicaciones',
    about: 'Sobre mí', aboutText: 'Una trayectoria construida desde la infraestructura, la nube y la seguridad de la información.', aboutLink: 'Conocer mi historia',
    memories: 'Memorias profesionales', memoriesText: 'Personas, encuentros y momentos que también forman parte de mi trayectoria.', memoriesLink: 'Explorar memorias',
    posts: [
      {title: 'DevOps es una cultura, no un equipo', description: 'Agilidad, automatización y colaboración entre Desarrollo, Operaciones y Seguridad.', path: '/articles/devops-es-una-cultura-no-un-equipo', category: 'OPERACIÓN', art: 'operations'},
      {title: 'La nube, casi diez años después', description: 'Una reflexión sobre la nube, la operación digital y las decisiones tecnológicas.', path: '/articles/la-nube-casi-diez-anos-despues', category: 'TECNOLOGÍA', art: 'cloud'},
    ],
  },
  en: {
    eyebrow: 'TECHNOLOGY · CYBERSECURITY · EXPERIENCE',
    title: 'Technology with', accent: 'purpose',
    intro: 'Experience, knowledge and a practical perspective on cybersecurity, infrastructure, innovation and technology leadership.',
    cta: 'Explore articles', secondary: 'Discover my journey',
    topics: [
      ['◇', 'Cybersecurity', 'Security from operations'],
      ['◎', 'Innovation', 'Technology that transforms'],
      ['♧', 'Leadership', 'People, teams and decisions'],
      ['▤', 'Sharing', 'Experience and learning'],
    ],
    latest: 'Recent articles', all: 'View all articles',
    about: 'About me', aboutText: 'A professional journey shaped by infrastructure, cloud and information security.', aboutLink: 'Discover my story',
    memories: 'Professional memories', memoriesText: 'People, events and moments that are also part of my journey.', memoriesLink: 'Explore memories',
    posts: [
      {title: 'DevOps is a culture, not a team', description: 'Agility, automation and collaboration across Development, Operations and Security.', path: '/articles/devops-es-una-cultura-no-un-equipo', category: 'OPERATIONS', art: 'operations'},
      {title: 'The cloud, almost ten years later', description: 'A reflection on cloud, digital operations and technology decisions.', path: '/articles/la-nube-casi-diez-anos-despues', category: 'TECHNOLOGY', art: 'cloud'},
    ],
  },
};

export default function Home() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const en = currentLocale === 'en';
  const t = content[en ? 'en' : 'es'];
  const prefix = en ? '/en' : '';
  return (
    <Layout title={en ? 'Technology with purpose' : 'Tecnología con propósito'} description={t.intro}>
      <main className={styles.home}>
        <section className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.heroGlobe} aria-hidden="true"><span /><span /><span /></div>
          <div className={'container ' + styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{t.eyebrow}</p>
              <h1>{t.title}<br /><em>{t.accent}</em></h1>
              <p className={styles.intro}>{t.intro}</p>
              <div className={styles.actions}>
                <Link className={styles.primaryAction} to={prefix + '/articles'}>{t.cta} <span aria-hidden="true">→</span></Link>
                <Link className={styles.secondaryAction} to={prefix + '/about'}>{t.secondary} <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
            <div className={styles.heroSignature} aria-hidden="true"><span>CHAVA</span><span>BERJAN</span></div>
          </div>
        </section>
        <section className={styles.topicSection} aria-label={en ? 'Areas of interest' : 'Áreas de interés'}>
          <div className={'container ' + styles.topicGrid}>
            {t.topics.map(([symbol, title, description]) => (
              <div className={styles.topicCard} key={title}>
                <span className={styles.topicSymbol} aria-hidden="true">{symbol}</span>
                <div><h2>{title}</h2><p>{description}</p></div>
              </div>
            ))}
          </div>
        </section>
        <section className={styles.contentSection}>
          <div className={'container ' + styles.editorialGrid}>
            <div className={styles.mainColumn}>
              <div className={styles.sectionHeading}><div><span className={styles.rule} /><h2>{t.latest}</h2></div><Link to={prefix + '/articles'}>{t.all} <span aria-hidden="true">→</span></Link></div>
              <div className={styles.postGrid}>
                {t.posts.map(post => (
                  <article className={styles.postCard} key={post.path}>
                    <Link to={prefix + post.path} className={styles.postLink}>
                      <div className={styles.postVisual + ' ' + styles[post.art]} aria-hidden="true"><span>{post.art === 'cloud' ? '☁' : '⌘'}</span></div>
                      <div className={styles.postBody}><span className={styles.category}>{post.category}</span><h3>{post.title}</h3><p>{post.description}</p><span className={styles.readMore}>{en ? 'Read article' : 'Leer artículo'} →</span></div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
            <aside className={styles.sideColumn}>
              <div className={styles.aboutCard}><span className={styles.sideKicker}>{en ? 'THE PERSON BEHIND THE SITE' : 'DETRÁS DE ESTE SITIO'}</span><h2>{t.about}</h2><p>{t.aboutText}</p><Link to={prefix + '/about'}>{t.aboutLink} →</Link></div>
              <div className={styles.memoriesCard}><span className={styles.sideKicker}>{en ? 'EXPERIENCES' : 'EXPERIENCIAS'}</span><h2>{t.memories}</h2><p>{t.memoriesText}</p><Link to={prefix + '/experience/memorias-profesionales'}>{t.memoriesLink} →</Link><img src="/img/memorias-contpaqi-22-nuevas-oficinas.jpg" alt="" loading="lazy" /></div>
            </aside>
          </div>
        </section>
      </main>
    </Layout>
  );
}
