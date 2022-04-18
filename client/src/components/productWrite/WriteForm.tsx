import { styled } from '@mui/material/styles';
import { Box, Button, Chip, Grid, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import useWrite, { CateogryData } from './useWrite';
import Select from 'components/common/Select';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const FontStyle = styled('span')(() => ({
  fontWeight: '700',
}));

function WriteForm() {
  const { handleClick, chipData, typeSelectData, manuSelectData, onClick } =
    useWrite();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  const { control, register, handleSubmit } = useForm<any>();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {chipData.map((chip: CateogryData) => (
          <ListItem key={chip.id}>
            <Chip
              label={chip.name}
              onClick={() => handleClick(chip.id)}
              variant={chip.check === true ? 'filled' : 'outlined'}
            />
          </ListItem>
        ))}

        <Grid item={true} sm={4}>
          <FontStyle>프린터명</FontStyle>
          {manuSelectData.length > 0 && (
            <Select
              name="manufacture"
              value={manuSelectData[0].name}
              label="제품"
              categories={manuSelectData}
              onClick={onClick}
            />
          )}
        </Grid>
        <Grid item={true} sm={4}>
          <TextField {...register('name')} name="name" placeholder="제품명" />
        </Grid>
        <Box>
          {typeSelectData.length > 0 && (
            <Select
              name="manufacture"
              value={typeSelectData[0].name}
              label="제품"
              categories={typeSelectData}
              onClick={onClick}
            />
          )}
        </Box>
        <Box>
          <TextField name="size" placeholder="가나다" />
        </Box>
        <Box>
          <TextField name="image" placeholder="이미지" />
        </Box>
        <Box>
          <TextField name="url" placeholder="URL" />
        </Box>
        <Button type="submit">저장</Button>
      </form>
      {/* <Button onClick={onLogout}>로그아웃</Button>
    {error && <Box>{error}</Box>} */}
    </>
  );
}

export default WriteForm;
