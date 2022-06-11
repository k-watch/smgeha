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
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useCallback, useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { useMutation } from 'react-query';
import { findVisitorsCntWeek } from 'lib/api/common';
import produce from 'immer';

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

let labels = ['일', '월', '화', '수', '목', '금', '토'];

function Chart() {
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: '방문자수',
        borderColor: `${lightBlue[400]}`,
        borderWidth: 2,
        data: [5, 7, 3, 5, 2, 10, 3],
      },
    ],
  });
  const [week, setWeek] = useState(0);
  const [date, setDate] = useState('');
  const [dateDir, setDateDir] = useState([false, true]);
  const dateMutation = useMutation<[], Error, any>(findVisitorsCntWeek);

  function calDate(num: number) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const dayOfWeek = now.getDay();

    const result = new Date(year, month, day + (num - dayOfWeek));
    const yyyy = result.getFullYear();
    const mm = Number(result.getMonth()) + 1;
    const dd = result.getDate();

    return String(yyyy).substring(2, 4) + '.' + mm + '.' + dd;
  }

  const onClick = useCallback(
    async (dir: string) => {
      const tempWeek = dir === 'prev' ? week - 7 : week + 7;

      if (tempWeek === 0 && dir === 'next') {
        setDateDir([false, true]);
      } else {
        setDateDir([false, false]);
      }

      setDate(`${calDate(tempWeek - 6)} ~ ${calDate(tempWeek)}`);
      setWeek(tempWeek);

      let prev = new Date(
        new Date().setDate(new Date().getDate() + tempWeek - 5),
      );
      let next = new Date(
        new Date().setDate(new Date().getDate() + tempWeek + 1),
      );

      await dateMutation.mutateAsync(
        { prev, next },
        {
          onSuccess: (date) => {
            const temp = produce(data, (draft) => {
              draft.datasets[0].data = date;

              const tempLabel = [];
              for (let i = 0; i < 7; i++) {
                tempLabel.push(
                  labels[
                    new Date(
                      new Date().setDate(
                        new Date().getDate() + tempWeek - 6 + i,
                      ),
                    ).getDay()
                  ],
                );
              }

              draft.labels = tempLabel;
            });

            setData(temp);
          },
        },
      );
    },
    [week],
  );

  useEffect(() => {
    setDate(`${calDate(week - 6)} ~ ${calDate(week)}`);
  }, []);

  return (
    <Wrap>
      <div>
        <IconButton disabled={dateDir[0]} onClick={() => onClick('prev')}>
          <ArrowLeftIcon />
        </IconButton>
        {date}
        <IconButton disabled={dateDir[1]} onClick={() => onClick('next')}>
          <ArrowRightIcon />
        </IconButton>
      </div>
      <Line options={options} data={data} />
    </Wrap>
  );
}

export default Chart;
