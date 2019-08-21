import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { states } from '~/constants';

import Link from '~/components/link';
import Button, { sizes } from '~/components/button';

import styles from './styles.pcss';

const ButtonLink = ({
  href,
  children,
  prefetch,
  className,
  isLoading,
  state,
  size,
}) => {
  return (
    <Button
      isLoading={isLoading}
      state={state}
      size={size}
      className={classnames(styles.button, className)}
    >
      <Link href={href} className={classnames(styles.link, styles[size])} prefetch={prefetch}>
        {children}
      </Link>
    </Button>
  );
};

ButtonLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  prefetch: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.string,
  state: PropTypes.string,
  isLoading: PropTypes.bool,
};

ButtonLink.defaultProps = {
  prefetch: false,
  className: '',
  size: sizes.medium,
  state: states.transparent,
  isLoading: false,
};

export default ButtonLink;
