import { Layout } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const BlankLayout = () => {
  return (
    <Layout>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </Layout>
  );
};

export default BlankLayout;
