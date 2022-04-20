import { bool } from 'joi';
import { login, logout } from 'lib/api/auth';
import { LoginState } from 'modules/auth/state';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

interface LoginCheckData {
  [index: string]: boolean;
  id: boolean;
  password: boolean;
}

function useLogin() {
  const loginMutation = useMutation(login);
  const logoutMutation = useMutation(logout);
  const navigate = useNavigate();

  const [error, setError] = useState<string>('');

  const [form, setForm] = useState<LoginState>({
    id: '',
    password: '',
  });

  const [check, setCheck] = useState<LoginCheckData>({
    id: false,
    password: false,
  });
  const { register, handleSubmit } = useForm<any>();

  const onChange = (e: any) => {
    const { value, name } = e.target;

    check[name] = value === '' ? true : false;

    setCheck({ ...check });
    setError('');
  };

  const checkInput = () => {
    check.id = form.id === '' ? true : false;
    check.password = form.password === '' ? true : false;

    setCheck({ ...check });

    return [form.id, form.password].includes('');
  };

  const onSubmit = async (data: any) => {
    data.preventDefault();

    if (checkInput()) {
      return;
    }

    const { id, password } = data;

    await loginMutation.mutateAsync(
      { id, password },
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

  return {
    form,
    setForm,
    check,
    error,
    onChange,
    handleSubmit,
    onSubmit,
    register,
    onLogout,
  };
}

export default useLogin;
