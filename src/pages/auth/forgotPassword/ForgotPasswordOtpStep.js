import { useTranslation } from 'react-i18next';
import MyOtp from '../../../components/myInput/MyOtp';
import MyText from '../../../components/myText/MyText';
import MyLink from '../../../components/myLink/MyLink';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyAlert from '../../../components/myAlert/MyAlert';
import MyButton from '../../../components/myButton/MyButton';
import MyFlexCenter from '../../../components/myFlex/MyFlexCenter';
import MyTextGradient from '../../../components/myText/MyTextGradient';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';
import MyCardTransparent from '../../../components/myCard/MyCardTransparent';

const ForgotPasswordOtpStep = ({
  info,
  code,
  error,
  email,
  setCode,
  onResend,
  countdown,
  onContinue,
}) => {
  const { t } = useTranslation();

  return (
    <MyCardTransparent styles={{ body: { padding: 0 } }}>
      <MyFlexVertical gap={24}>
        <MyFlexVertical gap={10} align="center">
          <MyTextGradient>{t('forgot_otp_title')}</MyTextGradient>
          <MyFlexVertical gap={2} align="center">
            <MyTextSecondary fontSize={15} className="text_center">
              {t('forgot_otp_sent_to')}
            </MyTextSecondary>
            <MyText fontSize={15}>{email}</MyText>
          </MyFlexVertical>
          <MyTextSecondary fontSize={13} className="text_center">
            {t('forgot_otp_expiry_hint')}
          </MyTextSecondary>
        </MyFlexVertical>
        {error && <MyAlert type="error" message={error} />}
        {info && <MyAlert type="success" message={info} />}
        <MyFlexCenter>
          <MyOtp value={code} onInput={(v) => setCode((v || []).join(''))} />
        </MyFlexCenter>
        <MyButton
          block
          size="large"
          type="primary"
          disabled={code.length !== 6}
          onClick={onContinue}
        >
          {t('forgot_continue')}
        </MyButton>
        <MyFlex justify="space-between" align="center" wrap="nowrap" gap={12}>
          <MyButton
            type="link"
            size="small"
            onClick={onResend}
            disabled={countdown > 0}
            style={{ paddingInline: 0 }}
          >
            {countdown > 0
              ? t('forgot_resend_in', { countdown })
              : t('forgot_resend_code')}
          </MyButton>
          <MyLink to="/login" fontSize={14} className="nowrap flex_shrink_0">
            {t('forgot_back_to_sign_in')}
          </MyLink>
        </MyFlex>
      </MyFlexVertical>
    </MyCardTransparent>
  );
};

export default ForgotPasswordOtpStep;
