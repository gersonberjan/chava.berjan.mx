import React from 'react';
import {Redirect} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Knowledge() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  return <Redirect to={currentLocale === 'en' ? '/en/knowledge/intro' : '/knowledge/intro'} />;
}
