import { PrimaryInput } from '../../atoms/form/PrimaryInput';

export const StudyInput = (props) => {
  const { label, value, type = 'text', onChange, id } = props;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <PrimaryInput type={type} id={id} value={value} onChange={onChange} />
    </div>
  );
};
