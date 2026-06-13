import { Layout, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ArrowLeftOutlined,
  MoonOutlined,
  SunOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { TITLES } from '../insideLayoutConstants';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyText from '../../../components/myText/MyText';
import useWindowSize from '../../../hooks/useWindowSize';
import { useLocation, useNavigate } from 'react-router-dom';
import MyButton from '../../../components/myButton/MyButton';
import './header.css';

const { Header: AntHeader } = Layout;

const Header = ({ collapsed, dark, onToggleCollapse, onToggleDark }) => {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const { pathname } = useLocation();
  const { isMobile } = useWindowSize();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () =>
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');

  const headerStyle = { padding: isMobile ? '0 12px' : '0 20px' };

  return (
    <AntHeader className="header_bar" style={headerStyle}>
      <MyFlex align="center" gap={8} className="flex_1 min_w_0">
        <MyButton
          type="text"
          icon={
            collapsed ? (
              <MenuUnfoldOutlined style={{ fontSize: token.fontSizeXL }} />
            ) : (
              <MenuFoldOutlined style={{ fontSize: token.fontSizeXL }} />
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
            {isMobile ? null : t('common_back')}
          </MyButton>
        )}
        <MyText bold ellipsis fontSize={20} className="header_title">
          {t(TITLES[pathname] || 'nav_dashboard')}
        </MyText>
      </MyFlex>
      <MyFlex align="center" gap={4}>
        <MyButton
          type="text"
          icon={<GlobalOutlined style={{ fontSize: token.fontSizeXL }} />}
          onClick={toggleLanguage}
          aria-label="Toggle language"
        >
          {isMobile ? null : t('language_toggle')}
        </MyButton>
        <MyButton
          type="text"
          icon={
            dark ? (
              <SunOutlined style={{ fontSize: token.fontSizeXL }} />
            ) : (
              <MoonOutlined style={{ fontSize: token.fontSizeXL }} />
            )
          }
          onClick={onToggleDark}
          aria-label="Toggle theme"
        />
      </MyFlex>
    </AntHeader>
  );
};

export default Header;
