import { memo } from 'react';

export const StudyRecord = memo((props) => {
  const { title, time } = props;
  return (
    <>
      <p key={title}>
        {title} {time}時間
      </p>
    </>
  );
});
