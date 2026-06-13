import { theme } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
            err.message || t('login_failed_generic'),
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
          initialValues={{ rememberMe: false }}
        >
          <MyFlexVertical gap={18}>
            <MyInputItem
              name="email"
              label={t('login_email_label')}
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: t('login_email_invalid'),
                },
              ]}
              placeholder="you@company.com"
              autoComplete="email"
            />
            <MyInputPasswordItem
              name="password"
              label={t('login_password_label')}
              autoComplete="current-password"
              placeholder={t('login_password_placeholder')}
              rules={[{ required: true, message: t('login_password_required') }]}
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
                  {t('login_stay_signed_in')}
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
                {t('login_forgot_password')}
              </MyLink>
            </MyFlex>
            <MyButton
              block
              size="large"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {t('login_submit')}
            </MyButton>
          </MyFlexVertical>
        </MyForm>
        <MyDivider
          style={{ fontSize: token.fontSizeXS, letterSpacing: '0.08em' }}
        >
          {t('login_social_divider')}
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
