import { styled } from '@mui/material/styles';
import { Box, Grid, Switch } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import useWrite, { CateogryData } from './useWrite';
import Select from 'components/common/Select';
import TextField from 'components/common/TextField';
import Button from 'components/common/Button';
import Chip from 'components/common/Chip';
import { grey } from '@mui/material/colors';

const Wrap = styled('div')(() => ({
  '& ul': {
    '& li:last-of-type': {
      '& .MuiFormControl-root': {
        marginLeft: 36,
      },
    },
  },
}));

const FieldStyle = styled('li')(() => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  padding: '20px 0',

  '& p': {
    width: 60,
    fontWeight: '500',
  },

  '& .MuiFormControl-root': {
    marginLeft: 30,
  },

  '& .unit': {
    position: 'absolute',
    right: 10,
    width: 20,
    padding: '15px 0',
    backgroundColor: 'white',
    color: `${grey[600]}`,
  },

  '& .MuiSwitch-switchBase': {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

function WriteForm() {
  const {
    typeSelectData,
    manuSelectData,
    urlDisabled,
    setUrlDisabled,
    onClick,
  } = useWrite();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Wrap>
      <form onSubmit={onSubmit}>
        <ul>
          <FieldStyle>
            <p>제조사</p>
            {manuSelectData.length > 0 && (
              <Select
                name="manufacture"
                value={manuSelectData[0].name}
                menus={manuSelectData}
                onClick={onClick}
              />
            )}
          </FieldStyle>
          <FieldStyle>
            <p>제품명</p>
            <TextField name="name" fullWidth />
          </FieldStyle>
          <FieldStyle>
            <p>유형</p>
            {typeSelectData.length > 0 && (
              <Select
                name="manufacture"
                value={typeSelectData[0].name}
                menus={typeSelectData}
                onClick={onClick}
              />
            )}
          </FieldStyle>
          <FieldStyle>
            <p>크기</p>
            <TextField
              name="size"
              type="number"
              placeholder="숫자만 입력하세요."
              fullWidth
              inputProps={{
                maxLength: 10,
                step: '1',
              }}
            />
            <p className={'unit'}>L</p>
          </FieldStyle>
          <FieldStyle>
            <p>URL</p>
            <TextField
              name="url"
              placeholder="URL을 첨부하려면 클릭하세요."
              disabled={urlDisabled}
              fullWidth
            />
            <Switch
              color="primary"
              onClick={() => setUrlDisabled(() => !urlDisabled)}
            />
          </FieldStyle>
        </ul>
        <Button type="submit">저장</Button>
      </form>
    </Wrap>
  );
}

export default WriteForm;
