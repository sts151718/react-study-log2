import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, jest } from '@jest/globals';
import { debug } from 'jest-preview';

const mockRecordsInfo = { id: 0, data: [] };
jest.mock('../utils/supabase/supabaseStudyRecord', () => ({
  fetchAllStudyRecords: jest.fn(
    () => new Promise((resolve) => setTimeout(() => resolve({ data: mockRecordsInfo.data, error: null }), 500))
  ),
  insertStudyRecord: jest.fn(
    (obj) =>
      new Promise((resolve) =>
        setTimeout(() => resolve({ data: [{ id: ++mockRecordsInfo.id, ...obj }], error: null }), 500)
      )
  ),
  deleteStudyRecord: jest.fn(
    () => new Promise((resolve) => setTimeout(() => resolve({ data: null, error: null }), 500))
  ),
}));

import { Top } from '../components/pages/Top';

function setRecordsInfo(records) {
  mockRecordsInfo.data = records.map((rec) => ({ id: ++mockRecordsInfo.id, ...rec }));
}

function clearRecordsInfo() {
  mockRecordsInfo.id = 0;
  mockRecordsInfo.data = [];
}

describe('トップページ テスト', () => {
  beforeEach(async () => {
    // alertのモックを作成
    jest.spyOn(globalThis, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    clearRecordsInfo();
  });
  it('タイトルが表示されていること', async () => {
    render(<Top />);
    const appTitle = await screen.findByRole('heading', { level: 1 });
    expect(appTitle).toBeVisible();
    expect(appTitle).toHaveTextContent('学習記録一覧');
  });

  it('登録ボタンを押したら、入力内容が記録に追加されていること', async () => {
    render(<Top />);
    const studyInputsArea = screen.getByTestId('inputs-area');
    const studyTextInput = within(studyInputsArea).getByRole('textbox');
    const studyTimeInput = within(studyInputsArea).getByRole('spinbutton');

    // フォーム入力
    const userInputStudyText = '1番目の入力データ';
    const userInputStudyTime = '12';
    await userEvent.type(studyTextInput, userInputStudyText);
    await userEvent.type(studyTimeInput, userInputStudyTime);

    const registerButton = screen.getByRole('button', { name: '登録' });
    await userEvent.click(registerButton);

    const studyRecordsList = screen.getByRole('list');
    const studyRecord = await within(studyRecordsList).findAllByRole('listitem');
    expect(studyRecord).toHaveLength(1);
    // ローディング中ではないこと
    expect(studyRecord[0]).not.toHaveRole('status');
    expect(studyRecord.at(-1)).toHaveTextContent(`${userInputStudyText} ${userInputStudyTime}時間`);
  });

  it('削除ボタンを押したら、該当する記録だけ削除されていること', async () => {
    const records = [
      { title: 'テストデータ_1', time: 1 },
      { title: 'テストデータ_2', time: 2 },
      { title: 'テストデータ_3', time: 3 },
    ];
    setRecordsInfo(records);
    render(<Top />);

    const studyRecordsList = screen.getByRole('list');

    const studyRecords = await within(studyRecordsList).findAllByRole('listitem');
    expect(studyRecords).toHaveLength(3);

    // 2番目の記録の削除ボタンを押した場合
    const record2Item = studyRecords[1];
    await userEvent.click(within(studyRecords[1]).getByRole('button', { name: '削除' }));
    await waitForElementToBeRemoved(record2Item);
  });

  it('学習内容を入力をしないで登録を押すとエラーが表示される', async () => {
    render(<Top />);
    const studyInputsArea = screen.getByTestId('inputs-area');
    const studyTextInput = within(studyInputsArea).getByRole('textbox');
    const studyTimeInput = within(studyInputsArea).getByRole('spinbutton');
    const registerButton = screen.getByRole('button', { name: '登録' });
    const expectedErrorMsg = '入力されていない項目があります。';

    // 初期表示ではエラーメッセージがないこと
    expect(screen.queryByText(expectedErrorMsg)).toBeNull();

    // 学習内容が空の場合
    await userEvent.clear(studyTextInput);
    await userEvent.type(studyTimeInput, '12');
    await userEvent.click(registerButton);
    expect(await screen.findByText(expectedErrorMsg)).toBeVisible();
  });

  it('学習時間を入力をしないで登録を押すとエラーが表示される', async () => {
    render(<Top />);
    const studyInputsArea = screen.getByTestId('inputs-area');
    const studyTextInput = within(studyInputsArea).getByRole('textbox');
    const studyTimeInput = within(studyInputsArea).getByRole('spinbutton');
    const registerButton = screen.getByRole('button', { name: '登録' });
    const expectedErrorMsg = '入力されていない項目があります。';

    // 初期表示ではエラーメッセージがないこと
    expect(screen.queryByText(expectedErrorMsg)).toBeNull();

    // 学習内容が空の場合
    await userEvent.type(studyTextInput, '入力');
    await userEvent.clear(studyTimeInput);
    await userEvent.click(registerButton);
    expect(await screen.findByText(expectedErrorMsg)).toBeVisible();
  });
});
