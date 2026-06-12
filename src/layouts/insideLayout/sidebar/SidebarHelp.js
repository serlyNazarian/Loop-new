import {
  QuestionCircleOutlined,
  ReadOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SidebarRailButton from './SidebarRailButton';
import MyButton from '../../../components/myButton/MyButton';
import MyPopover from '../../../components/myPopover/MyPopover';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';

const LINKS = [
  { icon: <ReadOutlined />, label: 'help_documentation', to: '/docs' },
  {
    icon: <CustomerServiceOutlined />,
    label: 'help_contact_support',
    to: '/docs/contact',
  },
];

const SidebarHelp = ({ collapsed }) => {
  const { t } = useTranslation();
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
          className="w_100 justify_start"
        >
          {t(l.label)}
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
          label={t('common_help')}
          icon={<QuestionCircleOutlined />}
        />
      </div>
    </MyPopover>
  );
};

export default SidebarHelp;
