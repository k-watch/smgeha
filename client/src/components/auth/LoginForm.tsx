import { Button, TextField } from '@mui/material';
import React from 'react';
import useLogin from './useLogin';

function LoginForm() {
  const { error, handleSubmit, onSubmit, register, onLogout } = useLogin();
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('email')}
          required
          name="email"
          placeholder="이메일"
        />
        <TextField
          {...register('password')}
          required
          name="password"
          placeholder="비밀번호"
        />
        <Button type="submit">로그인</Button>
      </form>
      <Button onClick={onLogout}>로그아웃</Button>
      {error && <div>{error}</div>}
    </>
  );
}

export default LoginForm;
