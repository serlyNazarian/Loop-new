import MyText from '../../../components/myText/MyText';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';

const VerifyHeaderSection = ({ email }) => {
  return (
    <MyFlexVertical gap={4}>
      <MyText fontSize={34}>Check your inbox</MyText>
      <MyTextSecondary fontSize={15}>
        We sent a 6-digit code to {email}. It expires in 10 minutes.
      </MyTextSecondary>
    </MyFlexVertical>
  );
};

export default VerifyHeaderSection;
