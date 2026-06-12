import './i18n/i18n';
import { useMemo } from 'react';
import enUS from 'antd/locale/en_US';
import arEG from 'antd/locale/ar_EG';
import AppRoutes from './routes/Route';
import { useTranslation } from 'react-i18next';
import { buildTheme } from './config/antdTheme';
import useThemeStore from './stores/themeStore';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, App as AntApp } from 'antd';

function App() {
  const { i18n } = useTranslation();

  const dark = useThemeStore((s) => s.dark);

  const rtl = i18n.language === 'ar';

  const future = useMemo(
    () => ({
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    }),
    []
  );

  return (
    <ConfigProvider
      theme={buildTheme(dark)}
      locale={rtl ? arEG : enUS}
      direction={rtl ? 'rtl' : 'ltr'}
    >
      <AntApp>
        <BrowserRouter future={future}>
          <AppRoutes />
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
