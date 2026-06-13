import { useTranslation } from 'react-i18next';
import MyText from '../../../components/myText/MyText';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';

const VerifyHeaderSection = ({ email }) => {
  const { t } = useTranslation();

  return (
    <MyFlexVertical gap={4}>
      <MyText fontSize={34}>{t('verify_title')}</MyText>
      <MyTextSecondary fontSize={15}>
        {t('verify_subtitle', { email })}
      </MyTextSecondary>
    </MyFlexVertical>
  );
};

export default VerifyHeaderSection;
