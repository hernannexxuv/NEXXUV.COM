import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ServiceCategory = 'arquitectura' | 'automatizacion' | 'consultoria' | 'general';

export interface Service {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  category: ServiceCategory;
  display_order: number;
  created_at: string;
}

export type BookingStatus = 'pending' | 'under_review' | 'scheduled';

export interface Booking {
  id: string;
  service_id: string | null;
  organization_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  contact_role: string;
  message: string;
  preferred_date: string | null;
  preferred_time: string;
  status: BookingStatus;
  admin_notes: string;
  scheduled_at: string | null;
  created_at: string;
  services?: Service;
}

export interface BookingInsert {
  service_id: string;
  organization_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  contact_role: string;
  message: string;
  preferred_date: string;
  preferred_time: string;
}
