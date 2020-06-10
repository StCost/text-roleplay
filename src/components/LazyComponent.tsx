import React, { lazy, Suspense } from 'react';
import { Empty } from 'antd';

const LazyComponent = (props: { path: string }) => {
  const C = lazy(() => import(`../${props.path}`));

  return(
    <Suspense
      fallback={<Empty description="Страница загружается..."/>}
    >
      <C/>
    </Suspense>
  );
};

export default LazyComponent;
