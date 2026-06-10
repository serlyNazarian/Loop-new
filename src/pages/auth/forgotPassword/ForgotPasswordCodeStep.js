import { theme } from 'antd';
import MyOtp from '../../../components/myInput/MyOtp';
import MyText from '../../../components/myText/MyText';
import MyLink from '../../../components/myLink/MyLink';
import MyForm from '../../../components/myForm/MyForm';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyButton from '../../../components/myButton/MyButton';
import MyFlexCenter from '../../../components/myFlex/MyFlexCenter';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';
import MyCardTransparent from '../../../components/myCard/MyCardTransparent';
import MyInputPasswordItem from '../../../components/myInput/MyInputPasswordItem';

const ForgotPasswordCodeStep = ({
  form,
  code,
  info,
  error,
  email,
  loading,
  setCode,
  onFinish,
  onResend,
  countdown,
}) => {
  const { token } = theme.useToken();

  return (
    <MyCardTransparent styles={{ body: { padding: 0 } }}>
      <MyFlexVertical gap={24}>
        <MyFlexVertical gap={4}>
          <MyText fontSize={34}>Check your email</MyText>
          <MyTextSecondary fontSize={15}>
            We sent a 6-digit code to {email}. It expires in 10 minutes.
          </MyTextSecondary>
        </MyFlexVertical>
        {error && (
          <MyText color={token.colorError} fontSize={13}>
            {error}
          </MyText>
        )}
        {info && (
          <MyText color={token.colorSuccess} fontSize={13}>
            {info}
          </MyText>
        )}
        <MyFlexCenter>
          <MyOtp value={code} onInput={(v) => setCode((v || []).join(''))} />
        </MyFlexCenter>
        <MyForm
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          validateTrigger={[]}
        >
          <MyFlexVertical gap={18}>
            <MyInputPasswordItem
              name="password"
              label="New password"
              rules={[
                { required: true, message: 'Enter a new password' },
                { min: 8, message: 'At least 8 characters' },
              ]}
              placeholder="Enter your new password"
              autoComplete="new-password"
            />
            <MyInputPasswordItem
              name="confirm"
              label="Confirm password"
              rules={[
                { required: true, message: 'Confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value)
                      return Promise.resolve();
                    return Promise.reject(new Error('Passwords do not match'));
                  },
                }),
              ]}
              placeholder="Re-enter your new password"
              autoComplete="new-password"
            />
            <MyButton
              block
              size="large"
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={code.length !== 6}
            >
              Reset password
            </MyButton>
          </MyFlexVertical>
        </MyForm>
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
            style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            Back to sign in
          </MyLink>
        </MyFlex>
      </MyFlexVertical>
    </MyCardTransparent>
  );
};

export default ForgotPasswordCodeStep;
