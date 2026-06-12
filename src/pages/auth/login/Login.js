import { theme } from 'antd';
import { useState } from 'react';
import useAuthStore from '../../../stores/authStore';
import LoginHeaderSection from './LoginHeaderSection';
import SocialLoginButtons from './SocialLoginButtons';
import MyForm from '../../../components/myForm/MyForm';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyLink from '../../../components/myLink/MyLink';
import { useLocation, useNavigate } from 'react-router-dom';
import MyButton from '../../../components/myButton/MyButton';
import MyFormItem from '../../../components/myForm/MyFormItem';
import MyDivider from '../../../components/myDivider/MyDivider';
import MyInputItem from '../../../components/myInput/MyInputItem';
import MyCheckbox from '../../../components/myCheckbox/MyCheckbox';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyCardTransparent from '../../../components/myCard/MyCardTransparent';
import MyInputPasswordItem from '../../../components/myInput/MyInputPasswordItem';

const API_BASE = process.env.REACT_APP_API_BASE_URL || '';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = MyForm.useForm();
  const { token } = theme.useToken();

  const login = useAuthStore((s) => s.login);

  const [loading, setLoading] = useState(false);

  const onFinish = async ({ email, password, rememberMe }) => {
    setLoading(true);
    try {
      await login(email, password, rememberMe);
      navigate(location.state?.from?.pathname || '/dashboard', {
        replace: true,
      });
    } catch (err) {
      form.setFields([
        {
          name: 'password',
          errors: [
            err.message || 'Login failed. Check your details and try again.',
          ],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const startGoogle = () => {
    window.location.href = `${API_BASE}/api/auth/google`;
  };

  const startEmailLink = () => {
    form.getFieldInstance('email')?.focus();
  };

  return (
    <MyCardTransparent styles={{ body: { padding: 0 } }}>
      <MyFlexVertical gap={20}>
        <LoginHeaderSection />
        <MyForm
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          validateTrigger={[]}
          initialValues={{ rememberMe: false }}
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
            <MyInputPasswordItem
              name="password"
              label="Password"
              autoComplete="current-password"
              placeholder="Enter your password"
              rules={[{ required: true, message: 'Enter your password' }]}
            />
            <MyFlex
              gap={12}
              wrap="nowrap"
              align="center"
              justify="space-between"
            >
              <MyFormItem name="rememberMe" valuePropName="checked" noStyle>
                <MyCheckbox
                  style={{ fontSize: token.fontSizeSM, whiteSpace: 'nowrap' }}
                >
                  Stay signed in for 90 days
                </MyCheckbox>
              </MyFormItem>
              <MyLink
                to="/forgot-password"
                style={{
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  fontSize: token.fontSizeSM,
                }}
              >
                Forgot password?
              </MyLink>
            </MyFlex>
            <MyButton
              block
              size="large"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Sign in
            </MyButton>
          </MyFlexVertical>
        </MyForm>
        <MyDivider
          style={{ fontSize: token.fontSizeXS, letterSpacing: '0.08em' }}
        >
          OR SIGN IN WITH
        </MyDivider>
        <SocialLoginButtons
          onGoogle={startGoogle}
          startEmailLink={startEmailLink}
        />
      </MyFlexVertical>
    </MyCardTransparent>
  );
};

export default Login;
