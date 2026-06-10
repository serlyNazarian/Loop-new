import { useEffect } from 'react';
import useAuthStore from '../stores/authStore';
import MyLoader from '../components/myLoader/MyLoader';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function RequireAuth() {
  const status = useAuthStore((s) => s.status);
  const fetchMe = useAuthStore((s) => s.fetchMe);
  const location = useLocation();

  useEffect(() => {
    if (status === 'idle') fetchMe().catch(() => {});
  }, [status, fetchMe]);

  if (status === 'idle' || status === 'loading') {
    return <MyLoader fullScreen message="Loading…" />;
  }

  if (status === 'guest') {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
