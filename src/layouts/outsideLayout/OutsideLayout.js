import { Layout } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import MyFlex from '../../components/myFlex/MyFlex';
import useWindowSize from '../../hooks/useWindowSize';
import OutsideLayoutLeftRender from './OutsideLayoutLeftRender';
import './OutsideLayout.css';

const { Content } = Layout;

const OutsideLayout = () => {
  const { isSmallScreen, isMobile } = useWindowSize();

  return (
    <Layout style={{ height: '100vh' }}>
      <Content style={{ height: '100vh', overflow: 'hidden' }}>
        <MyFlex gap={0} style={{ width: '100%', height: '100%' }}>
          {!isSmallScreen && (
            <div className="ol_left_panel">
              <OutsideLayoutLeftRender />
            </div>
          )}
          <div className="ol_right" style={{ padding: isMobile ? 20 : 32 }}>
            <div className="w_100" style={{ maxWidth: 400, margin: 'auto' }}>
              <Suspense fallback={null}>
                <Outlet />
              </Suspense>
            </div>
          </div>
        </MyFlex>
      </Content>
    </Layout>
  );
};

export default OutsideLayout;
