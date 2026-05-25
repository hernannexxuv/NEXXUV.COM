import { supabase } from '../../infrastructure/supabase';

export interface BookingData {
  name: string;
  email: string;
  session_type: string;
}

export interface Booking extends BookingData {
  id: string;
  status: string;
  created_at: string;
}

export const BookingRepository = {
  async save(data: BookingData) {
    const { error } = await supabase.from('session_bookings').insert(data);
    if (error) {
      throw new Error(error.message);
    }
  },

  async getAll(): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('session_bookings')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return data || [];
  },

  async updateStatus(id: string, status: string) {
    const { error } = await supabase
      .from('session_bookings')
      .update({ status })
      .eq('id', id);
    if (error) {
      throw new Error(error.message);
    }
  },
};
