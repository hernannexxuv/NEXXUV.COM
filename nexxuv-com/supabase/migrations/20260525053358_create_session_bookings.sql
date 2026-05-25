/*
  # Create session_bookings table

  1. New Tables
    - `session_bookings`
      - `id` (uuid, primary key)
      - `name` (text, full name of the person booking)
      - `email` (text, corporate email)
      - `session_type` (text, type of session selected)
      - `status` (text, default 'pendiente')
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `session_bookings` table
    - Add policy for anyone (including anonymous) to insert bookings (public booking form)
    - Add policy for authenticated users to read bookings (admin dashboard)
*/

CREATE TABLE IF NOT EXISTS session_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  session_type text NOT NULL,
  status text NOT NULL DEFAULT 'pendiente',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE session_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a booking"
  ON session_bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read bookings"
  ON session_bookings FOR SELECT
  TO authenticated
  USING (true);
