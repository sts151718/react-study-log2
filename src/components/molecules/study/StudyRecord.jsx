import { memo } from 'react';
import styled from 'styled-components';
import { AlertButton } from '../../atoms/button/AlertButton';

export const StudyRecord = memo((props) => {
  const { title, time, onClickDelete } = props;
  return (
    <SItem>
      <span>
        {title} {time}時間
      </span>
      <AlertButton onClick={onClickDelete}>削除</AlertButton>
    </SItem>
  );
});

const SItem = styled.li`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;
