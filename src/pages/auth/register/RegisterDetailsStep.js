import { useTranslation } from 'react-i18next';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyButton from '../../../components/myButton/MyButton';
import MyInputItem from '../../../components/myInput/MyInputItem';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';

const RegisterDetailsStep = ({ onBack, onContinue }) => {
  const { t } = useTranslation();

  return (
    <MyFlexVertical gap={18}>
      <MyInputItem
        name="phone"
        label={t('register_phone_label')}
        placeholder="+965 9999 1234"
        autoComplete="tel"
        formItemProps={{
          extra: (
            <MyTextSecondary fontSize={12}>
              {t('register_phone_extra')}
            </MyTextSecondary>
          ),
        }}
      />
      <MyInputItem
        name="companyName"
        label={t('register_company_name_label')}
        placeholder="Acme Inc."
        autoComplete="organization"
      />
      <MyFlex gap={12}>
        <MyButton size="large" onClick={onBack}>
          {t('register_back')}
        </MyButton>
        <MyButton
          size="large"
          type="primary"
          className="flex_1"
          onClick={onContinue}
        >
          {t('register_continue')}
        </MyButton>
      </MyFlex>
    </MyFlexVertical>
  );
};

export default RegisterDetailsStep;
