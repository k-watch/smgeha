import { lightBlue } from '@mui/material/colors';
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { findVisitorsCntWeek } from 'lib/api/common';
import produce from 'immer';
import moment from 'moment';

const options = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
};

let labels = ['일', '월', '화', '수', '목', '금', '토'];

function useVisitorsCount() {
  // 차트 데이터
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: '방문자수',
        borderColor: `${lightBlue[400]}`,
        borderWidth: 3,
        data: [],
      },
    ],
  });
  const [week, setWeek] = useState(0);
  const [date, setDate] = useState('');
  // 날짜 이동 최초 우측 화살표[1]는 disable
  const [dateDir, setDateDir] = useState([false, true]);
  // 방문수 [합계, 평균]
  const [visit, setVisit] = useState([0, 0]);

  const dateMutation = useMutation<[], Error, any>(findVisitorsCntWeek);

  function calDate(day: number) {
    return moment().add(day, 'd').format('YY-MM-DD');
  }

  const getVistorsCnt = useCallback(
    async (day: number) => {
      let prev = moment()
        .add(day - 6, 'd')
        .format();
      let next = moment().add(day, 'd').format();

      await dateMutation.mutateAsync(
        { prev, next },
        {
          onSuccess: (date) => {
            let sum = 0;
            const temp = produce(data, (draft) => {
              draft.datasets[0].data = date;

              const tempLabel = [];
              for (let i = 0; i < 7; i++) {
                tempLabel.push(
                  labels[
                    moment()
                      .add(day - 6 + i, 'd')
                      .day()
                  ],
                );
                sum += date[i];
              }

              draft.labels = tempLabel;
            });

            // 방문자가 없으면 좌측 화살표 disabled
            if (date.length === 0) {
              setDateDir([true, false]);
              sum = 0;
            }

            setData(temp);
            setVisit([sum, Math.floor(sum / 7)]);
          },
        },
      );
    },
    [data, dateMutation],
  );

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
      getVistorsCnt(tempWeek);
    },
    [week, getVistorsCnt],
  );

  useEffect(() => {
    setDate(`${calDate(week - 6)} ~ ${calDate(week)}`);
    getVistorsCnt(week);
  }, []);

  return { options, data, date, dateDir, visit, onClick };
}

export default useVisitorsCount;
