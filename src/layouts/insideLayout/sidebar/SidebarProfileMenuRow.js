import { theme } from 'antd';
import { useState } from 'react';
import MyFlex from '../../../components/myFlex/MyFlex';

const SidebarProfileMenuRow = ({ children, onClick, selected, danger }) => {
  const { token } = theme.useToken();

  const [hover, setHover] = useState(false);

  const background = selected
    ? token.navActiveBg
    : hover
      ? danger
        ? token.colorErrorBg
        : token.colorBgTextHover
      : 'transparent';

  return (
    <MyFlex
      align="center"
      onClick={onClick}
      className="sidebar_row"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background,
        padding: '8px 10px',
        borderRadius: token.borderRadiusM,
      }}
    >
      {children}
    </MyFlex>
  );
};

export default SidebarProfileMenuRow;
