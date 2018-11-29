import React from 'react';
import classnames from 'classnames';

import styles from './styles.pcss';

const pics = [
  {
    img: 'static/strategy.jpg',
    alt: 'Strategy',
    content: (
      <span className={styles.text}>Strategy</span>
    ),
  },
  {
    img: 'static/launch.jpg',
    alt: 'Launch',
    content: (
      <span className={styles.text}>Launch</span>
    ),
  },
  {
    img: 'static/integration.jpg',
    alt: 'CI',
    content: (
      <span className={classnames(styles.text, styles.twoLines)}>
        {'Continuous'}
        <br />
        {'Integration'}
      </span>
    ),
  },
  {
    img: 'static/monitoring.jpg',
    alt: 'Monitoring',
    content: (
      <span className={styles.text}>Monitoring</span>
    ),
  },
  {
    img: 'static/koa-react.jpg',
    alt: 'Stack',
    content: (
      <span className={styles.text}>
        {'Node & React'}
      </span>
    ),
  },
  {
    img: 'static/deploy.jpg',
    alt: 'Deployment',
    content: (
      <span className={classnames(styles.text, styles.twoLines)}>
        {'Easy'}
        <br />
        {'Deployment'}
      </span>
    ),
  },
];

export default () => (
  <div className={styles.pics}>
    {pics.map((pic) => {
      return (
        <div key={pic.alt} className={styles.pic}>
          <img src={pic.img} alt={pic.alt} />
          <div className={styles.textWrap}>
            {pic.content}
          </div>
        </div>
      );
    })}
  </div>
);
