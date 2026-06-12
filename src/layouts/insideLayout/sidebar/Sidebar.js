import { Layout, theme } from 'antd';
import SidebarNav from './SidebarNav';
import SidebarFooter from './SidebarFooter';
import SidebarWorkspaceSwitcher from './SidebarWorkspaceSwitcher';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import './sidebar.css';

const { Sider } = Layout;

const Sidebar = ({ collapsed, dark, isMobile }) => {
  const { token } = theme.useToken();

  const siderStyle = {
    zIndex: 2,
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    background: dark ? token.sidebarGlassDark : token.sidebarGlass,
    borderInlineEnd: `1px solid ${dark ? token.sidebarBorderDark : token.sidebarBorder}`,
  };

  return (
    <Sider
      theme="light"
      collapsible
      width={240}
      trigger={null}
      style={siderStyle}
      collapsed={collapsed}
      collapsedWidth={isMobile ? 0 : 76}
    >
      <MyFlexVertical gap={8} style={{ height: '100%', paddingTop: 14 }}>
        <SidebarWorkspaceSwitcher collapsed={collapsed} />
        <SidebarNav collapsed={collapsed} />
        <SidebarFooter collapsed={collapsed} />
      </MyFlexVertical>
    </Sider>
  );
};

export default Sidebar;
