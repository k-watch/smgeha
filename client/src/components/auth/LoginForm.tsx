import styled from '@emotion/styled';
import { Checkbox, Grid } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import Button from 'components/common/Button';
import TextField from 'components/common/TextField';
import useLogin from './useLogin';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import React from 'react';

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 800px;
  height: 100vh;

  .loginTextWrap {
    text-align: center;
    margin: 70px 0;
    font-size: 30px;
    font-weight: 500;
    color: ${grey[600]};
  }

  .idCheckWrap {
    display: flex;
    align-items: center;
    font-size: 15px;

    .MuiCheckbox-root {
      padding-left: 0;
    }
  }

  .errorTextWrap {
    text-align: center;
    margin-top: 20px;
    color: ${red[700]};
  }

  button {
    margin-top: 40px;
  }
`;

function LoginForm() {
  const {
    form,
    setForm,
    check,
    error,
    onChange,
    handleSubmit,
    onSubmit,
    register,
    onLogout,
  } = useLogin();
  return (
    <Wrap>
      <form onSubmit={onSubmit}>
        <div className="loginTextWrap">로그인</div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              error={check.id}
              name="id"
              placeholder="아이디를 입력하세요."
              fullWidth
              inputProps={{ maxLength: 24 }}
              helperText={check.id ? '아이디를 입력하세요.' : ''}
              onChange={onChange}
              onInput={(e: any) => setForm({ ...form, id: e.target.value })}
            />
            <div className="idCheckWrap">
              <Checkbox
                disableRipple
                icon={<CheckCircleOutlineOutlinedIcon color="disabled" />}
                checkedIcon={<CheckCircleIcon />}
              />
              <span>아이디 저장</span>
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={check.password}
              name="password"
              placeholder="비밀번호를 입력하세요."
              fullWidth
              type="password"
              inputProps={{ maxLength: 24 }}
              helperText={
                check.password === true ? '비밀번호를 입력하세요.' : ''
              }
              onChange={onChange}
              onInput={(e: any) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </Grid>
        </Grid>
        {error && <div className="errorTextWrap">{error}</div>}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          size="large"
        >
          로그인
        </Button>
      </form>
    </Wrap>
  );
}

export default LoginForm;
