import styled from 'styled-components';
import { BaseButton } from './BaseButton';

export const PrimaryButton = (props) => {
  const { onClick, children } = props;

  return <SButton onClick={onClick}>{children}</SButton>;
};

const SButton = styled(BaseButton)`
  background-color: blue;
  color: #fff;
`;
