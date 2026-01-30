import { StudyInput } from '../../molecules/study/StudyInput';

export const StudyInputsArea = (props) => {
  const { studyText, onChangeStudyText, studyTime, onChangeStudyTime } = props;
  return (
    <div>
      <StudyInput label="学習内容" value={studyText} onChange={onChangeStudyText} id="study-text-input" />
      <StudyInput label="学習時間" value={studyTime} onChange={onChangeStudyTime} id="study-time-input" type="number" />
      <p>入力されている学習内容: {studyText}</p>
      <p>入力されている学習時間: {studyTime}時間</p>
    </div>
  );
};
