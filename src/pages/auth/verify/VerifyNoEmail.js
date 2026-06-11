import { useNavigate } from 'react-router-dom';
import MyText from '../../../components/myText/MyText';
import MyButton from '../../../components/myButton/MyButton';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';
import MyCardTransparent from '../../../components/myCard/MyCardTransparent';

const VerifyNoEmail = () => {
  const navigate = useNavigate();

  return (
    <MyCardTransparent styles={{ body: { padding: 0 } }}>
      <MyFlexVertical gap={20}>
        <MyText fontSize={28}>No email on this link</MyText>
        <MyTextSecondary fontSize={15}>
          We couldn't find a pending verification for this address. Sign in or
          sign up first to get a fresh code.
        </MyTextSecondary>
        <MyButton
          block
          type="primary"
          size="large"
          onClick={() => navigate('/login')}
        >
          Go to sign in
        </MyButton>
      </MyFlexVertical>
    </MyCardTransparent>
  );
};

export default VerifyNoEmail;
