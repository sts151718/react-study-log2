export const StudyInput = (props) => {
  const { label, value, onChange, id, type = 'text' } = props;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} value={value} onChange={onChange} />
    </div>
  );
};
