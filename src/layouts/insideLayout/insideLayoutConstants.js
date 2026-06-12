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
} from '@ant-design/icons';
import LoopIcon from '../../components/icons/LoopIcon';

export const NAV = [
  {
    key: '/dashboard/insights',
    label: 'Loop',
    perm: 'insights',
    featured: true,
    icon: <LoopIcon />,
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

export const TITLES = {
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
