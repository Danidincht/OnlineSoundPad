import React, { lazy, Suspense } from 'react';

const LazyItemInput = lazy(() => import('./ItemInput'));

const ItemInput = props => (
  <Suspense fallback={null}>
    <LazyItemInput {...props} />
  </Suspense>
);

export default ItemInput;
