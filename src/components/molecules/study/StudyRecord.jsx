export const StudyRecord = (props) => {
  const { title, time } = props;
  return (
    <>
      <p key={title}>
        {title} {time}時間
      </p>
    </>
  );
};
