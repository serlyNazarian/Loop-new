import { Layout } from 'antd';
import SidebarNav from './SidebarNav';
import SidebarFooter from './SidebarFooter';
import { CloseOutlined } from '@ant-design/icons';
import MyButton from '../../../components/myButton/MyButton';
import MyDrawer from '../../../components/myDrawer/MyDrawer';
import SidebarWorkspaceSwitcher from './SidebarWorkspaceSwitcher';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import './sidebar.css';

const { Sider } = Layout;

const Sidebar = ({ collapsed, isMobile, onClose }) => {
  if (isMobile) {
    return (
      <MyDrawer
        zIndex={1100}
        placement="left"
        onClose={onClose}
        closable={false}
        open={!collapsed}
        rootClassName="sidebar_drawer"
        styles={{ wrapper: { width: '60%' } }}
        extra={
          <MyButton
            type="text"
            aria-label="Close"
            onClick={onClose}
            icon={<CloseOutlined />}
          />
        }
      >
        <MyFlexVertical gap={8} className="h_100 sidebar_inner">
          <SidebarWorkspaceSwitcher collapsed={false} />
          <SidebarNav collapsed={false} onNavigate={onClose} />
          <SidebarFooter collapsed={false} />
        </MyFlexVertical>
      </MyDrawer>
    );
  }

  return (
    <Sider
      theme="light"
      collapsible
      width={240}
      trigger={null}
      collapsedWidth={76}
      collapsed={collapsed}
      className="sidebar_sider"
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
