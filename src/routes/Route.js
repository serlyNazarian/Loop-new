import { lazy, Suspense } from 'react';
import RequireAuth from './RequireAuth';
import Dashboard from '../pages/dashboard/Dashboard';
import MyResult from '../components/myResult/MyResult';
import MyLoader from '../components/myLoader/MyLoader';
import { Navigate, Route, Routes } from 'react-router-dom';
import InsideLayout from '../layouts/insideLayout/InsideLayout';
import OutsideLayout from '../layouts/outsideLayout/OutsideLayout';

const Login = lazy(() => import('../pages/auth/login/Login'));
const Register = lazy(() => import('../pages/auth/register/Register'));
const Verify = lazy(() => import('../pages/auth/verify/Verify'));
const Invite = lazy(() => import('../pages/auth/invite/Invite'));
const Home = lazy(() => import('../pages/home/Home'));
const Calendar = lazy(() => import('../pages/dashboard/calendar/Calendar'));
const ForgotPassword = lazy(
  () => import('../pages/auth/forgotPassword/ForgotPassword')
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* ── Public / auth ─────────────────────────────────────────── */}
      <Route element={<OutsideLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="verify" element={<Verify />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="invite/:token" element={<Invite />} />
      </Route>

      {/* ── Authenticated app ─────────────────────────────────────── */}
      <Route element={<RequireAuth />}>
        <Route element={<InsideLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/calendar" element={<Calendar />} />
          {/* Feature pages plug in here as you rebuild them, e.g.:
          <Route path="dashboard/conversations" element={<Conversations />} />
          <Route path="dashboard/contacts" element={<Contacts />} />
          <Route path="dashboard/ai-agents" element={<AiAgents />} />
          <Route path="dashboard/email/:id" element={<EmailThread />} />
          <Route path="dashboard/settings" element={<SettingsLayout />}>
            <Route index element={<Settings />} />
            <Route path="profile" element={<SettingsProfile />} />
          </Route> */}
        </Route>
      </Route>

      {/* ── Redirects + catch-all ─────────────────────────────────── */}
      <Route
        path="home"
        element={
          <Suspense fallback={<MyLoader fullScreen />}>
            <Home />
          </Suspense>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="*"
        element={
          <MyResult
            status="404"
            title="Page not found"
            subTitle="The page you're looking for doesn't exist."
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
