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
        className="flex_1"
        style={{ minWidth: 130 }}
      >
        Google
      </MyButton>
      <MyButton
        size="large"
        icon={<MailOutlined />}
        onClick={startEmailLink}
        className="flex_1"
        style={{ minWidth: 130 }}
      >
        Email
      </MyButton>
    </MyFlex>
  );
};

export default SocialLoginButtons;
