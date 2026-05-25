import { supabase } from '../../infrastructure/supabase';

export interface BookingData {
  name: string;
  email: string;
  session_type: string;
}

export const BookingRepository = {
  async save(data: BookingData) {
    const { error } = await supabase.from('session_bookings').insert(data);
    if (error) {
      throw new Error(error.message);
    }
  },
};
