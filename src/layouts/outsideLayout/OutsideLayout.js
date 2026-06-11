import { Layout, theme } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import MyFlex from '../../components/myFlex/MyFlex';
import useWindowSize from '../../hooks/useWindowSize';
import OutsideLayoutLeftRender from './OutsideLayoutLeftRender';

const { Content } = Layout;

const OutsideLayout = () => {
  const { token } = theme.useToken();
  const { isSmallScreen, isMobile } = useWindowSize();

  const rightPanel = {
    flex: 1,
    display: 'flex',
    overflowY: 'auto',
    flexDirection: 'column',
    padding: isMobile ? 20 : 32,
    backgroundColor: token.authPanelBg,
    backgroundImage: token.authPanelOverlay,
    backgroundSize: token.authPanelOverlaySize,
  };

  const leftPanel = {
    flex: '0 0 50%',
    maxWidth: '50%',
    display: 'flex',
    height: '100%',
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Content style={{ height: '100vh', overflow: 'hidden' }}>
        <MyFlex gap={0} style={{ width: '100%', height: '100%' }}>
          {!isSmallScreen && (
            <div style={leftPanel}>
              <OutsideLayoutLeftRender />
            </div>
          )}
          <div style={rightPanel}>
            <div style={{ width: '100%', maxWidth: 400, margin: 'auto' }}>
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
