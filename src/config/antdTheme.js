const BRAND_PURPLE = 'rgb(91, 0, 253)';
const BRAND_PURPLE_HOVER = 'rgb(120, 60, 255)';
const DOT_MASK = 'radial-gradient(ellipse 100% 80% at 50% 50%, black 40%, transparent 100%)';

const antdTheme = {
  token: {
    colorPrimary: BRAND_PURPLE,
    colorInfo: BRAND_PURPLE,
    colorLink: BRAND_PURPLE,
    colorLinkHover: BRAND_PURPLE_HOVER,
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#dc2626',

    fontFamily: "'Garet', sans-serif",
    fontSize: 14,
    borderRadius: 8,
    controlHeightLG: 46,

    colorBgContainer: '#ffffff',
    colorBgLayout: '#f3f1ff',

    colorBrandBlue: '#0066ff',
    colorBrandPink: '#ff6ad5',

    pwStrength: ['#ef4444', '#ef4444', '#f59e0b', '#10b981', '#059669'],
    pwCheckOk: '#059669',
    pwCheckOff: '#9ca3af',

    authDarkBase: '#11103a',
    authGradient: [
      'radial-gradient(120% 120% at 22% 18%, rgba(138,79,255,0.95) 0%, rgba(138,79,255,0) 45%)',
      'radial-gradient(110% 110% at 58% 38%, rgba(91,0,253,0.85) 0%, rgba(91,0,253,0) 50%)',
      'radial-gradient(130% 130% at 82% 82%, rgba(37,99,235,0.8) 0%, rgba(37,99,235,0) 55%)',
      'radial-gradient(150% 150% at 18% 92%, rgba(8,8,32,0.95) 0%, rgba(8,8,32,0) 60%)',
      'linear-gradient(135deg, #2a0a5e 0%, #14123e 48%, #0a1140 100%)',
    ].join(', '),
    authSlides: [
      'linear-gradient(180deg, rgba(15,10,30,0) 0%, rgba(15,10,30,0.55) 100%), radial-gradient(at 30% 20%, #5b00fd 0%, transparent 55%), radial-gradient(at 80% 80%, #0066ff 0%, transparent 50%), radial-gradient(at 50% 50%, #ff6ad5 0%, transparent 60%), linear-gradient(135deg, #3a2070 0%, #1a0f3a 60%, #0e0822 100%)',
      'linear-gradient(180deg, rgba(15,10,30,0) 0%, rgba(15,10,30,0.55) 100%), radial-gradient(at 70% 25%, #8b5cf6 0%, transparent 55%), radial-gradient(at 25% 75%, #ec4899 0%, transparent 50%), radial-gradient(at 50% 50%, #5b00fd 0%, transparent 55%), linear-gradient(160deg, #4c1d95 0%, #2e1065 60%, #170a30 100%)',
      'linear-gradient(180deg, rgba(15,10,30,0) 0%, rgba(15,10,30,0.55) 100%), radial-gradient(at 50% 30%, #0066ff 0%, transparent 55%), radial-gradient(at 80% 70%, #5b00fd 0%, transparent 55%), radial-gradient(at 20% 80%, #ff6ad5 0%, transparent 45%), linear-gradient(150deg, #1e1b4b 0%, #312e81 50%, #1a0f3a 100%)',
    ],
    authPanelBg: '#ffffff',
    authPanelOverlay: [
      'radial-gradient(at 30% 20%, rgba(91,0,253,0.10) 0%, transparent 50%)',
      'radial-gradient(at 80% 80%, rgba(0,102,255,0.08) 0%, transparent 50%)',
      'radial-gradient(at 50% 50%, rgba(255,106,213,0.06) 0%, transparent 55%)',
      'radial-gradient(circle, rgba(91,0,253,0.05) 1px, transparent 1.5px)',
    ].join(', '),
    authPanelOverlaySize: 'auto, auto, auto, 32px 32px',
    authOnDark: '#ffffff',
    authDotInactive: 'rgba(255,255,255,0.4)',
    authTitleGradient: 'linear-gradient(135deg, #0a0a0a 0%, #1f2937 50%, #0066ff 100%)',

    dashboardBgBase: '#f4f4f7',
    dashboardBgBaseDark: '#0a0a0c',
    dashboardAuroraLight: [
      'radial-gradient(at 12% 18%, rgba(91,0,253,0.10) 0%, transparent 45%)',
      'radial-gradient(at 88% 12%, rgba(0,102,255,0.09) 0%, transparent 48%)',
      'radial-gradient(at 72% 78%, rgba(255,106,213,0.06) 0%, transparent 50%)',
      'radial-gradient(at 22% 88%, rgba(91,0,253,0.07) 0%, transparent 45%)',
    ].join(', '),
    dashboardAuroraDark: [
      'radial-gradient(at 50% 0%, rgba(255,255,255,0.035) 0%, transparent 55%)',
      'radial-gradient(at 85% 95%, rgba(255,255,255,0.02) 0%, transparent 50%)',
    ].join(', '),
    dashboardDotLight: 'radial-gradient(circle, rgba(91,0,253,0.07) 1px, transparent 1.5px)',
    dashboardDotDark: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1.5px)',
    dashboardDotMask: DOT_MASK,
    dashboardVignetteLight: 'radial-gradient(ellipse 130% 90% at 50% 50%, transparent 45%, rgba(40,10,80,0.10) 100%)',
    dashboardVignetteDark: 'radial-gradient(ellipse 130% 90% at 50% 50%, transparent 45%, rgba(0,0,0,0.45) 100%)',

    loaderHalo: 'radial-gradient(circle, rgba(91,0,253,0.40) 0%, rgba(0,102,255,0.20) 50%, transparent 75%)',
    loaderBar: 'linear-gradient(90deg, #0066ff 0%, #5b00fd 100%)',
    loaderTrack: 'rgba(0,0,0,0.12)',
    loaderTrackDark: 'rgba(255,255,255,0.10)',
    loaderFsBg: '#f5f5f5',
    loaderFsBgDark: '#0d0d0d',
    loaderBlobTL: 'radial-gradient(circle, #5b00fd 0%, transparent 65%)',
    loaderBlobBR: 'radial-gradient(circle, #0066ff 0%, transparent 65%)',
  },
  components: {
    Button: {
      borderRadius: 8,
      controlHeightLG: 46,
      primaryShadow: '0 10px 24px rgba(91,0,253,0.35)',
    },
    Input: {
      borderRadius: 8,
      controlHeightLG: 46,
    },
    Select: {
      controlHeightLG: 46,
      optionSelectedFontWeight: 400,
    },
    Card: {
      borderRadius: 12,
      colorBgContainer: '#ffffff',
    },
    Form: {
      itemMarginBottom: 0,
    },
  },
};

export default antdTheme;
