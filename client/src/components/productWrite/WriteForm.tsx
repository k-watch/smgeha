import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

function WriteForm() {
  const onSubmit = () => {};
  return (
    <>
      <form onSubmit={onSubmit}>
        <Box>
          <TextField required name="type" placeholder="유형" />
        </Box>
        <Box>
          <TextField required name="name" placeholder="제품명" />
        </Box>
        <Box>
          <TextField required name="manufacture" placeholder="제조사" />
        </Box>
        <Box>
          <TextField required name="size" placeholder="크기" />
        </Box>
        <Box>
          <TextField required name="image" placeholder="이미지" />
        </Box>
        <Box>
          <TextField required name="url" placeholder="URL" />
        </Box>
        <Button type="submit">저장</Button>
      </form>
      {/* <Button onClick={onLogout}>로그아웃</Button>
    {error && <Box>{error}</Box>} */}
    </>
  );
}

const Box = styled.div`
  margin: 30px;
`;

export default WriteForm;
