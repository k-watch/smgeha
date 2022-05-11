import { styled } from '@mui/system';
import { Drawer, InputAdornment } from '@mui/material';
import { useMutation } from 'react-query';
import { ProductsData } from 'modules/products/state';
import { useCallback, useEffect, useState } from 'react';
import { store } from 'modules/store';
import { setSearchProducts } from 'modules/products/products';
import { findOneProductByName } from 'lib/api/products';
import TextField from './TextField';
import SearchIcon from '@mui/icons-material/Search';

const Wrap = styled('div')(({ theme }) => ({
  margin: '0 auto',
  padding: '20px 0',

  '& .MuiOutlinedInput-root': {
    width: 300,
    height: 50,

    '&.MuiOutlinedInput-root': {
      borderRadius: 6,
    },

    '& .MuiInputAdornment-root ': {
      marginLeft: 'auto',
      marginRight: 10,
      cursor: 'pointer',
    },
  },
}));

// 검색창 Drawer 관련 Props
interface SearchProps {
  searchFlag: boolean;
  setSearchFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

function Search({ searchFlag, setSearchFlag }: SearchProps) {
  const searchProductsMutation = useMutation<ProductsData[], Error, string>(
    findOneProductByName,
  );

  const [name, setName] = useState('');

  const onSearch = useCallback(async () => {
    if (name === '') return;

    await searchProductsMutation.mutateAsync(name, {
      onSuccess: (data) => {
        store.dispatch(setSearchProducts(data));
      },
      onError: (e) => {
        console.log(e);
      },
    });
  }, [name, searchProductsMutation]);

  useEffect(() => {
    setName('');
  }, [searchFlag]);

  return (
    <Drawer anchor="top" open={searchFlag} onClose={() => setSearchFlag(false)}>
      <Wrap>
        <TextField
          value={name}
          placeholder="검색어를 입력하세요."
          onChange={(e) => setName(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearch();
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <SearchIcon onClick={onSearch} />
              </InputAdornment>
            ),
          }}
        />
      </Wrap>
    </Drawer>
  );
}

export default Search;
