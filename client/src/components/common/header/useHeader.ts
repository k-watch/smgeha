import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from 'modules/auth/auth';
import { useMutation, useQuery } from 'react-query';
import { delAuth } from 'modules/auth/auth';
import { store } from 'modules/store';
import { logout } from 'lib/api/auth';
import { getHeaderCategory } from 'lib/api/category';
import { CategoryData } from 'modules/category/state';
import { setProductCode } from 'modules/category/category';

function useHeader() {
  const auth = useSelector(authSelector);

  const categoryQuery = useQuery<CategoryData[], Error>(
    'headerCategory',
    getHeaderCategory,
    {},
  );
  const logoutMutation = useMutation(logout);

  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [drawerFlag, setDrawerFlag] = useState(false);

  const onClick = useCallback((id: number) => {
    store.dispatch(setProductCode(id));
  }, []);

  useEffect(() => {
    if (categoryQuery.data) {
      const categories = categoryQuery.data;

      setCategories([...categories]);
      store.dispatch(setProductCode(Number(categories[0].id)));
    }
  }, [categoryQuery.data]);

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

  return { auth, categories, onClick, onLogout, drawerFlag, setDrawerFlag };
}

export default useHeader;
