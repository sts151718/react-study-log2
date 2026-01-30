export const BaseButton = (props) => {
  const { onClick, children } = props;
  return <button onClick={onClick}>{children}</button>;
};
