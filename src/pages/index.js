import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout title="Chava Berjan" description="Cybersecurity, infrastructure, automation and AI knowledge hub">
      <main>
        <section className={styles.hero}>
          <div className="container">
            <p className={styles.eyebrow}>CHAVA BERJAN</p>
            <h1>Cybersecurity · Infrastructure · Automation · AI</h1>
            <p className={styles.description}>
              Experiencias, conocimiento y proyectos sobre tecnología.
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/knowledge/intro">Explorar Knowledge Base</Link>
              <Link className="button button--secondary button--lg" to="/articles">Leer artículos</Link>
            </div>
          </div>
        </section>
        <section className={styles.sections}>
          <div className="container">
            <div className="row">
              <div className="col col--3"><h3>Cybersecurity</h3><p>Detección, monitoreo, controles y operación.</p></div>
              <div className="col col--3"><h3>Infrastructure</h3><p>Redes, sistemas, servicios y arquitectura.</p></div>
              <div className="col col--3"><h3>Automation</h3><p>Python, PowerShell, APIs e integraciones.</p></div>
              <div className="col col--3"><h3>AI</h3><p>Fundamentos, LLM y seguridad aplicada.</p></div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
