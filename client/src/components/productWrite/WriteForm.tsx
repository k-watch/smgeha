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
    right: 15,
    width: 30,
    padding: '15px 0',
    backgroundColor: 'white',
    textAlign: 'right',
    color: `${grey[600]}`,
  },

  '& .MuiSwitch-switchBase': {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

const SelectBox = React.memo(({ label, name, list, onClick }: any) => (
  <>
    {list && (
      <>
        <p>{label}</p>

        <Select
          name={name}
          value={list.filter((data: any) => data.check)[0].name}
          menus={list}
          onClick={onClick}
        />
      </>
    )}
  </>
));

function WriteForm() {
  const {
    selectData,
    unit,
    urlDisabled,
    selectClick,
    textChange,
    urlDisabledClick,
  } = useWrite();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <Wrap>
      <form onSubmit={onSubmit}>
        <ul>
          {selectData && (
            <FieldStyle>
              <SelectBox
                label="제조사"
                name="manufacture"
                list={selectData.manufacture}
                onClick={selectClick}
              />
            </FieldStyle>
          )}
          <FieldStyle>
            <p>제품명</p>
            <TextField name="name" fullWidth onChange={textChange} />
          </FieldStyle>
          {selectData && (
            <FieldStyle>
              <SelectBox
                label="유형"
                name="type"
                list={selectData.type}
                onClick={selectClick}
              />
            </FieldStyle>
          )}
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
              onChange={textChange}
            />
            {unit && <p className={'unit'}>{unit}</p>}
          </FieldStyle>
          <FieldStyle>
            <p>URL</p>
            <TextField
              name="url"
              placeholder="URL을 첨부하려면 클릭하세요."
              disabled={urlDisabled}
              fullWidth
              onChange={textChange}
            />
            <Switch color="primary" onClick={urlDisabledClick} />
          </FieldStyle>
        </ul>
        <Button type="submit">저장</Button>
      </form>
    </Wrap>
  );
}

export default WriteForm;
