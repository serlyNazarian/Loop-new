import { theme } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../stores/authStore';
import SidebarProfileMenu from './SidebarProfileMenu';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyText from '../../../components/myText/MyText';
import { isPresenceStatus } from '../../../utils/presence';
import MyAvatar from '../../../components/myAvatar/MyAvatar';
import MyPopover from '../../../components/myPopover/MyPopover';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';
import { updatePresence as updatePresenceAction } from '../../../actions/customerActions';

const SidebarProfile = ({ collapsed }) => {
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [presence, setPresence] = useState('online');

  useEffect(() => {
    if (user && isPresenceStatus(user.presenceStatus))
      setPresence(user.presenceStatus);
  }, [user]);

  const presenceColor = {
    online: token.colorSuccess,
    busy: token.colorWarning,
    offline: token.colorTextQuaternary,
  }[presence];

  const updatePresence = async (status) => {
    setPresence(status);
    try {
      await updatePresenceAction(status);
    } catch {
      setPresence(status);
    }
  };

  const content = (
    <SidebarProfileMenu
      name={user?.name || user?.email?.split('@')[0] || 'User'}
      email={user?.email}
      presence={presence}
      onPresence={updatePresence}
      onProfile={() => {
        setOpen(false);
        navigate('/dashboard/settings/profile');
      }}
      onNotifications={() => {
        setOpen(false);
        navigate('/dashboard/settings/notifications');
      }}
      onSignOut={async () => {
        setOpen(false);
        await logout();
        navigate('/login', { replace: true });
      }}
    />
  );

  return (
    <MyPopover
      open={open}
      content={content}
      onOpenChange={setOpen}
      styles={{ body: { padding: 6 } }}
      placement={collapsed ? 'rightBottom' : 'topLeft'}
    >
      <MyFlex
        align="center"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`sidebar_row${collapsed ? ' sidebar_row_collapsed' : ''}`}
        style={{
          padding: 8,
          borderRadius: token.borderRadiusL,
          background: hover || open ? token.colorBgTextHover : 'transparent',
        }}
      >
        <div className="relative inline_flex flex_shrink_0">
          <MyAvatar
            shape="square"
            src={user?.profileImageUrl || undefined}
            style={{ backgroundColor: token.colorPrimary }}
          >
            {(user?.name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
          </MyAvatar>
          <span
            className="square_12 circle absolute"
            style={{
              right: -2,
              bottom: -2,
              background: presenceColor,
              border: `2px solid ${token.colorBgContainer}`,
            }}
          />
        </div>
        {!collapsed && (
          <MyFlexVertical gap={0} className="flex_1 min_w_0">
            <MyText fontSize={13} bold ellipsis lineHeight={1.2}>
              {user?.name || user?.email?.split('@')[0] || 'User'}
            </MyText>
            <MyTextSecondary fontSize={10} ellipsis lineHeight={1.2}>
              {user?.email}
            </MyTextSecondary>
          </MyFlexVertical>
        )}
      </MyFlex>
    </MyPopover>
  );
};

export default SidebarProfile;
