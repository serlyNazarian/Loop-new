import { theme } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import MyForm from '../../../components/myForm/MyForm';
import MyText from '../../../components/myText/MyText';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyLink from '../../../components/myLink/MyLink';
import MyButton from '../../../components/myButton/MyButton';
import MyFormItem from '../../../components/myForm/MyFormItem';
import RegisterPasswordStrength from './RegisterPasswordStrength';
import MyInputItem from '../../../components/myInput/MyInputItem';
import MyCheckbox from '../../../components/myCheckbox/MyCheckbox';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyInputPasswordItem from '../../../components/myInput/MyInputPasswordItem';

const RegisterAccountStep = ({ form, onContinue }) => {
  const { token } = theme.useToken();

  const values = MyForm.useWatch([], form) || {};

  const password = values.password || '';
  const confirm = values.confirm || '';
  const passwordsMatch = Boolean(password && confirm && password === confirm);

  const step1Filled = Boolean(
    values.firstName?.trim() &&
    values.email?.trim() &&
    password &&
    confirm &&
    values.agree
  );

  return (
    <MyFlexVertical gap={18}>
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
        <RegisterPasswordStrength password={password} />
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
                return Promise.reject(new Error('Passwords do not match'));
              },
            }),
          ]}
          placeholder="Re-enter your password"
          autoComplete="new-password"
        />
        {confirm && (
          <MyFlex align="center" gap={6}>
            {passwordsMatch && (
              <CheckOutlined style={{ color: token.pwCheckOk, fontSize: 11 }} />
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
        onClick={onContinue}
        disabled={!step1Filled}
      >
        Continue
      </MyButton>
    </MyFlexVertical>
  );
};

export default RegisterAccountStep;
