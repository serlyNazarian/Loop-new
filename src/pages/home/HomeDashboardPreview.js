import { theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import HomeSkeletonBar from './HomeSkeletonBar';
import MyFlex from '../../components/myFlex/MyFlex';
import MyText from '../../components/myText/MyText';
import { CaretRightOutlined } from '@ant-design/icons';
import MyButton from '../../components/myButton/MyButton';
import MyFlexCenter from '../../components/myFlex/MyFlexCenter';
import MyFlexVertical from '../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../components/myText/MyTextSecondary';

const TRAFFIC = ['#FF5F57', '#FEBC2E', '#28C840'];

const HomeDashboardPreview = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        background: token.colorBgContainer,
        border: `1px solid ${token.colorBorderSecondary}`,
        boxShadow: '0 30px 80px -20px rgba(40,10,80,0.25)',
      }}
    >
      <MyFlex
        align="center"
        gap={8}
        style={{
          height: 40,
          padding: '0 16px',
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        <MyFlex gap={6}>
          {TRAFFIC.map((c) => (
            <span
              key={c}
              style={{
                width: 12,
                height: 12,
                background: c,
                borderRadius: '50%',
              }}
            />
          ))}
        </MyFlex>
        <MyTextSecondary fontSize={12} style={{ marginLeft: 8 }}>
          Loop – Dashboard
        </MyTextSecondary>
      </MyFlex>
      <div
        style={{
          position: 'relative',
          height: 460,
          padding: 20,
          overflow: 'hidden',
        }}
      >
        <MyFlex
          gap={20}
          style={{ opacity: 0.5, filter: 'blur(1px)', height: '100%' }}
        >
          <MyFlexVertical gap={14} style={{ width: 150, flexShrink: 0 }}>
            {[60, 90, 80, 70, 100, 75, 85].map((w, i) => (
              <HomeSkeletonBar key={i} width={`${w}%`} token={token} />
            ))}
          </MyFlexVertical>
          <MyFlexVertical gap={14} style={{ flex: 1 }}>
            <MyFlex gap={14}>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: 64,
                    borderRadius: 12,
                    background: token.colorFillSecondary,
                  }}
                />
              ))}
            </MyFlex>
            {[95, 88, 92, 80, 90, 70].map((w, i) => (
              <HomeSkeletonBar
                key={i}
                width={`${w}%`}
                token={token}
                opacity={1 - i * 0.08}
              />
            ))}
          </MyFlexVertical>
        </MyFlex>
        <MyFlexCenter style={{ position: 'absolute', inset: 0 }}>
          <MyFlexVertical
            align="center"
            gap={12}
            style={{
              padding: 28,
              maxWidth: 320,
              textAlign: 'center',
              borderRadius: 20,
              background: token.colorBgContainer,
              border: `1px solid ${token.colorBorderSecondary}`,
              boxShadow: '0 20px 50px -15px rgba(40,10,80,0.25)',
            }}
          >
            <MyFlexCenter
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: token.brandGradient,
                boxShadow: token.brandButtonShadow,
              }}
            >
              <CaretRightOutlined
                style={{ color: token.colorWhite, fontSize: 24 }}
              />
            </MyFlexCenter>
            <MyText
              bold
              fontSize={11}
              color={token.colorPrimary}
              style={{ letterSpacing: '0.12em' }}
            >
              INTERACTIVE DEMO
            </MyText>
            <MyText fontSize={20} bold>
              Start the interactive experience
            </MyText>
            <MyTextSecondary fontSize={13}>
              Explore Loop's full dashboard — conversations, AI agents,
              broadcasts, and more.
            </MyTextSecondary>
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
          </MyFlexVertical>
        </MyFlexCenter>
      </div>
    </div>
  );
};

export default HomeDashboardPreview;
