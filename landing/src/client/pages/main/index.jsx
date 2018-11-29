import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Head from 'next/head';

import Layout from '~/layouts/main';
import ButtonLink from '~/components/button-link';
import { states } from '~/constants';

import styles from './styles.pcss';

import Video from './components/video';
import Pics from './components/pics';

const Green = ({ children }) => {
  return (
    <span className={styles.green}>{children}</span>
  );
};

Green.propTypes = {
  children: PropTypes.node.isRequired,
};

export default () => (
  <Layout className={styles.layout}>
    <Head>
      <title>A brand new next.js landing website</title>
    </Head>

    <Layout.Header></Layout.Header>
    <Layout.Section className={styles.intro}>
      <h1 className={styles.title}>
        {'Launch it right.'}
        {' '}
        <Green>Now.</Green>
      </h1>
      <p className={classnames(styles.subtitle, styles.short)}>
        {`Auxilin is an open-source, production-ready starter kit
        for building SaaS products at a warp speed.
        We save development time and allow you to focus on the nitty gritty of the idea.`}
      </p>
    </Layout.Section>
    <Video />
    <Layout.Section className={styles.help}>
      <div className={styles.leftSide}>
        <h1 className={classnames(styles.title, styles.right, styles.large)}>
          {'We help you'}
          {' '}
          <Green>launch</Green>
          {' '}
          {'quicker, avoid many mistakes and'}
          {' '}
          <Green>succeed</Green>
        </h1>
      </div>
      <div className={styles.rightSide}>
        <Pics />
      </div>
    </Layout.Section>
    <Layout.Section className={styles.clients} isNoBorder>
      <div className={styles.leftSide}>
        <h1 className={classnames(styles.title, styles.right, styles.large)}>
          {'Clients speak'}
        </h1>
      </div>
      <div className={styles.rightSide}>
        <p className={classnames(styles.subtitle, styles.short, styles.quote)}>
          {`Auxilin saved us a lot of time to launch Maqpie back in 2017.
          Keep up great work.`}
        </p>
        <div className={styles.client}>
          <img
            src="/static/andrew.jpeg"
            alt="client"
            className={styles.clientPhoto}
          />
          <p className={classnames(styles.subtitle, styles.short, styles.bold)}>
            {'Andrew, CEO at Maqpie'}
          </p>
        </div>
      </div>
    </Layout.Section>
    <Layout.Section className={styles.waiting} isNoBorder isWithShadow>
      <div className={styles.leftSide}>
        <h1 className={classnames(styles.title, styles.right, styles.large)}>
          <div>What are</div>
          {'you waiting for?'}
        </h1>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.center}>
          <ButtonLink
            className={styles.button}
            href="/signup"
            state={states.green}
          >
            {'Get started for free'}
          </ButtonLink>
        </div>
      </div>
    </Layout.Section>
  </Layout>
);
