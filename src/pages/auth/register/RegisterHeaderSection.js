import { useTranslation } from 'react-i18next';
import MyText from '../../../components/myText/MyText';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyLink from '../../../components/myLink/MyLink';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';

const RegisterHeaderSection = () => {
  const { t } = useTranslation();

  return (
    <MyFlexVertical gap={4}>
      <MyText fontSize={34}>{t('register_create_account_title')}</MyText>
      <MyFlex gap={5}>
        <MyTextSecondary fontSize={16}>
          {t('register_already_have_account')}
        </MyTextSecondary>
        <MyLink underline to="/login" fontSize={16}>
          {t('register_log_in')}
        </MyLink>
      </MyFlex>
    </MyFlexVertical>
  );
};

export default RegisterHeaderSection;
