import { useTranslation } from 'react-i18next';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyLink from '../../../components/myLink/MyLink';
import MyText from '../../../components/myText/MyText';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';

const LoginHeaderSection = () => {
  const { t } = useTranslation();

  return (
    <MyFlexVertical gap={4}>
      <MyText fontSize={34}>{t('login_title')}</MyText>
      <MyFlex gap={5}>
        <MyTextSecondary fontSize={16}>{t('login_no_account')}</MyTextSecondary>
        <MyLink underline to="/register" fontSize={16}>
          {t('login_sign_up')}
        </MyLink>
      </MyFlex>
    </MyFlexVertical>
  );
};

export default LoginHeaderSection;
