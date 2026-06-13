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
import SVGLoop from '../../components/icons/SVGLoop';

export const NAV = [
  {
    key: '/dashboard/insights',
    label: 'nav_loop',
    perm: 'insights',
    featured: true,
    icon: <SVGLoop />,
  },
  {
    key: '/dashboard',
    label: 'nav_dashboard',
    perm: null,
    icon: <DashboardOutlined />,
  },
  {
    key: '/dashboard/conversations',
    label: 'nav_inbox',
    perm: 'conversations',
    icon: <MessageOutlined />,
  },
  {
    key: '/dashboard/contacts',
    label: 'nav_contacts',
    perm: 'contacts',
    icon: <ContactsOutlined />,
  },
  {
    key: '/dashboard/ai-agents',
    label: 'nav_ai_agents',
    perm: 'ai-agents',
    icon: <RobotOutlined />,
  },
  {
    key: '/dashboard/broadcast',
    label: 'nav_broadcast',
    perm: 'broadcast',
    icon: <SoundOutlined />,
  },
  {
    key: '/dashboard/team',
    label: 'nav_team',
    perm: null,
    icon: <TeamOutlined />,
  },
  {
    key: '/dashboard/ai-agents/team-map',
    label: 'nav_team_map',
    perm: 'ai-agents',
    icon: <ApartmentOutlined />,
  },
  {
    key: '/dashboard/calendar',
    label: 'nav_calendar',
    perm: 'calendar',
    icon: <CalendarOutlined />,
  },
  {
    key: '/dashboard/reports',
    label: 'nav_reports',
    perm: 'reports',
    icon: <BarChartOutlined />,
  },
  {
    key: '/dashboard/settings',
    label: 'nav_settings',
    perm: null,
    icon: <SettingOutlined />,
  },
];

export const TITLES = {
  '/dashboard/conversations': 'nav_inbox',
  '/dashboard/channels': 'nav_channels',
  '/dashboard/calendar': 'nav_calendar',
  '/dashboard/settings': 'nav_settings',
  '/dashboard/usage': 'nav_usage',
  '/dashboard/team': 'nav_team',
  '/dashboard/ai-agents/team-map': 'nav_team_map',
  '/dashboard/ai-agents': 'nav_ai_agents',
  '/dashboard/contacts': 'nav_contacts',
  '/dashboard/insights': 'nav_loop',
  '/dashboard/broadcast': 'nav_broadcast',
  '/dashboard/reports': 'nav_reports',
};
