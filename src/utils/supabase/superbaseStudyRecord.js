import { supabase } from './supabase';

export const fetchAllStudyRecords = async () => {
  const records = await supabase.from('study-record').select();
  return records;
};

/**
 * 1件のレコードを追加
 * @param {Object} record 1件の学習記録
 * @param {string} record.title 学習内容
 * @param {number} record.time 学習時間
 *
 * @returns {Object} 追加されたレコード
 */
export const insertStudyRecord = async (inputRecord) => {
  const insertRecord = await supabase.from('study-record').insert(inputRecord).select();
  return insertRecord;
};
