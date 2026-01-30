export const StudyRecords = (props) => {
  const { records } = props;
  return (
    <>
      {records.map((rec) => (
        <p key={rec.title}>
          {rec.title} {rec.time}時間
        </p>
      ))}
    </>
  );
};
