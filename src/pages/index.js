import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout title="Salvador Chava Berjan" description="Cybersecurity, infrastructure, automation and AI knowledge base">
      <main>
        <section className={styles.hero}>
          <div className="container">
            <p className={styles.eyebrow}>SALVADOR “CHAVA” BERJAN</p>
            <h1>Seguridad desde la operación.</h1>
            <p className={styles.subtitle}>Cybersecurity · Infrastructure · Automation · AI</p>
            <p className={styles.description}>
              Conocimiento, documentación y experiencias construidas desde la operación de tecnología y ciberseguridad.
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
