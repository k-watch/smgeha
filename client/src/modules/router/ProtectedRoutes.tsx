import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';

// 로그인이 필요한 페이지로 접근할 경우 로그인 페이지로
const ProtectedRoutes = (props: any) => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
