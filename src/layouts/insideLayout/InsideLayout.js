import { Layout } from 'antd';
import Header from './Header';
import Sidebar from './sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import useThemeStore from '../../stores/themeStore';
import { Suspense, useEffect, useState } from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import MyLoader from '../../components/myLoader/MyLoader';
import useWorkspaceStore from '../../stores/workspaceStore';
import DashboardBackground from '../../components/dashboardBackground/DashboardBackground';

const { Content } = Layout;

const SIDEBAR_COLLAPSED_KEY = 'dashboard-sidebar-collapsed';

export default function InsideLayout() {
  const { isMobile, isSmallScreen } = useWindowSize();

  const loaded = useWorkspaceStore((s) => s.loaded);
  const fetchWorkspaces = useWorkspaceStore((s) => s.fetchWorkspaces);

  const dark = useThemeStore((s) => s.dark);
  const toggleDark = useThemeStore((s) => s.toggle);

  const [collapsed, setCollapsed] = useState(() => {
    if (window.innerWidth <= 1024) return true;
    return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === 'true';
  });

  useEffect(() => {
    if (isSmallScreen) setCollapsed(true);
  }, [isSmallScreen]);

  useEffect(() => {
    if (!loaded) fetchWorkspaces().catch(() => {});
  }, [loaded, fetchWorkspaces]);

  const toggleCollapse = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
      return next;
    });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DashboardBackground dark={dark} />
      <Sidebar dark={dark} isMobile={isMobile} collapsed={collapsed} />
      <Layout style={{ background: 'transparent' }}>
        <Header
          dark={dark}
          collapsed={collapsed}
          onToggleDark={toggleDark}
          onToggleCollapse={toggleCollapse}
        />
        <Content
          style={{
            zIndex: 1,
            position: 'relative',
            padding: isMobile ? 16 : 24,
          }}
        >
          <Suspense fallback={<MyLoader />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
}
