import {
  QuestionCircleOutlined,
  ReadOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarRailButton from './SidebarRailButton';
import MyButton from '../../../components/myButton/MyButton';
import MyPopover from '../../../components/myPopover/MyPopover';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';

const LINKS = [
  { icon: <ReadOutlined />, label: 'Documentation', to: '/docs' },
  {
    icon: <CustomerServiceOutlined />,
    label: 'Contact Support',
    to: '/docs/contact',
  },
];

const SidebarHelp = ({ collapsed }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const go = (to) => {
    setOpen(false);
    navigate(to);
  };

  const content = (
    <MyFlexVertical gap={2} style={{ width: 200 }}>
      {LINKS.map((l) => (
        <MyButton
          key={l.to}
          type="text"
          icon={l.icon}
          onClick={() => go(l.to)}
          style={{ width: '100%', justifyContent: 'flex-start' }}
        >
          {l.label}
        </MyButton>
      ))}
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
          label="Help"
          icon={<QuestionCircleOutlined />}
        />
      </div>
    </MyPopover>
  );
};

export default SidebarHelp;
