import { Layout } from 'antd';
import SidebarNav from './SidebarNav';
import SidebarFooter from './SidebarFooter';
import SidebarWorkspaceSwitcher from './SidebarWorkspaceSwitcher';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import './sidebar.css';

const { Sider } = Layout;

const Sidebar = ({ collapsed, isMobile }) => {
  return (
    <Sider
      theme="light"
      collapsible
      width={240}
      trigger={null}
      collapsed={collapsed}
      className="sidebar_sider"
      collapsedWidth={isMobile ? 0 : 76}
    >
      <MyFlexVertical gap={8} className="h_100 sidebar_inner">
        <SidebarWorkspaceSwitcher collapsed={collapsed} />
        <SidebarNav collapsed={collapsed} />
        <SidebarFooter collapsed={collapsed} />
      </MyFlexVertical>
    </Sider>
  );
};

export default Sidebar;
