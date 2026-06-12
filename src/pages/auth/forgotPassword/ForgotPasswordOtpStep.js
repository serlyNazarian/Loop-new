import MyOtp from '../../../components/myInput/MyOtp';
import MyTextGradient from '../../../components/myText/MyTextGradient';
import MyText from '../../../components/myText/MyText';
import MyLink from '../../../components/myLink/MyLink';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyAlert from '../../../components/myAlert/MyAlert';
import MyButton from '../../../components/myButton/MyButton';
import MyFlexCenter from '../../../components/myFlex/MyFlexCenter';
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
  return (
    <MyCardTransparent styles={{ body: { padding: 0 } }}>
      <MyFlexVertical gap={24}>
        <MyFlexVertical gap={10} align="center">
          <MyTextGradient>Check your email</MyTextGradient>
          <MyFlexVertical gap={2} align="center">
            <MyTextSecondary fontSize={15} className="text_center">
              We've sent a 6-digit code to
            </MyTextSecondary>
            <MyText fontSize={15}>{email}</MyText>
          </MyFlexVertical>
          <MyTextSecondary fontSize={13} className="text_center">
            Check your inbox and spam folder. The code expires in 10 minutes.
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
          Continue
        </MyButton>
        <MyFlex justify="space-between" align="center" wrap="nowrap" gap={12}>
          <MyButton
            type="link"
            size="small"
            onClick={onResend}
            disabled={countdown > 0}
            style={{ paddingInline: 0 }}
          >
            {countdown > 0 ? `Resend code in ${countdown}s` : 'Resend code'}
          </MyButton>
          <MyLink
            to="/login"
            fontSize={14}
            className="nowrap flex_shrink_0"
          >
            Back to sign in
          </MyLink>
        </MyFlex>
      </MyFlexVertical>
    </MyCardTransparent>
  );
};

export default ForgotPasswordOtpStep;
