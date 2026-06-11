import { lazy } from 'react';
import { Result } from 'antd';
import RequireAuth from './RequireAuth';
import { Navigate, Route, Routes } from 'react-router-dom';
import InsideLayout from '../layouts/insideLayout/InsideLayout';
import OutsideLayout from '../layouts/outsideLayout/OutsideLayout';

const Login = lazy(() => import('../pages/auth/login/Login'));
const Register = lazy(() => import('../pages/auth/register/Register'));
const Verify = lazy(() => import('../pages/auth/verify/Verify'));
const Invite = lazy(() => import('../pages/auth/invite/Invite'));
const ForgotPassword = lazy(
  () => import('../pages/auth/forgotPassword/ForgotPassword')
);

const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));

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
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="*"
        element={
          <Result
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
