import { theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import MyText from '../../../components/myText/MyText';
import MyButton from '../../../components/myButton/MyButton';
import MyFlexCenter from '../../../components/myFlex/MyFlexCenter';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';
import MyCardTransparent from '../../../components/myCard/MyCardTransparent';
import {
  CheckOutlined,
  CloseOutlined,
  WarningOutlined,
} from '@ant-design/icons';

const InviteStatusCard = ({
  title,
  subtitle,
  actionTo,
  actionLabel,
  variant = 'neutral',
  actionPrimary = false,
}) => {
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const variants = {
    success: {
      Icon: CheckOutlined,
      fg: token.colorWhite,
      bg: token.colorPrimary,
    },
    warning: {
      Icon: WarningOutlined,
      fg: token.colorWarning,
      bg: token.colorWarningBg,
    },
    error: {
      Icon: CloseOutlined,
      fg: token.colorError,
      bg: token.colorErrorBg,
    },
    neutral: {
      Icon: CloseOutlined,
      fg: token.colorTextSecondary,
      bg: token.colorFillSecondary,
    },
  };
  const { Icon, fg, bg } = variants[variant];

  return (
    <MyCardTransparent styles={{ body: { padding: 0 } }}>
      <MyFlexVertical gap={16} align="center">
        <MyFlexCenter
          style={{ width: 56, height: 56, borderRadius: '50%', background: bg }}
        >
          <Icon style={{ color: fg, fontSize: 24 }} />
        </MyFlexCenter>
        <MyText fontSize={22}>{title}</MyText>
        <MyTextSecondary fontSize={15} style={{ textAlign: 'center' }}>
          {subtitle}
        </MyTextSecondary>
        {actionLabel && (
          <MyButton
            block
            size="large"
            type={actionPrimary ? 'primary' : 'default'}
            onClick={() => navigate(actionTo)}
          >
            {actionLabel}
          </MyButton>
        )}
      </MyFlexVertical>
    </MyCardTransparent>
  );
};

export default InviteStatusCard;
