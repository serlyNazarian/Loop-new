import { theme } from 'antd';
import MyText from '../../../components/myText/MyText';
import MyLink from '../../../components/myLink/MyLink';
import MyForm from '../../../components/myForm/MyForm';
import MyButton from '../../../components/myButton/MyButton';
import MyInputItem from '../../../components/myInput/MyInputItem';
import MyFlexCenter from '../../../components/myFlex/MyFlexCenter';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextGradient from '../../../components/myText/MyTextGradient';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';
import MyCardTransparent from '../../../components/myCard/MyCardTransparent';

const ForgotPasswordEmailStep = ({ form, loading, error, onFinish }) => {
  const { token } = theme.useToken();

  return (
    <MyCardTransparent styles={{ body: { padding: 0 } }}>
      <MyFlexVertical gap={24}>
        <MyFlexVertical gap={4}>
          <MyTextGradient>Forgot password?</MyTextGradient>
          <MyTextSecondary fontSize={16}>
            Enter your email and we'll send you a 6-digit reset code.
          </MyTextSecondary>
        </MyFlexVertical>
        {error && (
          <MyText color={token.colorError} fontSize={13}>
            {error}
          </MyText>
        )}
        <MyForm
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          validateTrigger={[]}
        >
          <MyFlexVertical gap={18}>
            <MyInputItem
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Enter a valid email address',
                },
              ]}
              placeholder="you@company.com"
              autoComplete="email"
            />
            <MyButton
              block
              size="large"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Send reset code
            </MyButton>
          </MyFlexVertical>
        </MyForm>
        <MyFlexCenter>
          <MyLink to="/login" fontSize={14}>
            Back to sign in
          </MyLink>
        </MyFlexCenter>
      </MyFlexVertical>
    </MyCardTransparent>
  );
};

export default ForgotPasswordEmailStep;
