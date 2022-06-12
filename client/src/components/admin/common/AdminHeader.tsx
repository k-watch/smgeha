import { styled } from '@mui/system';
import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import ProductList from '../products/ProductList';
import ProductHeader from './ProductHeader';
import VisitorsCount from '../visitors/VisitorsCount';

const Wrap = styled('div')({
  '& .MuiTabs-root': {
    marginBottom: 20,
  },

  '& .MuiTab-root': {
    fontSize: 16,
    fontWeight: 400,
  },
  '& .Mui-selected': {
    fontWeight: 500,
  },
});

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div hidden={value !== index}>{value === index && <>{children}</>}</div>
  );
}

function MenuHeader() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Wrap>
      <div>
        <Tabs value={value} onChange={handleChange}>
          <Tab disableRipple label="방문자 통계" />
          <Tab disableRipple label="제품 보기" />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <VisitorsCount />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProductHeader />
        <ProductList />
      </TabPanel>
    </Wrap>
  );
}

export default MenuHeader;
