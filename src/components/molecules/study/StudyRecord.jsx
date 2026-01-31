import { memo } from 'react';
import styled from 'styled-components';
import { BaseButton } from '../../atoms/button/BaseButton';

export const StudyRecord = memo((props) => {
  const { title, time, onClickDelete } = props;
  return (
    <SContainer>
      <span>
        {title} {time}時間
      </span>
      <BaseButton onClick={onClickDelete}>削除</BaseButton>
    </SContainer>
  );
});

const SContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
