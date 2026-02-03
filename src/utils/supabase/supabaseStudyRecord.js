import { supabase } from './supabase';

/**
 * Supabaseから全データを取得
 *
 * @returns {Object} 取得したデータとエラーオブジェクト
 */
export const fetchAllStudyRecords = async () => {
  const { data, error } = await supabase.from('study-record').select();
  if (error) {
    throw new Error('Supabase Fetch Error');
  }
  return data;
};

/**
 * 1件分のレコードを追加
 * @param {Object} record 1件の学習記録
 * @param {string} record.title 学習内容
 * @param {number} record.time 学習時間
 *
 * @returns {Object} 取得したデータとエラーオブジェクト
 */
export const insertStudyRecord = async (inputRecord) => {
  const { data, error } = await supabase.from('study-record').insert(inputRecord).select();
  if (error) {
    throw new Error('Supabase Insert Error');
  }
  return data[0];
};

/**
 * 指定したidのレコードを削除
 *
 * @param {string} id uuid型のid
 *
 * @returns {Object} 取得したデータとエラーオブジェクト
 */
export const deleteStudyRecord = async (id) => {
  const { data, error } = await supabase.from('study-record').delete().eq('id', id);
  if (error) {
    throw new Error('Supabase Delete Error');
  }
  return data;
};
