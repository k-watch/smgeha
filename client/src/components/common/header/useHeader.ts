import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from 'modules/auth/auth';
import { useMutation } from 'react-query';
import { delAuth } from 'modules/auth/auth';
import { store } from 'modules/store';
import { logout } from 'lib/api/auth';

function useHeader() {
  const auth = useSelector(authSelector);
  const logoutMutation = useMutation(logout);

  // 헤더 fixed 를 위한 value
  const [scrollY, setScrollY] = useState(0);
  const [scrollActive, setScrollActive] = useState(true);

  function handleScroll() {
    // 스크롤이 내려가면 헤더를 fixed로 변환
    if (scrollY <= 30) {
      setScrollY(window.pageYOffset);
      setScrollActive(true);
    } else {
      setScrollY(window.pageYOffset);
      setScrollActive(false);
    }
  }

  // 스크롤 이벤트 생성
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onLogout = useCallback(() => {
    // 로그아웃 후 로컬 스토리지와 리덕스 null로 변경
    try {
      logoutMutation.mutate();
      localStorage.removeItem('auth');
      store.dispatch(delAuth());
    } catch (e) {
      console.log(e);
    }
  }, [logoutMutation]);

  return { auth, scrollActive, onLogout };
}

export default useHeader;
