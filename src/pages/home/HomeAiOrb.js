import { useEffect, useRef, useState } from 'react';
import './Home.css';

const HomeAiOrb = ({ size = 160 }) => {
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
    <div className="home_orb_root" aria-hidden>
      <div className="home_orb_float">
        <div className="home_orb_halo" />
        <div
          ref={orbRef}
          className="home_orb_body"
          style={{
            width: size,
            height: size,
            maskImage: "url('/icons/chatbot-shape.svg')",
            WebkitMaskImage: "url('/icons/chatbot-shape.svg')",
          }}
        >
          <div className="home_orb_sheen" />
          <div
            className="home_orb_highlight"
            style={{
              top: size * 0.08,
              left: size * 0.15,
              width: size * 0.34,
              height: size * 0.22,
            }}
          />
          <div className="home_orb_eyes" style={{ gap: size * 0.26 }}>
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
                    className="home_orb_eye"
                    style={{ width: size * 0.05, height: size * 0.18 }}
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
