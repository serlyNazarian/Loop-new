import { theme } from 'antd';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const values = MyForm.useWatch([], form) || {};

  const passwordsMatch = Boolean(
    values.password && values.confirm && values.password === values.confirm
  );

  return (
    <MyCardTransparent styles={{ body: { padding: 0 } }}>
      <MyFlexVertical gap={24}>
        <MyFlexVertical gap={4}>
          <MyText fontSize={34}>{t('forgot_set_password_title')}</MyText>
          <MyTextSecondary fontSize={15}>
            {t('forgot_set_password_subtitle')}
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
        >
          <MyFlexVertical gap={18}>
            <MyInputPasswordItem
              name="password"
              label={t('forgot_new_password_label')}
              rules={[
                { required: true, message: t('forgot_new_password_required') },
                {
                  min: 8,
                  message: t('forgot_password_min_length'),
                },
              ]}
              placeholder={t('forgot_new_password_placeholder')}
              autoComplete="new-password"
              formItemProps={{
                extra: (
                  <MyTextSecondary fontSize={12}>
                    {t('forgot_password_min_hint')}
                  </MyTextSecondary>
                ),
              }}
            />
            <MyInputPasswordItem
              name="confirm"
              label={t('forgot_confirm_password_label')}
              rules={[
                {
                  required: true,
                  message: t('forgot_confirm_password_required'),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value)
                      return Promise.resolve();
                    return Promise.reject(
                      new Error(t('forgot_passwords_mismatch'))
                    );
                  },
                }),
              ]}
              placeholder={t('forgot_confirm_password_placeholder')}
              autoComplete="new-password"
            />
            <MyFlex gap={12}>
              <MyButton size="large" onClick={onBack}>
                {t('forgot_back')}
              </MyButton>
              <MyButton
                size="large"
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={!passwordsMatch}
                className="flex_1"
              >
                {t('forgot_reset_password')}
              </MyButton>
            </MyFlex>
          </MyFlexVertical>
        </MyForm>
      </MyFlexVertical>
    </MyCardTransparent>
  );
};

export default ForgotPasswordPasswordStep;
