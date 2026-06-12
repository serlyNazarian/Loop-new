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
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const { isMobile } = useWindowSize();

  return (
    <MyFlexVertical gap={16} align="center" className="home_hero">
      <HomeAiOrb size={isMobile ? 128 : 160} />
      <MyTextGradient
        fontWeight={700}
        lineHeight={1.2}
        className="home_hero_title"
        fontSize={isMobile ? 30 : 48}
      >
        Respond faster, convert better,
        <br />
        operate smarter
      </MyTextGradient>
      <MyTextSecondary className="home_hero_sub" fontSize={isMobile ? 14 : 16}>
        Most platforms can't. Loop unifies all customer touchpoints and CRMs in
        a team inbox with AI Agents and native lead management so your
        conversations never break — even when customers switch channels.
      </MyTextSecondary>
      <MyFlex gap={12} wrap="wrap" justify="center">
        <MyButton
          size="large"
          onClick={() => navigate('/register')}
          style={{ borderRadius: token.borderRadiusPill }}
        >
          Talk to Sales
        </MyButton>
        <MyButton
          type="primary"
          size="large"
          onClick={() => navigate('/register')}
          style={{
            border: 'none',
            background: token.brandGradient,
            boxShadow: token.brandButtonShadow,
            borderRadius: token.borderRadiusPill,
          }}
        >
          Request Access
        </MyButton>
      </MyFlex>
    </MyFlexVertical>
  );
};

export default HomeHero;
