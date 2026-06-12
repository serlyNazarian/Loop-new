import { theme } from 'antd';
import { useEffect, useState } from 'react';
import { timeAgo } from '../../../utils/time';
import { BellOutlined } from '@ant-design/icons';
import SidebarRailButton from './SidebarRailButton';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyText from '../../../components/myText/MyText';
import MyEmpty from '../../../components/myEmpty/MyEmpty';
import { useLocation, useNavigate } from 'react-router-dom';
import MyButton from '../../../components/myButton/MyButton';
import MyPopover from '../../../components/myPopover/MyPopover';
import MyFlexCenter from '../../../components/myFlex/MyFlexCenter';
import { getNotifications } from '../../../actions/customerActions';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import ChevronDownIcon from '../../../components/icons/ChevronDownIcon';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';

const SidebarNotifications = ({ collapsed }) => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState([]);
  const [mentions, setMentions] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const [unreadChats, setUnreadChats] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const totalUnread =
    assignments.length +
    mentions.length +
    pending.length +
    cancelled.length +
    unreadChats.length;

  useEffect(() => {
    let stopped = false;
    const arr = (v) => (Array.isArray(v) ? v : []);
    const load = async () => {
      try {
        const data = await getNotifications();
        if (stopped || !data) return;
        setAssignments(arr(data.assignments));
        setMentions(arr(data.mentions));
        setPending(arr(data.pendingAppointments));
        setCancelled(arr(data.cancelledAppointments));
        setUnreadChats(arr(data.unreadChats));
      } catch {
        setAssignments([]);
      }
    };
    load();
    const iv = setInterval(load, 15000);
    return () => {
      stopped = true;
      clearInterval(iv);
    };
  }, [pathname]);

  const go = (route) => {
    setOpen(false);
    navigate(route);
  };

  const row = (key, gradient, initial, title, sub, ago, onClick) => (
    <MyFlex
      gap={12}
      key={key}
      align="center"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        padding: '8px 12px',
        borderRadius: token.radiusRow,
      }}
    >
      <MyFlexCenter
        style={{
          width: 36,
          height: 36,
          flexShrink: 0,
          background: gradient,
          borderRadius: token.radiusRow,
        }}
      >
        <MyText color={token.colorWhite} fontSize={14} bold>
          {initial}
        </MyText>
      </MyFlexCenter>
      <MyFlexVertical gap={2} style={{ flex: 1, minWidth: 0 }}>
        <MyFlex justify="space-between" align="center" gap={8}>
          <MyText fontSize={13} bold ellipsis>
            {title}
          </MyText>
          {ago && (
            <MyTextSecondary fontSize={11} style={{ flexShrink: 0 }}>
              {ago}
            </MyTextSecondary>
          )}
        </MyFlex>
        <MyTextSecondary fontSize={11} ellipsis>
          {sub}
        </MyTextSecondary>
      </MyFlexVertical>
      <ChevronDownIcon
        size={14}
        style={{
          flexShrink: 0,
          transform: 'rotate(-90deg)',
          color: token.colorTextQuaternary,
        }}
      />
    </MyFlex>
  );

  const initialOf = (name) => (name?.[0] || '?').toUpperCase();

  const content = (
    <MyFlexVertical gap={8} style={{ width: 360 }}>
      <MyFlex
        align="center"
        justify="space-between"
        style={{ padding: '4px 12px 0' }}
      >
        <MyText fontSize={16} bold>
          Notifications
        </MyText>
        <MyButton
          type="link"
          size="small"
          onClick={() => go('/dashboard/conversations')}
        >
          Open inbox
        </MyButton>
      </MyFlex>
      {totalUnread === 0 ? (
        <MyEmpty description="You are up to date" />
      ) : (
        <MyFlexVertical gap={2} style={{ maxHeight: 440, overflowY: 'auto' }}>
          {assignments.map((a) =>
            row(
              `a:${a.id}`,
              token.notifAssignGradient,
              initialOf(a.contactName),
              a.contactName,
              `${a.assignedByName} assigned`,
              timeAgo(a.assignedAt),
              () =>
                go(
                  `/dashboard/conversations?channel=${a.channel}&id=${encodeURIComponent(a.conversationId)}`
                )
            )
          )}
          {mentions.map((m) =>
            row(
              `m:${m.id}`,
              token.notifMentionGradient,
              initialOf(m.contactName),
              `${m.mentionedByName} in ${m.contactName}`,
              m.preview || 'Mentioned you',
              timeAgo(m.mentionedAt),
              () =>
                go(
                  `/dashboard/conversations?channel=${m.channel}&id=${encodeURIComponent(m.conversationId)}`
                )
            )
          )}
          {pending.map((p) =>
            row(
              `p:${p.id}`,
              token.notifMentionGradient,
              initialOf(p.contactName),
              p.contactName,
              'Pending appointment',
              '',
              () => go(`/dashboard/calendar?review=${encodeURIComponent(p.id)}`)
            )
          )}
          {cancelled.map((c) =>
            row(
              `c:${c.id}`,
              token.notifCancelGradient,
              initialOf(c.contactName),
              c.contactName,
              'Cancelled appointment',
              timeAgo(c.cancelledAt),
              () => go(`/dashboard/calendar?review=${encodeURIComponent(c.id)}`)
            )
          )}
          {unreadChats.map((c) =>
            row(
              `h:${c.id}`,
              token.notifChatGradient,
              initialOf(c.contactName),
              c.contactName,
              c.lastMessagePreview || 'New message',
              timeAgo(c.lastMessageAt),
              () =>
                go(
                  `/dashboard/conversations?channel=${c.channel}&id=${encodeURIComponent(c.id)}`
                )
            )
          )}
        </MyFlexVertical>
      )}
    </MyFlexVertical>
  );

  return (
    <MyPopover
      open={open}
      content={content}
      onOpenChange={setOpen}
      placement={collapsed ? 'rightBottom' : 'topLeft'}
    >
      <div>
        <SidebarRailButton
          collapsed={collapsed}
          active={open}
          label="Notifications"
          badge={totalUnread}
          icon={<BellOutlined />}
        />
      </div>
    </MyPopover>
  );
};

export default SidebarNotifications;
