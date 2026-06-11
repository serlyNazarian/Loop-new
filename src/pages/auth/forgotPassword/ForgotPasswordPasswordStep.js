import { theme } from 'antd';
import MyText from '../../../components/myText/MyText';
import MyForm from '../../../components/myForm/MyForm';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyButton from '../../../components/myButton/MyButton';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';
import MyCardTransparent from '../../../components/myCard/MyCardTransparent';
import MyInputPasswordItem from '../../../components/myInput/MyInputPasswordItem';

const ForgotPasswordPasswordStep = ({
  form,
  error,
  onBack,
  loading,
  onFinish,
}) => {
  const { token } = theme.useToken();
  const values = MyForm.useWatch([], form) || {};
  const passwordsMatch = Boolean(
    values.password && values.confirm && values.password === values.confirm
  );

  return (
    <MyCardTransparent styles={{ body: { padding: 0 } }}>
      <MyFlexVertical gap={24}>
        <MyFlexVertical gap={4}>
          <MyText fontSize={34}>Set a new password</MyText>
          <MyTextSecondary fontSize={15}>
            Choose a new password for your account.
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
            <MyInputPasswordItem
              name="password"
              label="New password"
              rules={[
                { required: true, message: 'Enter a new password' },
                {
                  min: 8,
                  message: 'Please lengthen this text to 8 characters or more.',
                },
              ]}
              placeholder="Enter your new password"
              autoComplete="new-password"
              formItemProps={{
                extra: (
                  <MyTextSecondary fontSize={12}>
                    At least 8 characters.
                  </MyTextSecondary>
                ),
              }}
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
            <MyFlex gap={12}>
              <MyButton size="large" onClick={onBack}>
                Back
              </MyButton>
              <MyButton
                size="large"
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={!passwordsMatch}
                style={{ flex: 1 }}
              >
                Reset password
              </MyButton>
            </MyFlex>
          </MyFlexVertical>
        </MyForm>
      </MyFlexVertical>
    </MyCardTransparent>
  );
};

export default ForgotPasswordPasswordStep;
