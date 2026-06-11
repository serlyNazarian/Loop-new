import MyFlex from '../../../components/myFlex/MyFlex';
import MyLink from '../../../components/myLink/MyLink';
import MyText from '../../../components/myText/MyText';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';

const LoginHeaderSection = () => {
  return (
    <MyFlexVertical gap={4}>
      <MyText fontSize={34}>Welcome back</MyText>
      <MyFlex gap={5}>
        <MyTextSecondary fontSize={16}>Don't have an account?</MyTextSecondary>
        <MyLink underline to="/register" fontSize={16}>
          Sign up
        </MyLink>
      </MyFlex>
    </MyFlexVertical>
  );
};

export default LoginHeaderSection;
