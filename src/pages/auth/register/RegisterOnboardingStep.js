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
  return (
    <MyFlexVertical gap={18}>
      <MyFormItem name="heardAbout" label="How did you hear about Loop?">
        <MySelect placeholder="Choose one" options={HEARD_OPTIONS} allowClear />
      </MyFormItem>
      <MyFormItem name="useCase" label="What will you primarily use Loop for?">
        <MySelect
          placeholder="Pick the closest match"
          options={USECASE_OPTIONS}
          allowClear
        />
      </MyFormItem>
      <MyFormItem name="teamSize" label="How big is your team?">
        <MySelect
          placeholder="Pick a range"
          options={TEAMSIZE_OPTIONS}
          allowClear
        />
      </MyFormItem>
      <MyFlex gap={12}>
        <MyButton size="large" onClick={onBack}>
          Back
        </MyButton>
        <MyButton
          type="primary"
          htmlType="submit"
          size="large"
          loading={loading}
          className="flex_1"
        >
          Create account
        </MyButton>
      </MyFlex>
    </MyFlexVertical>
  );
};

export default RegisterOnboardingStep;
