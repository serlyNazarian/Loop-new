import { theme } from 'antd';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
          label={t('register_first_name_label')}
          rules={[{ required: true, message: t('register_first_name_required') }]}
          placeholder="Jane"
          autoComplete="given-name"
          formItemProps={{ style: { flex: 1, minWidth: 140 } }}
        />
        <MyInputItem
          name="lastName"
          label={t('register_last_name_label')}
          placeholder="Smith"
          autoComplete="family-name"
          formItemProps={{ style: { flex: 1, minWidth: 140 } }}
        />
      </MyFlex>
      <MyInputItem
        name="email"
        label={t('register_email_label')}
        rules={[
          {
            required: true,
            type: 'email',
            message: t('register_email_invalid'),
          },
        ]}
        placeholder="you@company.com"
        autoComplete="email"
      />
      <MyFlexVertical gap={8}>
        <MyInputPasswordItem
          name="password"
          label={t('register_password_label')}
          rules={[
            { required: true, message: t('register_password_required') },
            { min: 8, message: t('register_password_min') },
          ]}
          placeholder={t('register_password_placeholder')}
          autoComplete="new-password"
        />
        <RegisterPasswordStrength password={password} />
      </MyFlexVertical>
      <MyFlexVertical gap={6}>
        <MyInputPasswordItem
          name="confirm"
          label={t('register_confirm_password_label')}
          rules={[
            { required: true, message: t('register_confirm_password_required') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value)
                  return Promise.resolve();
                return Promise.reject(
                  new Error(t('register_passwords_do_not_match'))
                );
              },
            }),
          ]}
          placeholder={t('register_confirm_password_placeholder')}
          autoComplete="new-password"
        />
        {confirm && (
          <MyFlex align="center" gap={6}>
            {passwordsMatch && (
              <CheckOutlined
                style={{ color: token.pwCheckOk, fontSize: token.fontSizeXS }}
              />
            )}
            <MyText
              fontSize={11}
              color={passwordsMatch ? token.pwCheckOk : token.colorError}
            >
              {passwordsMatch
                ? t('register_passwords_match')
                : t('register_passwords_not_match_yet')}
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
                    new Error(t('register_terms_required'))
                  ),
          },
        ]}
      >
        <MyCheckbox style={{ fontSize: token.fontSizeMD }}>
          {t('register_agree_to')}{' '}
          <MyLink to="/terms" underline fontSize={13}>
            {t('register_terms_and_conditions')}
          </MyLink>
        </MyCheckbox>
      </MyFormItem>
      <MyButton
        block
        size="large"
        type="primary"
        onClick={onContinue}
        disabled={!step1Filled}
      >
        {t('register_continue')}
      </MyButton>
    </MyFlexVertical>
  );
};

export default RegisterAccountStep;
