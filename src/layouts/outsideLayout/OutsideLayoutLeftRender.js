import { theme } from 'antd';
import { useEffect, useState } from 'react';
import loopWhite from '../../assets/loop-white.svg';
import MyLink from '../../components/myLink/MyLink';
import MyText from '../../components/myText/MyText';
import MyFlex from '../../components/myFlex/MyFlex';
import MyImage from '../../components/myImage/MyImage';
import MyFlexVertical from '../../components/myFlex/MyFlexVertical';
import './OutsideLayoutLeftRender.css';

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
    <div className="ol_left">
      {slides.map((bg, i) => (
        <div
          key={i}
          aria-hidden
          className="ol_left_slide"
          style={{
            backgroundImage: bg,
            opacity: i === index ? 1 : 0,
          }}
        />
      ))}
      <MyLink to="/dashboard" aria-label="Loop home" className="ol_left_logo">
        <MyImage
          src={loopWhite}
          alt="Loop"
          height={32}
          style={{ width: 'auto', justifyContent: 'flex-start' }}
        />
      </MyLink>
      <MyFlexVertical gap={16} className="ol_left_captions">
        <div className="ol_left_caption_box">
          {CAPTIONS.map(([line1, line2], i) => (
            <MyFlexVertical
              key={i}
              gap={0}
              className="ol_left_caption"
              style={{
                opacity: i === index ? 1 : 0,
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
              className="ol_left_dot"
              style={{
                width: i === index ? 32 : 8,
                borderRadius: token.borderRadiusPill,
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
