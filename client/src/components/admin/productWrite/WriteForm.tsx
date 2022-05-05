import { styled } from '@mui/material/styles';
import { Switch } from '@mui/material';
import React from 'react';
import useWrite from './useWrite';
import Select from 'components/common/Select';
import TextField from 'components/common/TextField';
import { grey } from '@mui/material/colors';
import { CategoryProps } from 'modules/category/props';

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
    fontWeight: 500,
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

interface SelectBoxProps {
  label: string;
  name: string;
  category: CategoryProps[];
  onClick: (name: string, category: CategoryProps) => void;
}

const SelectBox = React.memo(
  ({ label, name, category, onClick }: SelectBoxProps) => (
    <>
      {category && (
        <>
          <p>{label}</p>

          <Select
            name={name}
            value={category.filter((data: CategoryProps) => data.check)[0].name}
            menus={category}
            onClick={onClick}
          />
        </>
      )}
    </>
  ),
);

function WriteForm() {
  const {
    writeForm,
    SelectProps,
    unit,
    urlDisabled,
    selectClick,
    textChange,
    urlDisabledClick,
  } = useWrite();
  return (
    <Wrap>
      <form>
        <ul>
          {SelectProps && (
            <FieldStyle>
              <SelectBox
                label="제조사"
                name="manufacture"
                category={SelectProps.manufacture}
                onClick={selectClick}
              />
            </FieldStyle>
          )}
          <FieldStyle>
            <p>제품명</p>
            <TextField
              fullWidth
              name="name"
              value={writeForm.name || ''}
              onChange={textChange}
            />
          </FieldStyle>
          {SelectProps && (
            <FieldStyle>
              <SelectBox
                label="유형"
                name="type"
                category={SelectProps.type}
                onClick={selectClick}
              />
            </FieldStyle>
          )}
          <FieldStyle>
            <p>크기</p>
            <TextField
              fullWidth
              name="size"
              type="number"
              value={writeForm.size || ''}
              placeholder="숫자만 입력하세요."
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
              fullWidth
              name="url"
              value={writeForm.url || ''}
              placeholder="URL을 첨부하려면 클릭하세요."
              disabled={urlDisabled}
              onChange={textChange}
            />
            <Switch
              color="primary"
              checked={Boolean(!urlDisabled)}
              onClick={urlDisabledClick}
            />
          </FieldStyle>
        </ul>
      </form>
    </Wrap>
  );
}

export default WriteForm;
