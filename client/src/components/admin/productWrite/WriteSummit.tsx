import Button from 'components/common/Button';
import React from 'react';
import useWriteBtn from './useWriteSummit';

function WriteSummit() {
  const { id, onClick } = useWriteBtn();
  return (
    <>
      {id ? (
        <Button onClick={onClick}>수정</Button>
      ) : (
        <Button onClick={onClick}>저장</Button>
      )}
    </>
  );
}

export default WriteSummit;
