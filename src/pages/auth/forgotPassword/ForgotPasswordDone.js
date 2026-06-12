import { theme } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import MyText from '../../../components/myText/MyText';
import MyButton from '../../../components/myButton/MyButton';
import MyFlexCenter from '../../../components/myFlex/MyFlexCenter';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';
import MyCardTransparent from '../../../components/myCard/MyCardTransparent';

const ForgotPasswordDone = ({ onGoToLogin }) => {
  const { token } = theme.useToken();

  return (
    <MyCardTransparent styles={{ body: { padding: 0 } }}>
      <MyFlexVertical gap={20} align="center">
        <MyFlexCenter className="square_64 circle" style={{ background: token.colorPrimary }}>
          <CheckOutlined
            style={{ color: token.colorWhite, fontSize: token.fontSizeXXXL }}
          />
        </MyFlexCenter>
        <MyText fontSize={28}>Password reset</MyText>
        <MyTextSecondary fontSize={15} className="text_center">
          Your password has been updated. You can now sign in with your new
          password.
        </MyTextSecondary>
        <MyButton block type="primary" size="large" onClick={onGoToLogin}>
          Go to sign in
        </MyButton>
      </MyFlexVertical>
    </MyCardTransparent>
  );
};

export default ForgotPasswordDone;
