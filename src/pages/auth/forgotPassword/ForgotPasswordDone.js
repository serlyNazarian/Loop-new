import { theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { CheckOutlined } from '@ant-design/icons';
import MyText from '../../../components/myText/MyText';
import MyButton from '../../../components/myButton/MyButton';
import MyFlexCenter from '../../../components/myFlex/MyFlexCenter';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';
import MyCardTransparent from '../../../components/myCard/MyCardTransparent';

const ForgotPasswordDone = ({ onGoToLogin }) => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  return (
    <MyCardTransparent styles={{ body: { padding: 0 } }}>
      <MyFlexVertical gap={20} align="center">
        <MyFlexCenter
          className="square_64 circle"
          style={{ background: token.colorPrimary }}
        >
          <CheckOutlined
            style={{ color: token.colorWhite, fontSize: token.fontSizeXXXL }}
          />
        </MyFlexCenter>
        <MyText fontSize={28}>{t('forgot_done_title')}</MyText>
        <MyTextSecondary fontSize={15} className="text_center">
          {t('forgot_done_subtitle')}
        </MyTextSecondary>
        <MyButton block type="primary" size="large" onClick={onGoToLogin}>
          {t('forgot_go_to_sign_in')}
        </MyButton>
      </MyFlexVertical>
    </MyCardTransparent>
  );
};

export default ForgotPasswordDone;
