import MyFlex from '../../../components/myFlex/MyFlex';
import MyButton from '../../../components/myButton/MyButton';
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';

const SocialLoginButtons = ({ startGoogle, startEmailLink }) => {
  return (
    <MyFlex gap={12} wrap="wrap">
      <MyButton
        size="large"
        icon={<GoogleOutlined />}
        onClick={startGoogle}
        style={{ flex: 1, minWidth: 130 }}
      >
        Google
      </MyButton>
      <MyButton
        size="large"
        icon={<MailOutlined />}
        onClick={startEmailLink}
        style={{ flex: 1, minWidth: 130 }}
      >
        Email
      </MyButton>
    </MyFlex>
  );
};

export default SocialLoginButtons;
