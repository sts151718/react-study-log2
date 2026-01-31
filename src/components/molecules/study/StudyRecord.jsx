import { memo } from 'react';
import styled from 'styled-components';
import { AlertButton } from '../../atoms/button/AlertButton';

export const StudyRecord = memo((props) => {
  const { title, time, onClickDelete } = props;
  return (
    <SContainer>
      <span>
        {title} {time}時間
      </span>
      <AlertButton onClick={onClickDelete}>削除</AlertButton>
    </SContainer>
  );
});

const SContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
