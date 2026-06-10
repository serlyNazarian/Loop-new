import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import {
  DashboardOutlined,
  MessageOutlined,
  ContactsOutlined,
  RobotOutlined,
  SoundOutlined,
  TeamOutlined,
  ApartmentOutlined,
  CalendarOutlined,
  BarChartOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ArrowLeftOutlined,
  UserOutlined,
  LogoutOutlined,
  MoonOutlined,
  SunOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import loopLogo from '../../assets/loop-logo.svg';
import DashboardBackground from '../../components/dashboardBackground/DashboardBackground';
import MyLoader from '../../components/myLoader/MyLoader';
import MyImage from '../../components/myImage/MyImage';
import MyLink from '../../components/myLink/MyLink';
import MyText from '../../components/myText/MyText';
import MyTextSecondary from '../../components/myText/MyTextSecondary';
import MyButton from '../../components/myButton/MyButton';
import MyAvatar from '../../components/myAvatar/MyAvatar';
import MyBadge from '../../components/myBadge/MyBadge';
import MySelect from '../../components/mySelect/MySelect';
import MyDropdown from '../../components/myDropdown/MyDropdown';
import MyPopover from '../../components/myPopover/MyPopover';
import MyEmpty from '../../components/myEmpty/MyEmpty';
import MyFlex from '../../components/myFlex/MyFlex';
import MyFlexCenter from '../../components/myFlex/MyFlexCenter';
import MyFlexVertical from '../../components/myFlex/MyFlexVertical';
import useAuthStore from '../../stores/authStore';
import useWorkspaceStore from '../../stores/workspaceStore';
import useWindowSize from '../../hooks/useWindowSize';
import {
  getNotifications,
  updatePresence as updatePresenceAction,
} from '../../actions/customerActions';
import {
  PRESENCE_STATUSES,
  PRESENCE_META,
  isPresenceStatus,
} from '../../utils/presence';

const { Sider, Header, Content } = Layout;

const SIDEBAR_COLLAPSED_KEY = 'dashboard-sidebar-collapsed';
const THEME_KEY = 'loop.theme';

const NAV = [
  {
    key: '/dashboard/insights',
    label: 'Loop',
    perm: 'insights',
    icon: <ThunderboltOutlined />,
  },
  {
    key: '/dashboard',
    label: 'Dashboard',
    perm: null,
    icon: <DashboardOutlined />,
  },
  {
    key: '/dashboard/conversations',
    label: 'Inbox',
    perm: 'conversations',
    icon: <MessageOutlined />,
  },
  {
    key: '/dashboard/contacts',
    label: 'Contacts',
    perm: 'contacts',
    icon: <ContactsOutlined />,
  },
  {
    key: '/dashboard/ai-agents',
    label: 'AI Agents',
    perm: 'ai-agents',
    icon: <RobotOutlined />,
  },
  {
    key: '/dashboard/broadcast',
    label: 'Broadcast',
    perm: 'broadcast',
    icon: <SoundOutlined />,
  },
  { key: '/dashboard/team', label: 'Team', perm: null, icon: <TeamOutlined /> },
  {
    key: '/dashboard/ai-agents/team-map',
    label: 'Team Map',
    perm: 'ai-agents',
    icon: <ApartmentOutlined />,
  },
  {
    key: '/dashboard/calendar',
    label: 'Calendar',
    perm: 'calendar',
    icon: <CalendarOutlined />,
  },
  {
    key: '/dashboard/reports',
    label: 'Reports',
    perm: 'reports',
    icon: <BarChartOutlined />,
  },
  {
    key: '/dashboard/settings',
    label: 'Settings',
    perm: null,
    icon: <SettingOutlined />,
  },
];

const TITLES = {
  '/dashboard/conversations': 'Inbox',
  '/dashboard/channels': 'Channels',
  '/dashboard/calendar': 'Calendar',
  '/dashboard/settings': 'Settings',
  '/dashboard/usage': 'Usage',
  '/dashboard/team': 'Team',
  '/dashboard/ai-agents/team-map': 'Team Map',
  '/dashboard/ai-agents': 'AI Agents',
  '/dashboard/contacts': 'Contacts',
  '/dashboard/insights': 'Loop',
  '/dashboard/broadcast': 'Broadcast',
  '/dashboard/reports': 'Reports',
};

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
  });
}

export default function InsideLayout() {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const { isMobile } = useWindowSize();

  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [presence, setPresence] = useState('online');

  const workspaces = useWorkspaceStore((s) => s.workspaces);
  const activeId = useWorkspaceStore((s) => s.activeId);
  const loaded = useWorkspaceStore((s) => s.loaded);
  const setActive = useWorkspaceStore((s) => s.setActive);
  const can = useWorkspaceStore((s) => s.can);
  const fetchWorkspaces = useWorkspaceStore((s) => s.fetchWorkspaces);

  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === 'true'
  );
  const [dark, setDark] = useState(
    () => localStorage.getItem(THEME_KEY) === 'dark'
  );
  const [notifOpen, setNotifOpen] = useState(false);

  const [pendingNotifications, setPendingNotifications] = useState([]);
  const [cancelledNotifications, setCancelledNotifications] = useState([]);
  const [unreadChats, setUnreadChats] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [mentions, setMentions] = useState([]);
  const previousTotalRef = useRef(0);

  const totalUnread =
    pendingNotifications.length +
    cancelledNotifications.length +
    unreadChats.length +
    assignments.length +
    mentions.length;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    if (!loaded) fetchWorkspaces().catch(() => {});
  }, [loaded, fetchWorkspaces]);

  useEffect(() => {
    if (user && isPresenceStatus(user.presenceStatus))
      setPresence(user.presenceStatus);
  }, [user]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const data = await getNotifications();
        if (cancelled || !data) return;
        const appts = Array.isArray(data.pendingAppointments)
          ? data.pendingAppointments
          : [];
        const cancels = Array.isArray(data.cancelledAppointments)
          ? data.cancelledAppointments
          : [];
        const chats = Array.isArray(data.unreadChats) ? data.unreadChats : [];
        const assigns = Array.isArray(data.assignments) ? data.assignments : [];
        const ments = Array.isArray(data.mentions) ? data.mentions : [];
        setPendingNotifications(appts);
        setCancelledNotifications(cancels);
        setUnreadChats(chats);
        setAssignments(assigns);
        setMentions(ments);
        previousTotalRef.current =
          appts.length +
          cancels.length +
          chats.length +
          assigns.length +
          ments.length;
      } catch {
        setPendingNotifications([]);
      }
    };
    load();
    const iv = setInterval(load, 15000);
    return () => {
      cancelled = true;
      clearInterval(iv);
    };
  }, [pathname]);

  const setCollapsedPersist = (value) => {
    setCollapsed(value);
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(value));
  };

  const menuItems = useMemo(
    () =>
      NAV.filter((item) => item.perm === null || can(item.perm)).map(
        (item) => ({
          key: item.key,
          icon: item.icon,
          label: item.label,
        })
      ),
    [can, workspaces, activeId] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const selectedKey = useMemo(() => {
    const matches = NAV.map((n) => n.key)
      .filter((k) => pathname === k || pathname.startsWith(k + '/'))
      .sort((a, b) => b.length - a.length);
    return matches[0] || '/dashboard';
  }, [pathname]);

  const presenceColor = {
    online: token.colorSuccess,
    busy: token.colorWarning,
    offline: token.colorTextQuaternary,
  }[presence];

  async function updatePresence(status) {
    setPresence(status);
    try {
      await updatePresenceAction(status);
    } catch {
      setPresence(status);
    }
  }

  const userMenu = {
    items: [
      {
        type: 'group',
        label: 'Status',
        children: PRESENCE_STATUSES.map((s) => ({
          key: `presence:${s}`,
          label: PRESENCE_META[s].label,
        })),
      },
      { type: 'divider' },
      { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
      {
        key: 'notifications',
        icon: <BellOutlined />,
        label: 'Notification settings',
      },
      { type: 'divider' },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: 'Log out',
        danger: true,
      },
    ],
    onClick: async ({ key }) => {
      if (key.startsWith('presence:')) return updatePresence(key.split(':')[1]);
      if (key === 'profile') return navigate('/dashboard/settings/profile');
      if (key === 'notifications')
        return navigate('/dashboard/settings/notifications');
      if (key === 'logout') {
        await logout();
        navigate('/login', { replace: true });
      }
    },
  };

  const goNotif = (route) => {
    setNotifOpen(false);
    navigate(route);
  };

  const notifRow = (key, initial, title, sub, ago, onClick) => (
    <MyFlex
      key={key}
      align="center"
      gap={12}
      onClick={onClick}
      style={{ cursor: 'pointer', padding: '8px 4px' }}
    >
      <MyAvatar
        shape="square"
        style={{ backgroundColor: token.colorPrimary, flexShrink: 0 }}
      >
        {initial}
      </MyAvatar>
      <MyFlexVertical gap={2} style={{ flex: 1, minWidth: 0 }}>
        <MyFlex justify="space-between" align="center" gap={8}>
          <MyText fontSize={13} bold ellipsis>
            {title}
          </MyText>
          {ago && <MyTextSecondary fontSize={11}>{ago}</MyTextSecondary>}
        </MyFlex>
        <MyTextSecondary fontSize={11} ellipsis>
          {sub}
        </MyTextSecondary>
      </MyFlexVertical>
      <RightOutlined
        style={{ color: token.colorTextQuaternary, flexShrink: 0 }}
      />
    </MyFlex>
  );

  const notifContent = (
    <MyFlexVertical gap={8} style={{ width: isMobile ? 280 : 360 }}>
      <MyFlex justify="space-between" align="center">
        <MyText fontSize={16} bold>
          Notifications
        </MyText>
        <MyButton
          type="link"
          size="small"
          onClick={() => goNotif('/dashboard/conversations')}
        >
          Open inbox
        </MyButton>
      </MyFlex>
      {totalUnread === 0 ? (
        <MyEmpty description="You are up to date" />
      ) : (
        <MyFlexVertical gap={2} style={{ maxHeight: 420, overflowY: 'auto' }}>
          {assignments.map((a) =>
            notifRow(
              `a:${a.id}`,
              (a.contactName[0] || '?').toUpperCase(),
              a.contactName,
              `${a.assignedByName} assigned`,
              timeAgo(a.assignedAt),
              () =>
                goNotif(
                  `/dashboard/conversations?channel=${a.channel}&id=${encodeURIComponent(a.conversationId)}`
                )
            )
          )}
          {mentions.map((m) =>
            notifRow(
              `m:${m.id}`,
              (m.contactName[0] || '?').toUpperCase(),
              `${m.mentionedByName} in ${m.contactName}`,
              m.preview || 'Mentioned you',
              timeAgo(m.mentionedAt),
              () =>
                goNotif(
                  `/dashboard/conversations?channel=${m.channel}&id=${encodeURIComponent(m.conversationId)}`
                )
            )
          )}
          {pendingNotifications.map((p) =>
            notifRow(
              `p:${p.id}`,
              (p.contactName[0] || '?').toUpperCase(),
              p.contactName,
              'Pending appointment',
              '',
              () =>
                goNotif(
                  `/dashboard/calendar?review=${encodeURIComponent(p.id)}`
                )
            )
          )}
          {cancelledNotifications.map((c) =>
            notifRow(
              `c:${c.id}`,
              (c.contactName[0] || '?').toUpperCase(),
              c.contactName,
              'Cancelled appointment',
              timeAgo(c.cancelledAt),
              () =>
                goNotif(
                  `/dashboard/calendar?review=${encodeURIComponent(c.id)}`
                )
            )
          )}
          {unreadChats.map((c) =>
            notifRow(
              `h:${c.id}`,
              (c.contactName[0] || '?').toUpperCase(),
              c.contactName,
              c.lastMessagePreview || 'New message',
              timeAgo(c.lastMessageAt),
              () =>
                goNotif(
                  `/dashboard/conversations?channel=${c.channel}&id=${encodeURIComponent(c.id)}`
                )
            )
          )}
        </MyFlexVertical>
      )}
    </MyFlexVertical>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DashboardBackground dark={dark} />
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={240}
        collapsedWidth={isMobile ? 0 : 80}
        breakpoint="lg"
        onBreakpoint={(broken) => setCollapsed(broken)}
        style={{
          zIndex: 2,
          background: token.colorBgContainer,
          borderInlineEnd: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        <MyFlexCenter style={{ height: 64 }}>
          <MyLink to="/dashboard">
            <MyImage src={loopLogo} alt="Loop" height={collapsed ? 28 : 32} />
          </MyLink>
        </MyFlexCenter>
        {!collapsed && workspaces.length > 0 && (
          <MyFlex style={{ padding: '0 12px 8px' }}>
            <MySelect
              value={activeId}
              onChange={setActive}
              variant="filled"
              style={{ width: '100%' }}
              options={workspaces.map((w) => ({ value: w.id, label: w.name }))}
            />
          </MyFlex>
        )}
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ borderInlineEnd: 'none', background: 'transparent' }}
        />
      </Sider>
      <Layout style={{ background: 'transparent' }}>
        <Header
          style={{
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            padding: isMobile ? '0 12px' : '0 20px',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <MyFlex align="center" gap={8} style={{ flex: 1, minWidth: 0 }}>
            <MyButton
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsedPersist(!collapsed)}
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
            <MyText fontSize={18} bold ellipsis>
              {TITLES[pathname] || 'Dashboard'}
            </MyText>
          </MyFlex>

          <MyFlex align="center" gap={isMobile ? 2 : 6}>
            <MyButton
              type="text"
              icon={dark ? <SunOutlined /> : <MoonOutlined />}
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
            />
            <MyPopover
              content={notifContent}
              open={notifOpen}
              onOpenChange={setNotifOpen}
              placement="bottomRight"
            >
              <MyBadge count={totalUnread} size="small">
                <MyButton
                  type="text"
                  icon={<BellOutlined />}
                  aria-label="Notifications"
                />
              </MyBadge>
            </MyPopover>
            <MyDropdown menu={userMenu} placement="bottomRight">
              <MyFlex align="center" gap={8} style={{ cursor: 'pointer' }}>
                <MyBadge dot color={presenceColor} offset={[-2, 28]}>
                  <MyAvatar
                    src={user?.profileImageUrl || undefined}
                    style={{ backgroundColor: token.colorPrimary }}
                  >
                    {(user?.name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
                  </MyAvatar>
                </MyBadge>
                {!isMobile && (
                  <MyText ellipsis>{user?.name || user?.email}</MyText>
                )}
              </MyFlex>
            </MyDropdown>
          </MyFlex>
        </Header>
        <Content
          style={{
            padding: isMobile ? 16 : 24,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Suspense fallback={<MyLoader />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
}
