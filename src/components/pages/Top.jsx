import { useEffect, useState } from 'react';
import { SumTime } from '../molecules/study/SumTime';
import { PrimaryButton } from '../atoms/button/PrimaryButton';
import { ErrorMessage } from '../atoms/paragraph/ErrorMessage';
import { AppTitle } from '../atoms/title/AppTitle';
import { StudyInputsArea } from '../organisms/study/StudyInputsArea';
import { StudyRecordsList } from '../organisms/study/StudyRecordsList';
import { deleteStudyRecord, fetchAllStudyRecords, insertStudyRecord } from '../../utils/supabase/supabaseStudyRecord';

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

  const onClickDeleteRecord = async (id) => {
    const { error } = await deleteStudyRecord(id);

    if (error) {
      alert('データの削除に失敗しました。');
      return;
    }

    const newRecords = records.filter((rec) => rec.id !== id);

    setRecords(newRecords);
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
      <StudyRecordsList records={records} isLoading={isLoading} onClickDeleteRecord={onClickDeleteRecord} />
      <PrimaryButton onClick={onClickAdd}>登録</PrimaryButton>
      <SumTime records={records} />
      <ErrorMessage>{error}</ErrorMessage>
    </main>
  );
};
