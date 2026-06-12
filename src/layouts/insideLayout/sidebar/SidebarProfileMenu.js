import { theme } from 'antd';
import {
  CheckOutlined,
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import MyText from '../../../components/myText/MyText';
import { useTranslation } from 'react-i18next';
import SidebarProfileMenuRow from './SidebarProfileMenuRow';
import { PRESENCE_STATUSES } from '../../../utils/presence';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';
import MyDividerSmall from '../../../components/myDivider/MyDividerSmall';

const SidebarProfileMenu = ({
  name,
  email,
  presence,
  onProfile,
  onSignOut,
  onPresence,
  onNotifications,
}) => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const dotColor = {
    busy: token.colorWarning,
    online: token.colorSuccess,
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
        <SidebarProfileMenuRow
          key={s}
          selected={presence === s}
          onClick={() => onPresence(s)}
        >
          <span
            className="square_9 circle flex_shrink_0"
            style={{ background: dotColor[s] }}
          />
          <MyText fontSize={13} color={token.colorText} className="flex_1">
            {t(`presence_${s}`)}
          </MyText>
          {presence === s && (
            <CheckOutlined
              style={{ color: token.colorPrimary, fontSize: token.fontSizeMD }}
            />
          )}
        </SidebarProfileMenuRow>
      ))}
      <MyDividerSmall />
      <SidebarProfileMenuRow onClick={onProfile}>
        <UserOutlined
          style={{
            fontSize: token.fontSizeLG,
            color: token.colorTextSecondary,
          }}
        />
        <MyText fontSize={13} color={token.colorText}>
          {t('common_profile')}
        </MyText>
      </SidebarProfileMenuRow>
      <SidebarProfileMenuRow onClick={onNotifications}>
        <BellOutlined
          style={{
            fontSize: token.fontSizeLG,
            color: token.colorTextSecondary,
          }}
        />
        <MyText fontSize={13} color={token.colorText}>
          {t('common_notification_settings')}
        </MyText>
      </SidebarProfileMenuRow>
      <MyDividerSmall />
      <SidebarProfileMenuRow danger onClick={onSignOut}>
        <LogoutOutlined
          style={{ color: token.colorError, fontSize: token.fontSizeLG }}
        />
        <MyText fontSize={13} color={token.colorError}>
          {t('common_sign_out')}
        </MyText>
      </SidebarProfileMenuRow>
    </MyFlexVertical>
  );
};

export default SidebarProfileMenu;
