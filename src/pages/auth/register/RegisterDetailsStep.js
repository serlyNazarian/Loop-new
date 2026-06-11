import MyFlex from '../../../components/myFlex/MyFlex';
import MyButton from '../../../components/myButton/MyButton';
import MyInputItem from '../../../components/myInput/MyInputItem';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';

const RegisterDetailsStep = ({ onBack, onContinue }) => {
  return (
    <MyFlexVertical gap={18}>
      <MyInputItem
        name="phone"
        label="Phone number"
        placeholder="+965 9999 1234"
        autoComplete="tel"
        formItemProps={{
          extra: (
            <MyTextSecondary fontSize={12}>
              Include the country code. We only use it for account recovery.
            </MyTextSecondary>
          ),
        }}
      />
      <MyInputItem
        name="companyName"
        label="Company name"
        placeholder="Acme Inc."
        autoComplete="organization"
      />
      <MyFlex gap={12}>
        <MyButton size="large" onClick={onBack}>
          Back
        </MyButton>
        <MyButton
          size="large"
          type="primary"
          style={{ flex: 1 }}
          onClick={onContinue}
        >
          Continue
        </MyButton>
      </MyFlex>
    </MyFlexVertical>
  );
};

export default RegisterDetailsStep;
