import { theme } from 'antd';

const HomeBackground = () => {
  const { token } = theme.useToken();
  const layer = { position: 'absolute', inset: 0 };

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} aria-hidden>
      <div style={{ ...layer, backgroundColor: token.homeBgBase }} />
      <div style={{ ...layer, backgroundImage: token.homeAurora }} />
      <div
        style={{
          ...layer,
          backgroundImage: token.homeDot,
          backgroundSize: '28px 28px',
          maskImage: token.dashboardDotMask,
          WebkitMaskImage: token.dashboardDotMask,
        }}
      />
      <div style={{ ...layer, background: token.homeVignette }} />
      <div style={{ position: 'absolute', insetInline: 0, top: 0, height: 128, background: token.homeTopFade }} />
    </div>
  );
};

export default HomeBackground;
