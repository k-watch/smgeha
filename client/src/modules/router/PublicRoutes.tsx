import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';

// 로그인할 경우 해당 페이지 접근하면 메인 페이지로 이동
const PublicRoutes = (props: any) => {
  const auth = useAuth();

  return auth ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
