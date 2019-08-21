import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';

const Link = ({
  href,
  className,
  children,
  prefetch,
}) => {
  return (
    <NextLink
      prefetch={prefetch}
      href={href}
    >
      <a href={href} className={className}>
        {children}
      </a>
    </NextLink>
  );
};

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  prefetch: PropTypes.bool,
};

Link.defaultProps = {
  className: '',
  prefetch: false,
};

export default Link;
