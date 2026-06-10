import AppRoutes from './routes/Route';
import antdTheme from './config/antdTheme';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, App as AntApp } from 'antd';

function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <AntApp>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
