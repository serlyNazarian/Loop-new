import { theme } from 'antd';

export default function DashboardBackground({ dark = false }) {
  const { token } = theme.useToken();
  const layer = { position: 'absolute', inset: 0 };

  return (
    <div style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 0 }} aria-hidden>
      <div style={{ ...layer, backgroundColor: dark ? token.dashboardBgBaseDark : token.dashboardBgBase }} />
      <div style={{ ...layer, backgroundImage: dark ? token.dashboardAuroraDark : token.dashboardAuroraLight }} />
      <div
        style={{
          ...layer,
          backgroundImage: dark ? token.dashboardDotDark : token.dashboardDotLight,
          backgroundSize: '28px 28px',
          maskImage: token.dashboardDotMask,
          WebkitMaskImage: token.dashboardDotMask,
        }}
      />
      <div style={{ ...layer, background: dark ? token.dashboardVignetteDark : token.dashboardVignetteLight }} />
    </div>
  );
}
