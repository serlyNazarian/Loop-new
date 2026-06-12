import { theme } from 'antd';
import { useState } from 'react';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyText from '../../../components/myText/MyText';
import MyTooltip from '../../../components/myTooltip/MyTooltip';

const SidebarNavItem = ({ item, active, collapsed, onClick }) => {
  const { token } = theme.useToken();

  const { featured, label, icon } = item;

  const [hover, setHover] = useState(false);

  let background = 'transparent';
  let color = token.colorTextSecondary;
  let boxShadow;
  let fontWeight = 500;

  if (featured) {
    background = token.navFeaturedGradient;
    color = token.colorWhite;
    boxShadow =
      hover || active ? token.navFeaturedShadowHover : token.navFeaturedShadow;
    fontWeight = 600;
  } else if (active) {
    background = token.navActiveBg;
    color = token.colorPrimary;
    fontWeight = 600;
  } else if (hover) {
    background = token.colorBgTextHover;
    color = token.colorText;
  }

  const row = (
    <MyFlex
      align="center"
      gap={12}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background,
        boxShadow,
        cursor: 'pointer',
        borderRadius: token.radiusItem,
        padding: collapsed ? 9 : '9px 12px',
        transition: 'background 150ms, box-shadow 220ms',
        justifyContent: collapsed ? 'center' : 'flex-start',
      }}
    >
      <span style={{ color, display: 'flex', fontSize: 16, flexShrink: 0 }}>
        {icon}
      </span>
      {!collapsed && (
        <MyText
          ellipsis
          color={color}
          fontSize={13}
          fontWeight={fontWeight}
          style={{ flex: 1 }}
        >
          {label}
        </MyText>
      )}
      {!collapsed && active && !featured && (
        <span
          style={{
            width: 6,
            height: 6,
            flexShrink: 0,
            borderRadius: '50%',
            background: token.colorPrimary,
            boxShadow: token.navActiveDotShadow,
          }}
        />
      )}
    </MyFlex>
  );

  if (collapsed) {
    return (
      <MyTooltip title={label} placement="right">
        {row}
      </MyTooltip>
    );
  }
  return row;
};

export default SidebarNavItem;
