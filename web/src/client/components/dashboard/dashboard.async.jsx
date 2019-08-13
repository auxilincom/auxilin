// @flow

import React, { Suspense } from 'react';

import Loading from 'components/common/loading';

const LoadableComponent = React.lazy(() => import('./index')); // eslint-disable-line

const Async = (props: *): React$Node => {
  return (
    <Suspense fallback={<Loading />}>
      <LoadableComponent {...props} />
    </Suspense>
  );
};

export default Async;
