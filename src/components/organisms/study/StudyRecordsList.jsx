import { memo } from 'react';
import { StudyRecord } from '../../molecules/study/StudyRecord';
import { LoadingSvg } from '../../atoms/svg/LoadingSvg';
import styled from 'styled-components';

export const StudyRecordsList = memo((props) => {
  const { records, isLoading, onClickDeleteRecord } = props;
  return (
    <SList>
      {/* TODO 表示にドメインが入っているので、修正 */}
      {isLoading ? (
        <li role="status" aria-label="loading">
          <LoadingSvg />
        </li>
      ) : (
        records.map((rec) => (
          <StudyRecord
            key={rec.id}
            title={rec.title}
            time={rec.time}
            onClickDelete={() => onClickDeleteRecord(rec.id)}
          />
        ))
      )}
    </SList>
  );
});

const SList = styled.ul`
  padding-left: 0;
`;
