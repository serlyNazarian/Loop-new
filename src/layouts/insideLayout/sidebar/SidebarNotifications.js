import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { timeAgo } from '../../../utils/time';
import { BellOutlined } from '@ant-design/icons';
import SidebarRailButton from './SidebarRailButton';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyText from '../../../components/myText/MyText';
import MyEmpty from '../../../components/myEmpty/MyEmpty';
import { useLocation, useNavigate } from 'react-router-dom';
import MyButton from '../../../components/myButton/MyButton';
import SidebarNotificationRow from './SidebarNotificationRow';
import MyPopover from '../../../components/myPopover/MyPopover';
import { getNotifications } from '../../../actions/customerActions';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';

const initialOf = (name) => (name?.[0] || '?').toUpperCase();

const SidebarNotifications = ({ collapsed }) => {
  const { t } = useTranslation();
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

  const content = (
    <MyFlexVertical gap={8} style={{ width: 360 }}>
      <MyFlex
        align="center"
        justify="space-between"
        style={{ padding: '4px 12px 0' }}
      >
        <MyText fontSize={16} bold>
          {t('common_notifications')}
        </MyText>
        <MyButton
          type="link"
          size="small"
          onClick={() => go('/dashboard/conversations')}
        >
          {t('common_open_inbox')}
        </MyButton>
      </MyFlex>
      {totalUnread === 0 ? (
        <MyEmpty description={t('common_up_to_date')} />
      ) : (
        <MyFlexVertical gap={2} style={{ maxHeight: 440, overflowY: 'auto' }}>
          {assignments.map((a) => (
            <SidebarNotificationRow
              key={`a:${a.id}`}
              variant="assign"
              initial={initialOf(a.contactName)}
              title={a.contactName}
              sub={`${a.assignedByName} assigned`}
              ago={timeAgo(a.assignedAt)}
              onClick={() =>
                go(
                  `/dashboard/conversations?channel=${a.channel}&id=${encodeURIComponent(a.conversationId)}`
                )
              }
            />
          ))}
          {mentions.map((m) => (
            <SidebarNotificationRow
              key={`m:${m.id}`}
              variant="mention"
              initial={initialOf(m.contactName)}
              title={`${m.mentionedByName} in ${m.contactName}`}
              sub={m.preview || 'Mentioned you'}
              ago={timeAgo(m.mentionedAt)}
              onClick={() =>
                go(
                  `/dashboard/conversations?channel=${m.channel}&id=${encodeURIComponent(m.conversationId)}`
                )
              }
            />
          ))}
          {pending.map((p) => (
            <SidebarNotificationRow
              key={`p:${p.id}`}
              variant="mention"
              initial={initialOf(p.contactName)}
              title={p.contactName}
              sub="Pending appointment"
              ago=""
              onClick={() =>
                go(`/dashboard/calendar?review=${encodeURIComponent(p.id)}`)
              }
            />
          ))}
          {cancelled.map((c) => (
            <SidebarNotificationRow
              key={`c:${c.id}`}
              variant="cancel"
              initial={initialOf(c.contactName)}
              title={c.contactName}
              sub="Cancelled appointment"
              ago={timeAgo(c.cancelledAt)}
              onClick={() =>
                go(`/dashboard/calendar?review=${encodeURIComponent(c.id)}`)
              }
            />
          ))}
          {unreadChats.map((c) => (
            <SidebarNotificationRow
              key={`h:${c.id}`}
              variant="chat"
              initial={initialOf(c.contactName)}
              title={c.contactName}
              sub={c.lastMessagePreview || 'New message'}
              ago={timeAgo(c.lastMessageAt)}
              onClick={() =>
                go(
                  `/dashboard/conversations?channel=${c.channel}&id=${encodeURIComponent(c.id)}`
                )
              }
            />
          ))}
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
          active={open}
          badge={totalUnread}
          collapsed={collapsed}
          icon={<BellOutlined />}
          label={t('common_notifications')}
        />
      </div>
    </MyPopover>
  );
};

export default SidebarNotifications;
