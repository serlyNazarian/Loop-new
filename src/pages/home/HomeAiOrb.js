import { useEffect, useRef, useState } from 'react';
import { theme } from 'antd';
import './Home.css';

const HomeAiOrb = ({ size = 160 }) => {
  const { token } = theme.useToken();

  const orbRef = useRef(null);

  const [squint, setSquint] = useState(0);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;
    let target = { x: 0, y: 0 };
    let targetSquint = 0;
    const current = { x: 0, y: 0 };
    let currentSquint = 0;

    const onMove = (e) => {
      if (!orbRef.current) return;
      const rect = orbRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const maxOffset = 9;
      const norm = Math.min(dist / 140, 1);
      const ang = Math.atan2(dy, dx);
      target = {
        x: Math.cos(ang) * maxOffset * norm,
        y: Math.sin(ang) * maxOffset * norm,
      };
      targetSquint = Math.max(0, Math.min(1, 1 - dist / 220));
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.32;
      current.y += (target.y - current.y) * 0.32;
      currentSquint += (targetSquint - currentSquint) * 0.16;
      setPupil({ x: current.x, y: current.y });
      setSquint(currentSquint);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div style={{ display: 'inline-block' }} aria-hidden>
      <div className="home-orb-float" style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            inset: '-30%',
            borderRadius: '50%',
            filter: 'blur(40px)',
            pointerEvents: 'none',
            background: token.orbHalo,
          }}
        />
        <div
          ref={orbRef}
          style={{
            position: 'relative',
            width: size,
            height: size,
            overflow: 'hidden',
            background: token.brandGradient,
            boxShadow: token.orbBodyShadow,
            WebkitMaskImage: "url('/icons/chatbot-shape.svg')",
            maskImage: "url('/icons/chatbot-shape.svg')",
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
          }}
        >
          <div
            className="home-orb-rotate"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: token.orbSheen,
              mixBlendMode: 'overlay',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: size * 0.08,
              left: size * 0.15,
              width: size * 0.34,
              height: size * 0.22,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.55)',
              filter: 'blur(8px)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: size * 0.26,
            }}
          >
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  transform: `translate(${pupil.x}px, ${pupil.y}px)`,
                  willChange: 'transform',
                }}
              >
                <div
                  style={{
                    transform: `scaleY(${1 - squint * 0.6}) translateY(${squint * 2}px)`,
                    transformOrigin: 'center',
                    willChange: 'transform',
                  }}
                >
                  <div
                    className="home-orb-blink-eye"
                    style={{
                      width: size * 0.05,
                      height: size * 0.18,
                      borderRadius: 999,
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.92) 100%)',
                      boxShadow:
                        '0 1px 3px rgba(0,0,30,0.18), inset 0 1px 1px rgba(255,255,255,0.9)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAiOrb;
