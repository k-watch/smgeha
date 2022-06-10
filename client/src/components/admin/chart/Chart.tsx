import { lightBlue } from '@mui/material/colors';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Wrap = styled('div')(() => ({
  width: '100vw',
  maxWidth: 900,
}));

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // label 숨기기
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
            stepSize: 0, // 스케일에 대한 사용자 고정 정의 값
          },
        },
      ],
    },
    maintainAspectRatio: false, // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: '방문자수',
      borderColor: `${lightBlue[400]}`,
      borderWidth: 2,
      data: [5, 7, 3, 5, 2, 10, 3],
    },
  ],
};

function Chart() {
  return (
    <Wrap>
      <Line options={options} data={data} />
    </Wrap>
  );
}

export default Chart;
