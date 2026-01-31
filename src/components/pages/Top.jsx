import { useEffect, useState } from 'react';
import { SumTime } from '../molecules/study/SumTime';
import { BaseButton } from '../atoms/button/BaseButton';
import { ErrorMessage } from '../atoms/paragraph/ErrorMessage';
import { AppTitle } from '../atoms/title/AppTitle';
import { StudyInputsArea } from '../organisms/study/StudyInputsArea';
import { StudyRecordsList } from '../organisms/study/StudyRecordsList';
import { fetchAllStudyRecords, insertStudyRecord } from '../../utils/supabase/superbaseStudyRecord';

export const Top = () => {
  const [records, setRecords] = useState([]);
  const [studyText, setStudyText] = useState('');
  const [studyTime, setStudyTime] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStudyRecords = async () => {
      setIsLoading(true);
      const { data, error } = await fetchAllStudyRecords();

      if (error) {
        alert('データの取得に失敗しました。');
        console.error(error);
        return;
      }
      setRecords(data);
      setIsLoading(false);
    };

    fetchStudyRecords();
  }, []);

  const onChangeStudyText = (e) => {
    setStudyText(e.target.value);
  };

  const onChangeStudyTime = (e) => {
    setStudyTime(e.target.value);
  };

  const onClickAdd = async () => {
    setError('');
    if (studyText === '' || studyTime === '') {
      setError('入力されていない項目があります。');
      return;
    }

    const { data, error } = await insertStudyRecord({ title: studyText, time: studyTime });
    if (error) {
      alert('データの追加に失敗しました。');
      return;
    }

    const newRecords = [...records, ...data];
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
      <StudyRecordsList records={records} isLoading={isLoading} />
      <BaseButton onClick={onClickAdd}>登録</BaseButton>
      <SumTime records={records} />
      <ErrorMessage>{error}</ErrorMessage>
    </main>
  );
};
