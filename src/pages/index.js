import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const posts = [
  {title: 'DevOps es una cultura, no un equipo', url: '/articles/devops-es-una-cultura-no-un-equipo', description: 'Una experiencia sobre agilidad, automatización y colaboración entre Desarrollo, Operaciones y Seguridad.'},
  {title: 'La nube, casi diez años después', url: '/articles/la-nube-casi-diez-anos-despues', description: 'Una reflexión sobre la nube, la operación digital y las decisiones tecnológicas.'},
];

export default function Home() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const en = currentLocale === 'en';
  const localePrefix = en ? '/en' : '';
  const localizedPosts = en ? [
    {title: 'DevOps is a culture, not a team', url: '/articles/devops-es-una-cultura-no-un-equipo', description: 'An experience with agility, automation and collaboration across Development, Operations and Security.'},
    {title: 'The cloud, almost ten years later', url: '/articles/la-nube-casi-diez-anos-despues', description: 'A reflection on cloud, digital operations and technology decisions.'},
  ] : posts;
  return (
    <Layout title={en ? "Technology through experience" : "Tecnología desde la experiencia"} description={en ? "Chava Berjan’s experiences and reflections on cybersecurity, infrastructure, cloud, automation and technology operations." : "Experiencias y reflexiones de Chava Berjan sobre ciberseguridad, infraestructura, nube, automatización y operación tecnológica."}>
      <main>
        <section className={styles.hero}>
          <div className="container">
            <p className={styles.eyebrow}>{en ? 'TECHNOLOGY · OPERATIONS · KNOWLEDGE' : 'TECNOLOGÍA · OPERACIÓN · CONOCIMIENTO'}</p>
            <h1>Chava Berjan</h1>
            <h2 className={styles.heroSubtitle}>{en ? 'Understanding technology through experience.' : 'Entender la tecnología desde la experiencia.'}</h2>
            <p className={styles.description}>{en ? 'Experiences, knowledge and reflections on technology, operations and how we work.' : 'Experiencias, conocimiento y reflexiones sobre tecnología, operación y la forma en que trabajamos.'}</p>
            <Link className="button button--primary" to={`${localePrefix}/articles`}>{en ? 'Read articles' : 'Leer publicaciones'}</Link>
          </div>
        </section>
        <section className={styles.posts}>
          <div className="container">
            <div className={styles.sectionHeading}><h2>{en ? 'Recent articles' : 'Publicaciones recientes'}</h2><Link to={`${localePrefix}/articles`}>{en ? 'View all →' : 'Ver todas →'}</Link></div>
            <div className="row">
              {localizedPosts.map(post => (
                <article className="col col--6" key={post.url}>
                  <div className={styles.postCard}>
                    <h3><Link to={`${localePrefix}${post.url}`}>{post.title}</Link></h3>
                    <p>{post.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.explore}>
          <div className="container">
            <h2>{en ? 'Explore the website' : 'Explorar el sitio'}</h2>
            <p><Link to={`${localePrefix}/articles`}>{en ? 'Articles' : 'Publicaciones'}</Link> · <Link to={`${localePrefix}/archive`}>{en ? 'Archive' : 'Archivo'}</Link> · <Link to={`${localePrefix}/about`}>{en ? 'About me' : 'Sobre mí'}</Link></p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
