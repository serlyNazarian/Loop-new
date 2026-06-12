import MyText from '../myText/MyText';
import { useEffect, useRef } from 'react';
import useMyTheme from '../../hooks/useMyTheme';
import './MyLoader.css';

export default function MyLoader({ message = 'Loading…', fullScreen = false }) {
  const { token, isDark } = useMyTheme();

  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  useEffect(() => {
    const targets = [
      [-22, 0],
      [22, 0],
      [0, -14],
      [0, 14],
      [16, -10],
      [-16, 10],
      [0, 0],
    ];
    let i = 0;
    let raf = 0;
    const cur = { x: 0, y: 0 };
    let target = { x: 0, y: 0 };

    const advance = () => {
      const [tx, ty] = targets[i % targets.length];
      target = { x: tx, y: ty };
      i += 1;
    };
    advance();
    const interval = setInterval(advance, 900);

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.12;
      cur.y += (target.y - cur.y) * 0.12;
      const tr = `translate(${cur.x.toFixed(1)} ${cur.y.toFixed(1)})`;
      if (leftEyeRef.current) leftEyeRef.current.setAttribute('transform', tr);
      if (rightEyeRef.current)
        rightEyeRef.current.setAttribute('transform', tr);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(raf);
    };
  }, []);

  const content = (
    <div className="ml-content">
      <div className="ml-mark-wrap" aria-hidden>
        <div className="ml-halo" style={{ background: token.loaderHalo }} />
        <div className="ml-bob">
          <svg width="56" height="56" viewBox="0 0 548.92 548.73" fill="none">
            <defs>
              <linearGradient id="ml-fill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={token.colorBrandBlue} />
                <stop offset="100%" stopColor={token.colorPrimary} />
              </linearGradient>
            </defs>
            <path
              d="M196.8,499.92h131.99c88.05,0,159.42-71.38,159.42-159.42v-131.99c0-29.93-8.35-57.86-22.73-81.76-4.84-8.04-3.27-18.34,3.93-24.37l36.59-30.66c9.17-7.69,3.74-22.63-8.23-22.63h-168.98s-52.28,0-52.28,0h-79.71c-88.05,0-159.42,71.38-159.42,159.42v131.99c0,88.05,71.38,159.42,159.42,159.42Z"
              stroke="url(#ml-fill)"
              strokeWidth="32"
              strokeMiterlimit="10"
            />
            <g ref={leftEyeRef}>
              <rect
                fill="url(#ml-fill)"
                stroke="none"
                x="139.89"
                y="221.49"
                width="159.28"
                height="84.54"
                rx="34.2"
                ry="34.2"
                transform="translate(483.29 44.23) rotate(90)"
              />
            </g>
            <g ref={rightEyeRef}>
              <rect
                fill="url(#ml-fill)"
                stroke="none"
                x="302.66"
                y="221.49"
                width="159.28"
                height="84.54"
                rx="34.2"
                ry="34.2"
                transform="translate(646.07 -118.54) rotate(90)"
              />
            </g>
          </svg>
        </div>
      </div>
      <div
        className="ml-track"
        aria-hidden
        style={{
          background: isDark ? token.loaderTrackDark : token.loaderTrack,
        }}
      >
        <div className="ml-sweep" style={{ background: token.loaderBar }} />
      </div>
      {message && (
        <MyText
          fontSize={12}
          color={token.colorTextTertiary}
          style={{ letterSpacing: '0.02em' }}
        >
          {message}
        </MyText>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className="ml-fullscreen"
        style={{ background: isDark ? token.loaderFsBgDark : token.loaderFsBg }}
      >
        <div className="ml-fullscreen-bg" aria-hidden>
          <div
            className="ml-blob ml-blob--tl"
            style={{
              background: token.loaderBlobTL,
              opacity: isDark ? 0.18 : 0.1,
            }}
          />
          <div
            className="ml-blob ml-blob--br"
            style={{
              background: token.loaderBlobBR,
              opacity: isDark ? 0.12 : 0.06,
            }}
          />
        </div>
        <div className="ml-fullscreen-inner">{content}</div>
      </div>
    );
  }

  return <div className="ml-inline">{content}</div>;
}
