import { theme } from 'antd';
import { useState } from 'react';
import {
  CheckOutlined,
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyText from '../../../components/myText/MyText';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';
import MyDividerSmall from '../../../components/myDivider/MyDividerSmall';
import { PRESENCE_STATUSES, PRESENCE_META } from '../../../utils/presence';

const Row = ({ children, onClick, selected, danger }) => {
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
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: 'pointer',
        padding: '8px 10px',
        borderRadius: token.radiusRow,
        background,
      }}
    >
      {children}
    </MyFlex>
  );
};

const SidebarProfileMenu = ({
  name,
  email,
  presence,
  onProfile,
  onSignOut,
  onPresence,
  onNotifications,
}) => {
  const { token } = theme.useToken();

  const dotColor = {
    online: token.colorSuccess,
    busy: token.colorWarning,
    offline: token.colorTextQuaternary,
  };

  return (
    <MyFlexVertical gap={2} style={{ width: 248 }}>
      <MyFlexVertical gap={2} style={{ padding: '4px 10px 8px' }}>
        <MyText fontSize={14} bold ellipsis>
          {name}
        </MyText>
        <MyTextSecondary fontSize={12} ellipsis>
          {email}
        </MyTextSecondary>
      </MyFlexVertical>
      {PRESENCE_STATUSES?.map((s) => (
        <Row key={s} selected={presence === s} onClick={() => onPresence(s)}>
          <span
            style={{
              width: 9,
              height: 9,
              flexShrink: 0,
              borderRadius: '50%',
              background: dotColor[s],
            }}
          />
          <MyText fontSize={13} color={token.colorText} style={{ flex: 1 }}>
            {PRESENCE_META[s].label}
          </MyText>
          {presence === s && (
            <CheckOutlined
              style={{ color: token.colorPrimary, fontSize: 13 }}
            />
          )}
        </Row>
      ))}
      <MyDividerSmall />
      <Row onClick={onProfile}>
        <UserOutlined
          style={{ color: token.colorTextSecondary, fontSize: 15 }}
        />
        <MyText fontSize={13} color={token.colorText}>
          Profile
        </MyText>
      </Row>
      <Row onClick={onNotifications}>
        <BellOutlined
          style={{ color: token.colorTextSecondary, fontSize: 15 }}
        />
        <MyText fontSize={13} color={token.colorText}>
          Notification settings
        </MyText>
      </Row>
      <MyDividerSmall />
      <Row danger onClick={onSignOut}>
        <LogoutOutlined style={{ color: token.colorError, fontSize: 15 }} />
        <MyText fontSize={13} color={token.colorError}>
          Sign out
        </MyText>
      </Row>
    </MyFlexVertical>
  );
};

export default SidebarProfileMenu;
