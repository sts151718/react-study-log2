import { useEffect, useState } from 'react';
import { SumTime } from '../molecules/study/SumTime';
import { BaseButton } from '../atoms/button/BaseButton';
import { ErrorMessage } from '../atoms/paragraph/ErrorMessage';
import { AppTitle } from '../atoms/title/AppTitle';
import { StudyInputsArea } from '../organisms/study/StudyInputsArea';
import { StudyRecordsList } from '../organisms/study/StudyRecordsList';
import { fetchAllStudyRecords } from '../../utils/supabase/studyRecord';

export const Top = () => {
  const [records, setRecords] = useState([]);
  const [studyText, setStudyText] = useState('');
  const [studyTime, setStudyTime] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudyRecords = async () => {
      const { data, error } = await fetchAllStudyRecords();

      if (error) {
        alert('データの取得に失敗しました。');
        console.error(error);
        return;
      }
      setRecords(data);
    };
    fetchStudyRecords();
  }, []);

  const onChangeStudyText = (e) => {
    setStudyText(e.target.value);
  };

  const onChangeStudyTime = (e) => {
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
    <main>
      <AppTitle>学習記録一覧</AppTitle>
      <StudyInputsArea
        studyText={studyText}
        onChangeStudyText={onChangeStudyText}
        studyTime={studyTime}
        onChangeStudyTime={onChangeStudyTime}
      />
      <StudyRecordsList records={records} />
      <BaseButton onClick={onClickAdd}>登録</BaseButton>
      <SumTime records={records} />
      <ErrorMessage>{error}</ErrorMessage>
    </main>
  );
};
