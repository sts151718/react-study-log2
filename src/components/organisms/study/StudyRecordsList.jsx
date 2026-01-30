import { memo } from 'react';
import { StudyRecord } from '../../molecules/study/StudyRecord';

export const StudyRecordsList = memo((props) => {
  const { records } = props;
  return (
    <div>
      {records.map((rec) => (
        <StudyRecord key={rec.title} title={rec.title} time={rec.time} />
      ))}
    </div>
  );
});
