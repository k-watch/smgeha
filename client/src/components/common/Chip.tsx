import { styled } from '@mui/material/styles';
import { Chip as MuiChip, ChipProps } from '@mui/material';
import { grey } from '@mui/material/colors';

const ChipStyle = styled(MuiChip)(({ theme }) => ({
  '&.MuiChip-root': {
    height: 40,
    borderRadius: 19,

    '& .MuiChip-label': {
      padding: '0 18px',
      fontSize: '0.9375rem',
      fontWeight: 700,
    },
  },
  '&.MuiChip-filled': {
    backgroundColor: `${grey[800]}`,
    color: 'white',
  },
}));

function Chip(props: ChipProps) {
  return <ChipStyle {...props} />;
}

export default Chip;
