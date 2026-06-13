import { useTranslation } from 'react-i18next';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyButton from '../../../components/myButton/MyButton';
import MySelect from '../../../components/mySelect/MySelect';
import MyFormItem from '../../../components/myForm/MyFormItem';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import {
  HEARD_OPTIONS,
  USECASE_OPTIONS,
  TEAMSIZE_OPTIONS,
} from './registerConstants';

const RegisterOnboardingStep = ({ onBack, loading }) => {
  const { t } = useTranslation();

  const localize = (options, prefix) =>
    options.map((option) => ({
      value: option.value,
      label: t(`register_${prefix}_option_${option.value}`),
    }));

  return (
    <MyFlexVertical gap={18}>
      <MyFormItem name="heardAbout" label={t('register_heard_about_label')}>
        <MySelect
          placeholder={t('register_heard_about_placeholder')}
          options={localize(HEARD_OPTIONS, 'heard')}
          allowClear
        />
      </MyFormItem>
      <MyFormItem name="useCase" label={t('register_use_case_label')}>
        <MySelect
          placeholder={t('register_use_case_placeholder')}
          options={localize(USECASE_OPTIONS, 'use_case')}
          allowClear
        />
      </MyFormItem>
      <MyFormItem name="teamSize" label={t('register_team_size_label')}>
        <MySelect
          placeholder={t('register_team_size_placeholder')}
          options={localize(TEAMSIZE_OPTIONS, 'team_size')}
          allowClear
        />
      </MyFormItem>
      <MyFlex gap={12}>
        <MyButton size="large" onClick={onBack}>
          {t('register_back')}
        </MyButton>
        <MyButton
          type="primary"
          htmlType="submit"
          size="large"
          loading={loading}
          className="flex_1"
        >
          {t('register_create_account')}
        </MyButton>
      </MyFlex>
    </MyFlexVertical>
  );
};

export default RegisterOnboardingStep;
