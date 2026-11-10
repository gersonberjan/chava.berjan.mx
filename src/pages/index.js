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
      ['shield', 'Ciberseguridad', 'Seguridad desde la operación', '/articles'],
      ['cloud', 'Innovación', 'Tecnología que transforma', '/articles/la-nube-casi-diez-anos-despues'],
      ['users', 'Liderazgo', 'Personas, equipos y decisiones', '/articles/devops-es-una-cultura-no-un-equipo'],
      ['book', 'Compartir', 'Experiencias y aprendizaje', '/experience/memorias-profesionales'],
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
      ['shield', 'Cybersecurity', 'Security from operations', '/articles'],
      ['cloud', 'Innovation', 'Technology that transforms', '/articles/la-nube-casi-diez-anos-despues'],
      ['users', 'Leadership', 'People, teams and decisions', '/articles/devops-es-una-cultura-no-un-equipo'],
      ['book', 'Sharing', 'Experience and learning', '/experience/memorias-profesionales'],
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

function TopicIcon({name}) {
  const paths = {
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></>,
    cloud: <><path d="M20 16.6A4.5 4.5 0 0 0 18 8a6 6 0 0 0-11.5 1.8A4 4 0 0 0 7 18h11a4 4 0 0 0 2-1.4z" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    book: <><path d="M12 7v14M3 18V4a2 2 0 0 1 2-2h4a3 3 0 0 1 3 3 3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2h-4a3 3 0 0 0-3 3 3 3 0 0 0-3-3H5a2 2 0 0 0-2 2z" /></>,
  };
  return <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

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
            <div className={styles.heroPortrait}><img src="/img/chava-berjan-perfil.png" alt={en ? "Portrait of Chava Berjan" : "Retrato de Chava Berjan"} fetchPriority="high" /></div>
          </div>
        </section>
        <section className={styles.topicSection} aria-label={en ? 'Areas of interest' : 'Áreas de interés'}>
          <div className={'container ' + styles.topicGrid}>
            {t.topics.map(([symbol, title, description, path]) => (
              <Link className={styles.topicCard} to={prefix + path} key={title} aria-label={title + ': ' + description}>
                <span className={styles.topicSymbol}><TopicIcon name={symbol} /></span>
                <div><h2>{title}</h2><p>{description}</p></div>
                <span className={styles.topicArrow} aria-hidden="true">↗</span>
              </Link>
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
                      <div className={styles.postVisual + ' ' + styles[post.art]} aria-hidden="true"><span><TopicIcon name={post.art === 'cloud' ? 'cloud' : 'users'} /></span></div>
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
