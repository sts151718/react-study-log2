import styled from 'styled-components';
import { BaseButton } from './BaseButton';

export const AlertButton = (props) => {
  const { onClick, children } = props;

  return <SButton onClick={onClick}>{children}</SButton>;
};

const SButton = styled(BaseButton)`
  background-color: red;
  color: #fff;
`;
