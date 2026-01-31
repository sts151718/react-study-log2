import { memo } from 'react';
import styled from 'styled-components';
import { BaseButton } from '../../atoms/button/BaseButton';

export const StudyRecord = memo((props) => {
  const { title, time } = props;
  return (
    <SContainer>
      <span>
        {title} {time}時間
      </span>
      <BaseButton>削除</BaseButton>
    </SContainer>
  );
});

const SContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
