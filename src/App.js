import { useMemo } from 'react';
import AppRoutes from './routes/Route';
import { buildTheme } from './config/antdTheme';
import useThemeStore from './stores/themeStore';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, App as AntApp } from 'antd';

function App() {
  const dark = useThemeStore((s) => s.dark);

  const future = useMemo(
    () => ({
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    }),
    []
  );

  return (
    <ConfigProvider theme={buildTheme(dark)}>
      <AntApp>
        <BrowserRouter future={future}>
          <AppRoutes />
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
