import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function NotFound() {
  return (
    <Layout title="Página no encontrada">
      <main className="container margin-vert--xl">
        <h1>Página no encontrada</h1>
        <p>La nota que buscas pudo cambiar de ubicación o todavía no está publicada.</p>
        <Link className="button button--primary" to="/knowledge/intro">Ir a Knowledge Base</Link>
      </main>
    </Layout>
  );
}
