import { supabase } from './supabase';

export const fetchAllStudyRecords = async () => {
  const record = await supabase.from('study-record').select();
  return record;
};
