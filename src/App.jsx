import { useState } from 'react';
import { StudyInput } from './components/StudyInput';
import { StudyRecords } from './components/StudyRecords';
import { StudySum } from './components/StudySum';
import { BaseButton } from './components/BaseButton';
import { ErrorMessage } from './components/ErrorMessage';
import { AppTitle } from './components/AppTitle';
import { BaseParagraph } from './components/BaseParagraph';

export const App = () => {
  const [records, setRecords] = useState([]);
  const [studyText, setStudyText] = useState('');
  const [studyTime, setStudyTime] = useState(0);
  const [error, setError] = useState('');

  const onStudyTextChange = (e) => {
    setStudyText(e.target.value);
  };

  const onStudyTimeChange = (e) => {
    setStudyTime(e.target.value);
  };

  const onClickAdd = () => {
    setError('');
    if (studyText === '' || studyTime === '') {
      setError('入力されていない項目があります。');
      return;
    }

    const newRecords = [...records, { title: studyText, time: studyTime }];
    setRecords(newRecords);
    setStudyText('');
    setStudyTime(0);
  };

  return (
    <>
      <AppTitle>学習記録一覧</AppTitle>
      <StudyInput label="学習内容" value={studyText} onChange={onStudyTextChange} id="study-text-input" />
      <StudyInput label="学習時間" value={studyTime} onChange={onStudyTimeChange} id="study-time-input" type="number" />
      <BaseParagraph>入力されている学習内容: {studyText}</BaseParagraph>
      <BaseParagraph>入力されている学習時間: {studyTime}時間</BaseParagraph>
      <StudyRecords records={records} />
      <BaseButton onClick={onClickAdd}>登録</BaseButton>
      <StudySum records={records} />
      {error === '' || <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};
