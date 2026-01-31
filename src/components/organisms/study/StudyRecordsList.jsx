import { memo } from 'react';
import { StudyRecord } from '../../molecules/study/StudyRecord';
import { LoadingSvg } from '../../atoms/svg/LoadingSvg';

export const StudyRecordsList = memo((props) => {
  const { records, isLoading } = props;
  return (
    <div>
      {isLoading ? (
        <LoadingSvg />
      ) : (
        records.map((rec) => <StudyRecord key={rec.title} title={rec.title} time={rec.time} />)
      )}
    </div>
  );
});
