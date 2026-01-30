export const ErrorMessage = (props) => {
  const { children } = props;
  return children === '' || <p>{children}</p>;
};
