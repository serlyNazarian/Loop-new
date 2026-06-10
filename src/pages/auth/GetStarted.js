import { useState } from 'react';
import { theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CheckOutlined } from '@ant-design/icons';
import { signup } from '../../actions/authActions';
import MyText from '../../components/myText/MyText';
import MyLink from '../../components/myLink/MyLink';
import MyFlex from '../../components/myFlex/MyFlex';
import MyForm from '../../components/myForm/MyForm';
import MyButton from '../../components/myButton/MyButton';
import MySelect from '../../components/mySelect/MySelect';
import MyFormItem from '../../components/myForm/MyFormItem';
import SocialLoginButtons from './login/SocialLoginButtons';
import MyDivider from '../../components/myDivider/MyDivider';
import MyInputItem from '../../components/myInput/MyInputItem';
import MyCheckbox from '../../components/myCheckbox/MyCheckbox';
import MyFlexVertical from '../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../components/myText/MyTextSecondary';
import MyCardTransparent from '../../components/myCard/MyCardTransparent';
import MyInputPasswordItem from '../../components/myInput/MyInputPasswordItem';

const API_BASE = process.env.REACT_APP_API_BASE_URL || '';
const TOTAL_STEPS = 3;

const HEARD_OPTIONS = [
  { value: 'google', label: 'Google search' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'twitter', label: 'X / Twitter' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'friend', label: 'Friend or colleague' },
  { value: 'other', label: 'Somewhere else' },
];
const USECASE_OPTIONS = [
  { value: 'support', label: 'Customer support' },
  { value: 'sales', label: 'Sales conversations' },
  { value: 'leadgen', label: 'Lead capture and qualification' },
  { value: 'scheduling', label: 'Booking and scheduling' },
  { value: 'other', label: 'Something else' },
];
const TEAMSIZE_OPTIONS = [
  { value: 'solo', label: 'Just me' },
  { value: '2-10', label: '2 to 10' },
  { value: '11-50', label: '11 to 50' },
  { value: '51+', label: '51 or more' },
];

function scorePassword(pw) {
  if (!pw) return { score: 0, label: '' };
  let s = 0;
  if (pw.length >= 8) s += 1;
  if (pw.length >= 12) s += 1;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s += 1;
  if (/\d/.test(pw)) s += 1;
  if (/[^A-Za-z0-9]/.test(pw)) s += 1;
  if (/(.)\1{3,}/.test(pw)) s = Math.max(0, s - 1);
  if (/^(password|qwerty|123456|abc123|letmein|welcome)/i.test(pw)) s = 0;
  const score = Math.min(s, 4);
  const label =
    score <= 1
      ? 'Weak'
      : score === 2
        ? 'Fair'
        : score === 3
          ? 'Strong'
          : 'Very strong';
  return { score, label };
}

const GetStarted = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const [form] = MyForm.useForm();

  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const values = MyForm.useWatch([], form) || {};
  const password = values.password || '';
  const confirm = values.confirm || '';
  const passwordsMatch = Boolean(password && confirm && password === confirm);

  const strength = scorePassword(password);
  const strengthColor = token.pwStrength[strength.score];

  const step1Filled = Boolean(
    values.firstName?.trim() &&
    values.email?.trim() &&
    password &&
    confirm &&
    values.agree
  );

  const checks = [
    { ok: password.length >= 8, label: '8+ characters' },
    {
      ok: /[a-z]/.test(password) && /[A-Z]/.test(password),
      label: 'Upper and lower case',
    },
    { ok: /\d/.test(password), label: 'A number' },
    { ok: /[^A-Za-z0-9]/.test(password), label: 'A special character' },
  ];

  const goToStep2 = async () => {
    setError(null);
    try {
      await form.validateFields([
        'firstName',
        'email',
        'password',
        'confirm',
        'agree',
      ]);
      setStep(2);
    } catch {
      setStep(1);
    }
  };

  const startGoogle = () => {
    window.location.href = `${API_BASE}/api/auth/google`;
  };
  const focusEmail = () => form.getFieldInstance('email')?.focus();

  const onFinish = async (v) => {
    setError(null);
    setLoading(true);
    try {
      await signup({
        email: v.email.trim(),
        password: v.password,
        firstName: v.firstName.trim(),
        lastName: v.lastName?.trim() || undefined,
        phone: v.phone?.trim() || undefined,
        companyName: v.companyName?.trim() || undefined,
        onboardingData: {
          heardAbout: v.heardAbout || undefined,
          useCase: v.useCase || undefined,
          teamSize: v.teamSize || undefined,
        },
      });
      navigate(`/verify?email=${encodeURIComponent(v.email.trim())}`);
    } catch (err) {
      setError(err.message || 'Sign up failed. Please try again.');
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MyCardTransparent styles={{ body: { padding: 0 } }}>
      <MyFlexVertical gap={24}>
        <MyFlexVertical gap={12}>
          <MyFlexVertical gap={4}>
            <MyText fontSize={34}>Create an account</MyText>
            <MyFlex gap={5}>
              <MyTextSecondary fontSize={16}>
                Already have an account?
              </MyTextSecondary>
              <MyLink underline to="/login" fontSize={16}>
                Log in
              </MyLink>
            </MyFlex>
          </MyFlexVertical>
          <MyFlex gap={8} justify="center">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 6,
                  width: step === i + 1 ? 28 : 8,
                  borderRadius: 999,
                  background:
                    i + 1 <= step
                      ? token.colorPrimary
                      : token.colorFillSecondary,
                  transition: 'width 200ms ease, background 200ms ease',
                }}
              />
            ))}
          </MyFlex>
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
          requiredMark="optional"
          validateTrigger={[]}
        >
          <MyFlexVertical
            gap={18}
            style={{ display: step === 1 ? 'flex' : 'none' }}
          >
            <MyFlex gap={12} wrap="wrap">
              <MyInputItem
                name="firstName"
                label="First name"
                rules={[{ required: true, message: 'Enter your first name' }]}
                placeholder="Jane"
                autoComplete="given-name"
                formItemProps={{ style: { flex: 1, minWidth: 140 } }}
              />
              <MyInputItem
                name="lastName"
                label="Last name"
                placeholder="Smith"
                autoComplete="family-name"
                formItemProps={{ style: { flex: 1, minWidth: 140 } }}
              />
            </MyFlex>

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
            <MyFlexVertical gap={8}>
              <MyInputPasswordItem
                name="password"
                label="Password"
                rules={[
                  { required: true, message: 'Create a password' },
                  { min: 8, message: 'At least 8 characters' },
                ]}
                placeholder="Create a password"
                autoComplete="new-password"
              />
              {password && (
                <MyFlexVertical gap={8}>
                  <MyFlex gap={4}>
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        style={{
                          height: 4,
                          flex: 1,
                          borderRadius: 999,
                          background:
                            i < strength.score
                              ? strengthColor
                              : token.colorFillSecondary,
                          transition: 'background 200ms ease',
                        }}
                      />
                    ))}
                  </MyFlex>
                  <MyText color={strengthColor} fontSize={11}>
                    {strength.label}
                  </MyText>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      columnGap: 12,
                      rowGap: 4,
                    }}
                  >
                    {checks.map((c) => (
                      <MyFlex key={c.label} align="center" gap={6}>
                        {c.ok ? (
                          <CheckOutlined
                            style={{ color: token.pwCheckOk, fontSize: 11 }}
                          />
                        ) : (
                          <span
                            style={{
                              width: 11,
                              height: 11,
                              borderRadius: '50%',
                              border: `1.5px solid ${token.pwCheckOff}`,
                              flexShrink: 0,
                            }}
                          />
                        )}
                        <MyText
                          color={c.ok ? token.pwCheckOk : token.pwCheckOff}
                          fontSize={11}
                        >
                          {c.label}
                        </MyText>
                      </MyFlex>
                    ))}
                  </div>
                </MyFlexVertical>
              )}
            </MyFlexVertical>
            <MyFlexVertical gap={6}>
              <MyInputPasswordItem
                name="confirm"
                label="Confirm password"
                rules={[
                  { required: true, message: 'Confirm your password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value)
                        return Promise.resolve();
                      return Promise.reject(
                        new Error('Passwords do not match')
                      );
                    },
                  }),
                ]}
                placeholder="Re-enter your password"
                autoComplete="new-password"
              />
              {confirm && (
                <MyFlex align="center" gap={6}>
                  {passwordsMatch && (
                    <CheckOutlined
                      style={{ color: token.pwCheckOk, fontSize: 11 }}
                    />
                  )}
                  <MyText
                    color={passwordsMatch ? token.pwCheckOk : token.colorError}
                    fontSize={11}
                  >
                    {passwordsMatch
                      ? 'Passwords match'
                      : "Passwords don't match yet."}
                  </MyText>
                </MyFlex>
              )}
            </MyFlexVertical>
            <MyFormItem
              name="agree"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error('Please accept the terms to continue')
                        ),
                },
              ]}
            >
              <MyCheckbox style={{ fontSize: 13 }}>
                I agree to the{' '}
                <MyLink to="/terms" underline fontSize={13}>
                  Terms &amp; Conditions
                </MyLink>
              </MyCheckbox>
            </MyFormItem>
            <MyButton
              block
              type="primary"
              size="large"
              onClick={goToStep2}
              disabled={!step1Filled}
            >
              Continue
            </MyButton>
          </MyFlexVertical>
          <MyFlexVertical
            gap={18}
            style={{ display: step === 2 ? 'flex' : 'none' }}
          >
            <MyInputItem
              name="phone"
              label="Phone number"
              placeholder="+965 9999 1234"
              autoComplete="tel"
              formItemProps={{
                extra: (
                  <MyTextSecondary fontSize={12}>
                    Include the country code. We only use it for account
                    recovery.
                  </MyTextSecondary>
                ),
              }}
            />
            <MyInputItem
              name="companyName"
              label="Company name"
              placeholder="Acme Inc."
              autoComplete="organization"
            />
            <MyFlex gap={12}>
              <MyButton size="large" onClick={() => setStep(1)}>
                Back
              </MyButton>
              <MyButton
                size="large"
                type="primary"
                style={{ flex: 1 }}
                onClick={() => setStep(3)}
              >
                Continue
              </MyButton>
            </MyFlex>
          </MyFlexVertical>
          <MyFlexVertical
            gap={18}
            style={{ display: step === 3 ? 'flex' : 'none' }}
          >
            <MyFormItem name="heardAbout" label="How did you hear about Loop?">
              <MySelect
                placeholder="Choose one"
                options={HEARD_OPTIONS}
                style={{ width: '100%' }}
                allowClear
              />
            </MyFormItem>
            <MyFormItem
              name="useCase"
              label="What will you primarily use Loop for?"
            >
              <MySelect
                placeholder="Pick the closest match"
                options={USECASE_OPTIONS}
                style={{ width: '100%' }}
                allowClear
              />
            </MyFormItem>
            <MyFormItem name="teamSize" label="How big is your team?">
              <MySelect
                placeholder="Pick a range"
                options={TEAMSIZE_OPTIONS}
                style={{ width: '100%' }}
                allowClear
              />
            </MyFormItem>
            <MyFlex gap={12}>
              <MyButton size="large" onClick={() => setStep(2)}>
                Back
              </MyButton>
              <MyButton
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                style={{ flex: 1 }}
              >
                Create account
              </MyButton>
            </MyFlex>
          </MyFlexVertical>
        </MyForm>
        {step === 1 && (
          <>
            <MyDivider style={{ fontSize: 11, letterSpacing: '0.08em' }}>
              OR REGISTER WITH
            </MyDivider>
            <SocialLoginButtons
              startGoogle={startGoogle}
              startEmailLink={focusEmail}
            />
          </>
        )}
      </MyFlexVertical>
    </MyCardTransparent>
  );
};

export default GetStarted;
