import { theme } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyText from '../../../components/myText/MyText';
import { ControlOutlined } from '@ant-design/icons';
import useWorkspaceStore from '../../../stores/workspaceStore';
import MyDropdown from '../../../components/myDropdown/MyDropdown';
import MyFlexCenter from '../../../components/myFlex/MyFlexCenter';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import ChevronDownIcon from '../../../components/icons/ChevronDownIcon';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';

const SidebarWorkspaceSwitcher = ({ collapsed }) => {
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const workspaces = useWorkspaceStore((s) => s.workspaces);
  const activeId = useWorkspaceStore((s) => s.activeId);
  const setActive = useWorkspaceStore((s) => s.setActive);

  if (collapsed || workspaces.length === 0) return null;

  const roleOf = (w) =>
    w?.role || (w?.permissions == null ? 'owner' : 'member');
  const active = workspaces.find((w) => w.id === activeId) || workspaces[0];

  const avatarTile = (letter, size) => (
    <MyFlexCenter
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        boxShadow: token.wsAvatarShadow,
        borderRadius: token.borderRadius,
        background: token.wsAvatarGradient,
      }}
    >
      <MyText color={token.colorWhite} fontSize={11} bold>
        {letter}
      </MyText>
    </MyFlexCenter>
  );

  const rows = (w, nameBold) => (
    <MyFlexVertical gap={0} style={{ flex: 1, minWidth: 0 }}>
      <MyText fontSize={13} bold={nameBold} ellipsis lineHeight={1.2}>
        {w?.name}
      </MyText>
      <MyTextSecondary
        ellipsis
        fontSize={10}
        style={{ textTransform: 'capitalize', lineHeight: 1.2 }}
      >
        {roleOf(w)}
      </MyTextSecondary>
    </MyFlexVertical>
  );

  const menu = {
    selectedKeys: [active?.id],
    items: [
      ...workspaces.map((w) => ({
        key: w.id,
        label: (
          <MyFlex align="center" style={{ minWidth: 210, padding: '2px 0' }}>
            {avatarTile((w?.name?.[0] || 'W').toUpperCase(), 26)}
            {rows(w, false)}
          </MyFlex>
        ),
      })),
      { type: 'divider' },
      {
        key: '__manage',
        icon: <ControlOutlined />,
        label: 'Manage workspaces',
      },
    ],
    onClick: ({ key }) => {
      if (key === '__manage') return navigate('/dashboard/settings');
      if (key !== active?.id) setActive(key);
    },
  };

  return (
    <MyFlex style={{ padding: '0 8px' }}>
      <MyDropdown
        menu={menu}
        open={open}
        onOpenChange={setOpen}
        placement="bottomLeft"
      >
        <MyFlex
          align="center"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            padding: 8,
            width: '100%',
            cursor: 'pointer',
            borderRadius: token.radiusItem,
            transition: 'background 150ms',
            background: hover || open ? token.colorBgTextHover : 'transparent',
          }}
        >
          {avatarTile((active?.name?.[0] || 'W').toUpperCase(), 28)}
          {rows(active, true)}
          <ChevronDownIcon
            size={14}
            style={{
              flexShrink: 0,
              transition: 'transform 200ms',
              color: token.colorTextTertiary,
              transform: open ? 'rotate(180deg)' : 'none',
            }}
          />
        </MyFlex>
      </MyDropdown>
    </MyFlex>
  );
};

export default SidebarWorkspaceSwitcher;
