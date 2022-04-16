import { login, logout } from 'lib/api/auth';
import { LoginState } from 'modules/auth/state';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

function useLogin() {
  const loginMutation = useMutation(login);
  const logoutMutation = useMutation(logout);
  const navigate = useNavigate();

  const [error, setError] = useState<string>('');

  const { register, handleSubmit } = useForm<any>();

  const onSubmit = async (data: LoginState) => {
    const { email, password } = data;

    await loginMutation.mutateAsync(
      { email, password },
      {
        onSuccess: (data) => {
          navigate('/login');
          try {
            localStorage.setItem('auth', JSON.stringify(data));
          } catch (e) {
            console.log('localStorage is not working');
          }
        },
        onError: (error) => {
          console.log(error);
          setError('아이디 혹은 비밀번호가 일치하지 않습니다.');
        },
      },
    );
  };

  const onLogout = () => {
    try {
      logoutMutation.mutate();
      localStorage.removeItem('auth');
    } catch (e) {
      console.log(e);
    }
  };

  return { error, handleSubmit, onSubmit, register, onLogout };
}

export default useLogin;
