import { Layout, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ArrowLeftOutlined,
  MoonOutlined,
  SunOutlined,
} from '@ant-design/icons';
import { TITLES } from './insideLayoutConstants';
import MyFlex from '../../components/myFlex/MyFlex';
import MyText from '../../components/myText/MyText';
import useWindowSize from '../../hooks/useWindowSize';
import MyButton from '../../components/myButton/MyButton';
import { useLocation, useNavigate } from 'react-router-dom';

const { Header: AntHeader } = Layout;

const Header = ({ collapsed, dark, onToggleCollapse, onToggleDark }) => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isMobile } = useWindowSize();

  const headerStyle = {
    zIndex: 1,
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    padding: isMobile ? '0 12px' : '0 20px',
    background: dark ? token.headerGlassDark : token.headerGlass,
    borderBottom: `1px solid ${dark ? token.sidebarBorderDark : token.sidebarBorder}`,
  };

  return (
    <AntHeader style={headerStyle}>
      <MyFlex align="center" gap={8} style={{ flex: 1, minWidth: 0 }}>
        <MyButton
          type="text"
          icon={
            collapsed ? (
              <MenuUnfoldOutlined style={{ fontSize: 20 }} />
            ) : (
              <MenuFoldOutlined style={{ fontSize: 20 }} />
            )
          }
          onClick={onToggleCollapse}
          aria-label="Toggle sidebar"
        />
        {pathname !== '/dashboard' && (
          <MyButton
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          >
            {isMobile ? null : 'Back'}
          </MyButton>
        )}
        <MyText
          bold
          ellipsis
          fontSize={20}
          style={{ letterSpacing: '-0.02em' }}
        >
          {TITLES[pathname] || 'Dashboard'}
        </MyText>
      </MyFlex>
      <MyButton
        type="text"
        icon={
          dark ? (
            <SunOutlined style={{ fontSize: 20 }} />
          ) : (
            <MoonOutlined style={{ fontSize: 20 }} />
          )
        }
        onClick={onToggleDark}
        aria-label="Toggle theme"
      />
    </AntHeader>
  );
};

export default Header;
