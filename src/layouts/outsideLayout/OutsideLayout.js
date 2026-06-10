import { Layout, theme } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import MyFlex from '../../components/myFlex/MyFlex';
import useWindowSize from '../../hooks/useWindowSize';
import OutsideLayoutLeftRender from './OutsideLayoutLeftRender';
import MyFlexCenter from '../../components/myFlex/MyFlexCenter';

const { Content } = Layout;

const OutsideLayout = () => {
  const { isSmallScreen, isMobile } = useWindowSize();
  const { token } = theme.useToken();

  const rightPanel = {
    flex: 1,
    minHeight: '100vh',
    backgroundColor: token.authPanelBg,
    backgroundImage: token.authPanelOverlay,
    backgroundSize: token.authPanelOverlaySize,
    padding: isMobile ? 20 : 32,
  };

  return (
    <Layout>
      <Content>
        <MyFlex gap={0} style={{ width: '100%' }}>
          {!isSmallScreen && (
            <div style={{ flex: '0 0 50%', maxWidth: '50%', display: 'flex', minHeight: '100vh' }}>
              <OutsideLayoutLeftRender />
            </div>
          )}
          <MyFlexCenter style={rightPanel}>
            <div style={{ width: '100%', maxWidth: 448 }}>
              <Suspense fallback={null}>
                <Outlet />
              </Suspense>
            </div>
          </MyFlexCenter>
        </MyFlex>
      </Content>
    </Layout>
  );
};

export default OutsideLayout;
