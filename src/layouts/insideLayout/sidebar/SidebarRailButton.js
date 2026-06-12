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

  return (
    <MyFlex
      gap={12}
      align="center"
      onClick={onClick}
      className={`sidebar_row${collapsed ? ' sidebar_row_collapsed' : ''}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background,
        borderRadius: token.borderRadiusL,
        padding: collapsed ? 9 : '9px 12px',
      }}
    >
      <MyBadge count={badge} size="small" offset={[4, -2]}>
        <span
          className="d_flex flex_shrink_0"
          style={{ color, fontSize: token.fontSizeLG }}
        >
          {icon}
        </span>
      </MyBadge>
      {!collapsed && (
        <MyText
          ellipsis
          color={color}
          fontSize={13}
          className="flex_1 min_w_0"
          fontWeight={active ? 600 : 500}
        >
          {label}
        </MyText>
      )}
    </MyFlex>
  );
};

export default SidebarRailButton;
