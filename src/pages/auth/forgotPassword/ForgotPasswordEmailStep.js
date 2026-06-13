import { theme } from 'antd';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { token } = theme.useToken();

  return (
    <MyCardTransparent styles={{ body: { padding: 0 } }}>
      <MyFlexVertical gap={24}>
        <MyFlexVertical gap={4}>
          <MyTextGradient>{t('forgot_title')}</MyTextGradient>
          <MyTextSecondary fontSize={16}>
            {t('forgot_email_subtitle')}
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
            <MyInputItem
              name="email"
              label={t('forgot_email_label')}
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: t('forgot_email_invalid'),
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
              {t('forgot_send_code')}
            </MyButton>
          </MyFlexVertical>
        </MyForm>
        <MyFlexCenter>
          <MyLink to="/login" fontSize={14}>
            {t('forgot_back_to_sign_in')}
          </MyLink>
        </MyFlexCenter>
      </MyFlexVertical>
    </MyCardTransparent>
  );
};

export default ForgotPasswordEmailStep;
