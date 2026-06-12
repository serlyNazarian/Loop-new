import { theme } from 'antd';
import { useState } from 'react';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyText from '../../../components/myText/MyText';
import MyBadge from '../../../components/myBadge/MyBadge';

const SidebarRailButton = ({
  icon,
  label,
  active,
  onClick,
  collapsed,
  badge = 0,
}) => {
  const { token } = theme.useToken();

  const [hover, setHover] = useState(false);

  const background = active
    ? token.navActiveBg
    : hover
      ? token.colorBgTextHover
      : 'transparent';

  const color = active
    ? token.colorPrimary
    : hover
      ? token.colorText
      : token.colorTextSecondary;

  const flexStyle = {
    background,
    cursor: 'pointer',
    borderRadius: token.radiusItem,
    transition: 'background 150ms',
    padding: collapsed ? 9 : '9px 12px',
    justifyContent: collapsed ? 'center' : 'flex-start',
  };

  return (
    <MyFlex
      gap={12}
      align="center"
      onClick={onClick}
      style={flexStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <MyBadge count={badge} size="small" offset={[4, -2]}>
        <span style={{ color, display: 'flex', fontSize: 16, flexShrink: 0 }}>
          {icon}
        </span>
      </MyBadge>
      {!collapsed && (
        <MyText
          ellipsis
          color={color}
          fontSize={13}
          fontWeight={active ? 600 : 500}
          style={{ flex: 1, minWidth: 0 }}
        >
          {label}
        </MyText>
      )}
    </MyFlex>
  );
};

export default SidebarRailButton;
