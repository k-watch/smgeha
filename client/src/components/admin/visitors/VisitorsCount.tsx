import { grey, lightBlue } from '@mui/material/colors';
import { styled } from '@mui/system';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { IconButton } from '@mui/material';
import useVisitorsCount from './useVisitorsCount';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Wrap = styled('div')(({ theme }) => ({
  maxWidth: '100%',
  margin: '40px 0',

  [theme.breakpoints.down('md')]: {
    height: 'auto',
  },
}));

const DateWrap = styled('ul')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 20,
  padding: 10,
  border: `1px solid ${grey[200]}`,
  fontSize: '1.125rem',
  textAlign: 'center',
}));

const CanvasWrap = styled('div')(({ theme }) => ({
  padding: 20,
  border: `1px solid ${grey[200]}`,

  '& .emptyData': {
    marginBottom: 0,
  },

  p: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: '1.25rem',

    span: {
      fontWeight: 500,
      color: `${lightBlue[400]}`,
    },

    [theme.breakpoints.down('md')]: {
      fontSize: '0.9375rem',
    },
  },
}));

function VisitorsCount() {
  const { options, data, date, dateDir, visit, onClick } = useVisitorsCount();

  return (
    <Wrap>
      <DateWrap>
        <li>
          <IconButton disabled={dateDir[0]} onClick={() => onClick('prev')}>
            <ArrowLeftIcon />
          </IconButton>
        </li>
        <li> {date}</li>
        <li>
          <IconButton disabled={dateDir[1]} onClick={() => onClick('next')}>
            <ArrowRightIcon />
          </IconButton>
        </li>
      </DateWrap>
      <CanvasWrap>
        {data.datasets[0].data.length === 0 ? (
          <>
            <p className="emptyData">
              홈페이지 방문 데이터가 존재하지 않습니다.
            </p>
          </>
        ) : (
          <>
            <p>
              한 주간 홈페이지 방문은 <span>{visit[0]}회</span>, 일 평균{' '}
              <span>{visit[1]}회</span> 입니다.
            </p>
            <Line options={options} data={data} />
          </>
        )}
      </CanvasWrap>
    </Wrap>
  );
}

export default VisitorsCount;
