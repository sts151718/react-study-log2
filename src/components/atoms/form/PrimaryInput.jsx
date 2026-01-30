export const PrimaryInput = (props) => {
  const { type = 'text', value, id = '', onChange } = props;
  return <input type={type} id={id} value={value} onChange={onChange} />;
};
