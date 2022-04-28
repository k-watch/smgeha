import Button from 'components/common/Button';
import React from 'react';
import useWriteBtn from './useWriteBtn';

function WriteBtn() {
  const { onClick } = useWriteBtn();
  return (
    <>
      <Button onClick={onClick}>저장</Button>
    </>
  );
}

export default WriteBtn;
