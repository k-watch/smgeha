import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from 'modules/auth/auth';
import { useQuery } from 'react-query';
import { delAuth } from 'modules/auth/auth';
import { store } from 'modules/store';
import { logout } from 'lib/api/auth';
import { getHeaderCategory } from 'lib/api/category';
import { CategoryData } from 'modules/category/state';
import { setProductCode } from 'modules/category/category';
import { useNavigate } from 'react-router-dom';

function useHeader() {
  const auth = useSelector(authSelector);

  const categoryQuery = useQuery<CategoryData[], Error>(
    'headerCategory',
    getHeaderCategory,
    { enabled: false },
  );

  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [menuFlag, setMenuFlag] = useState(false);
  const [searchFlag, setSearchFlag] = useState(false);

  const navigate = useNavigate();

  // 최초 한 번 카테고리 데이터 불러옴
  useEffect(() => {
    categoryQuery.refetch();
  }, []);

  // 카데고리 데이터 세팅
  useEffect(() => {
    if (categoryQuery.data) {
      const categories = categoryQuery.data;

      setCategories([...categories]);
      store.dispatch(setProductCode(Number(categories[0].id)));
    }
  }, [categoryQuery.data]);

  const onHeaderClick = useCallback(
    (id: number) => {
      store.dispatch(setProductCode(id));
      navigate('/');
    },
    [navigate],
  );

  const onLogout = useCallback(async () => {
    // 로그아웃 후 로컬 스토리지와 리덕스 null로 변경
    try {
      await logout();
      localStorage.removeItem('auth');
      store.dispatch(delAuth());
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  }, []);

  return {
    auth,
    categories,
    menuFlag,
    setMenuFlag,
    searchFlag,
    setSearchFlag,
    onHeaderClick,
    navigate,
    onLogout,
  };
}

export default useHeader;
