import { theme } from 'antd';
import HomeAiOrb from './HomeAiOrb';
import { useNavigate } from 'react-router-dom';
import MyFlex from '../../components/myFlex/MyFlex';
import useWindowSize from '../../hooks/useWindowSize';
import MyButton from '../../components/myButton/MyButton';
import MyTextGradient from '../../components/myText/MyTextGradient';
import MyFlexVertical from '../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../components/myText/MyTextSecondary';

const HomeHero = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const { isMobile } = useWindowSize();

  return (
    <MyFlexVertical
      gap={16}
      align="center"
      style={{ textAlign: 'center', maxWidth: 860, width: '100%' }}
    >
      <HomeAiOrb size={isMobile ? 128 : 160} />
      <MyTextGradient
        fontWeight={700}
        lineHeight={1.2}
        fontSize={isMobile ? 30 : 48}
        style={{ letterSpacing: '-0.01em' }}
      >
        Respond faster, convert better,
        <br />
        operate smarter
      </MyTextGradient>
      <MyTextSecondary
        fontSize={isMobile ? 14 : 16}
        style={{ maxWidth: 620, lineHeight: 1.6 }}
      >
        Most platforms can't. Loop unifies all customer touchpoints and CRMs in
        a team inbox with AI Agents and native lead management so your
        conversations never break — even when customers switch channels.
      </MyTextSecondary>
      <MyFlex gap={12} wrap="wrap" justify="center">
        <MyButton
          size="large"
          onClick={() => navigate('/register')}
          style={{ borderRadius: 999 }}
        >
          Talk to Sales
        </MyButton>
        <MyButton
          type="primary"
          size="large"
          onClick={() => navigate('/register')}
          style={{
            borderRadius: 999,
            border: 'none',
            background: token.brandGradient,
            boxShadow: token.brandButtonShadow,
          }}
        >
          Request Access
        </MyButton>
      </MyFlex>
    </MyFlexVertical>
  );
};

export default HomeHero;
