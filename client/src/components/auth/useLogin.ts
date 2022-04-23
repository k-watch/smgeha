import { login } from 'lib/api/auth';
import { LoginState } from 'modules/auth/state';
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

interface LoginCheckData {
  [index: string]: boolean;
  userId: boolean;
  password: boolean;
}

function useLogin() {
  const loginMutation = useMutation(login);
  const navigate = useNavigate();
  // 아이디 저장용 쿠키
  const [cookies, setCookie, removeCookie] = useCookies(['userId']);

  const [form, setForm] = useState<LoginState>({
    userId: '',
    password: '',
  });
  // 텍스트 필드 에러 표기용
  const [check, setCheck] = useState<LoginCheckData>({
    userId: false,
    password: false,
  });
  // 버튼 위 표기할 에러 문구
  const [error, setError] = useState('');
  // 아이디 저장
  const [isRemember, setIsRemember] = useState(false);

  useEffect(() => {
    if (cookies.userId) {
      setForm({ ...form, userId: cookies.userId });
      setIsRemember(true);
    }
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;

      setIsRemember(checked);

      if (checked) {
        setCookie('userId', form.userId, { maxAge: 24 });
      } else {
        removeCookie('userId');
      }
    },
    [form.userId, setCookie, removeCookie],
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target;

      check[name] = value === '' ? true : false;

      if (isRemember && name === 'userId') {
        setCookie('userId', value, { maxAge: 24 });
      }

      setCheck({ ...check });
      // 텍스트 필드에 글자 입력 시 버튼 위 에러 문구 초기화
      setError('');
    },
    [check, isRemember, setCookie],
  );

  const checkInput = () => {
    check.userId = form.userId === '' ? true : false;
    check.password = form.password === '' ? true : false;

    setCheck({ ...check });

    return [form.userId, form.password].includes('');
  };

  const onSubmit = async (data: React.FormEvent<HTMLFormElement>) => {
    data.preventDefault();

    // 텍스트 필드 모두에 글자가 있을 때 submit
    if (checkInput()) {
      return;
    }

    const { userId, password } = form;

    await loginMutation.mutateAsync(
      { userId, password },
      {
        onSuccess: (data) => {
          try {
            localStorage.setItem('auth', JSON.stringify(data));
            navigate('/');
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

  return {
    form,
    setForm,
    check,
    error,
    isRemember,
    handleChange,
    onChange,
    onSubmit,
  };
}

export default useLogin;
