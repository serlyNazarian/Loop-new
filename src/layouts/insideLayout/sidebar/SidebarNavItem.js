import { theme } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyText from '../../../components/myText/MyText';
import MyTooltip from '../../../components/myTooltip/MyTooltip';

const SidebarNavItem = ({ item, active, collapsed, onClick }) => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const { featured, label, icon } = item;

  const [hover, setHover] = useState(false);

  let background = 'transparent';
  let color = token.colorTextSecondary;
  let boxShadow;
  let fontWeight = 500;

  if (featured) {
    background = undefined;
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
      gap={12}
      align="center"
      onClick={onClick}
      className={`sidebar_row${collapsed ? ' sidebar_row_collapsed' : ''}${featured ? ' nav_item_featured' : ''}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        boxShadow,
        background,
        borderRadius: token.borderRadiusL,
        padding: collapsed ? 9 : '9px 12px',
      }}
    >
      <span
        className="d_flex flex_shrink_0"
        style={{ color, fontSize: token.fontSizeLG }}
      >
        {icon}
      </span>
      {!collapsed && (
        <MyText
          ellipsis
          color={color}
          fontSize={13}
          className="flex_1"
          fontWeight={fontWeight}
        >
          {t(label)}
        </MyText>
      )}
      {!collapsed && active && !featured && (
        <span className="square_6 circle flex_shrink_0 nav_active_dot" />
      )}
    </MyFlex>
  );

  if (collapsed) {
    return (
      <MyTooltip title={t(label)} placement="right">
        {row}
      </MyTooltip>
    );
  }
  return row;
};

export default SidebarNavItem;
