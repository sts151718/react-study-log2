import { memo } from 'react';

export const SumTime = memo((props) => {
  const { records } = props;
  return (
    <p>
      合計時間：
      {records.reduce((sumTime, rec) => {
        return sumTime + parseInt(rec.time);
      }, 0)}
      / 1000(h)
    </p>
  );
});
