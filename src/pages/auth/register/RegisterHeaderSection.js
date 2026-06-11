import MyText from '../../../components/myText/MyText';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyLink from '../../../components/myLink/MyLink';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';

const RegisterHeaderSection = () => {
  return (
    <MyFlexVertical gap={4}>
      <MyText fontSize={34}>Create an account</MyText>
      <MyFlex gap={5}>
        <MyTextSecondary fontSize={16}>Already have an account?</MyTextSecondary>
        <MyLink underline to="/login" fontSize={16}>
          Log in
        </MyLink>
      </MyFlex>
    </MyFlexVertical>
  );
};

export default RegisterHeaderSection;
