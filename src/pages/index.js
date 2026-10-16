import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const posts = [
  {title: 'DevOps es una cultura, no un equipo', url: '/articles/devops-es-una-cultura-no-un-equipo', description: 'Una experiencia sobre agilidad, automatización y colaboración entre Desarrollo, Operaciones y Seguridad.'},
  {title: 'La nube, casi diez años después', url: '/articles/la-nube-casi-diez-anos-despues', description: 'Una reflexión sobre la nube, la operación digital y las decisiones tecnológicas.'},
];

export default function Home() {
  return (
    <Layout title="Inicio" description="Experiencias, conocimiento y reflexiones sobre tecnología y operación.">
      <main>
        <section className={styles.hero}>
          <div className="container">
            <p className={styles.eyebrow}>CHAVA BERJAN</p>
            <h1>Entender la tecnología desde la experiencia.</h1>
            <p className={styles.description}>Experiencias, conocimiento y reflexiones sobre tecnología, operación y la forma en que trabajamos.</p>
            <Link className="button button--primary" to="/articles">Leer publicaciones</Link>
          </div>
        </section>
        <section className={styles.posts}>
          <div className="container">
            <div className={styles.sectionHeading}><h2>Publicaciones recientes</h2><Link to="/articles">Ver todas →</Link></div>
            <div className="row">
              {posts.map(post => (
                <article className="col col--6" key={post.url}>
                  <div className={styles.postCard}>
                    <h3><Link to={post.url}>{post.title}</Link></h3>
                    <p>{post.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.explore}>
          <div className="container">
            <h2>Explorar el sitio</h2>
            <p><Link to="/articles">Publicaciones</Link> · <Link to="/archive">Archivo</Link> · <Link to="/about">Sobre mí</Link></p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
