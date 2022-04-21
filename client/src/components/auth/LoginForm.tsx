import { styled } from '@mui/system';
import { Checkbox, Grid } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import Button from 'components/common/Button';
import TextField from 'components/common/TextField';
import useLogin from './useLogin';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const Wrap = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  maxWidth: '800px',
  height: '100vh',
  margin: '0 auto',

  '& .loginTextWrap': {
    margin: '70px 0',
    textAlign: 'center',
    fontSize: '2.125rem',
    fontWeight: '500',
    color: `${grey[600]}`,
  },

  '& .idCheckWrap': {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.9375rem',

    '& .MuiCheckbox-root': {
      paddingLeft: 0,
    },
  },

  '& .errorTextWrap': {
    marginTop: '20px',
    textAlign: 'center',
    color: `${red[700]}`,
  },

  '& button': {
    marginTop: '40px',
  },
}));

function LoginForm() {
  const {
    form,
    setForm,
    check,
    error,
    isRemember,
    handleChange,
    onChange,
    onSubmit,
  } = useLogin();

  return (
    <Wrap>
      <form onSubmit={onSubmit}>
        <div className="loginTextWrap">로그인</div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              value={form.userId}
              name="userId"
              placeholder="아이디를 입력하세요."
              fullWidth
              inputProps={{ maxLength: 24 }}
              error={check.userId}
              helperText={check.userId ? '아이디를 입력하세요.' : ''}
              onChange={onChange}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, userId: e.target.value })
              }
            />
            <div className="idCheckWrap">
              <Checkbox
                disableRipple
                icon={<CheckCircleOutlineOutlinedIcon color="disabled" />}
                checkedIcon={<CheckCircleIcon />}
                checked={isRemember}
                onChange={handleChange}
              />
              <span>아이디 저장</span>
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              placeholder="비밀번호를 입력하세요."
              type="password"
              fullWidth
              inputProps={{ maxLength: 24 }}
              error={check.password}
              helperText={check.password ? '비밀번호를 입력하세요.' : ''}
              onChange={onChange}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </Grid>
        </Grid>
        {error && <div className="errorTextWrap">{error}</div>}
        <Button
          variant="contained"
          type="submit"
          fullWidth
          size="large"
          color="primary"
        >
          로그인
        </Button>
      </form>
    </Wrap>
  );
}

export default LoginForm;
