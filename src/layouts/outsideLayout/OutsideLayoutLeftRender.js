import { theme } from 'antd';
import { useEffect, useState } from 'react';
import loopWhite from '../../assets/loop-white.svg';
import MyLink from '../../components/myLink/MyLink';
import MyText from '../../components/myText/MyText';
import MyFlex from '../../components/myFlex/MyFlex';
import MyImage from '../../components/myImage/MyImage';
import MyFlexVertical from '../../components/myFlex/MyFlexVertical';

const CAPTIONS = [
  ['Customer conversations,', 'on autopilot.'],
  ['AI agents that sound', 'like your brand.'],
  ['Every channel,', 'one inbox.'],
];

const ROTATE_MS = 4000;

const OutsideLayoutLeftRender = () => {
  const { token } = theme.useToken();

  const slides = token.authSlides || [token.authGradient];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setTimeout(
      () => setIndex((i) => (i + 1) % slides.length),
      ROTATE_MS
    );
    return () => clearTimeout(t);
  }, [index, slides.length]);

  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        backgroundColor: token.authDarkBase,
      }}
    >
      {slides.map((bg, i) => (
        <div
          key={i}
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: bg,
            opacity: i === index ? 1 : 0,
            transition: 'opacity 700ms ease',
          }}
        />
      ))}
      <MyLink
        to="/dashboard"
        aria-label="Loop home"
        style={{
          position: 'absolute',
          top: 28,
          left: 28,
          zIndex: 1,
          display: 'inline-flex',
        }}
      >
        <MyImage
          src={loopWhite}
          alt="Loop"
          height={32}
          style={{ width: 'auto', justifyContent: 'flex-start' }}
        />
      </MyLink>
      <MyFlexVertical
        gap={16}
        style={{
          position: 'absolute',
          left: 28,
          bottom: 28,
          right: 28,
          zIndex: 1,
        }}
      >
        <div style={{ position: 'relative', minHeight: 80 }}>
          {CAPTIONS.map(([line1, line2], i) => (
            <MyFlexVertical
              key={i}
              gap={0}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: i === index ? 1 : 0,
                transition: 'opacity 700ms ease',
              }}
            >
              <MyText
                color={token.authOnDark}
                fontSize={30}
                fontWeight={400}
                lineHeight={1.15}
                style={{ letterSpacing: '-0.025em' }}
              >
                {line1}
              </MyText>
              <MyText
                color={token.authOnDark}
                fontSize={30}
                fontWeight={400}
                lineHeight={1.15}
                style={{ letterSpacing: '-0.025em' }}
              >
                {line2}
              </MyText>
            </MyFlexVertical>
          ))}
        </div>
        <MyFlex gap={6}>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1}`}
              style={{
                height: 8,
                padding: 0,
                border: 0,
                cursor: 'pointer',
                borderRadius: 999,
                width: i === index ? 32 : 8,
                transition: 'width 300ms ease, background 300ms ease',
                background:
                  i === index ? token.authOnDark : token.authDotInactive,
              }}
            />
          ))}
        </MyFlex>
      </MyFlexVertical>
    </div>
  );
};

export default OutsideLayoutLeftRender;
