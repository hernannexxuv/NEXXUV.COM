/*
  # NEXXUV Platform - Initial Schema

  ## Overview
  Core tables for the NEXXUV institutional scheduling and onboarding portal.

  ## New Tables

  ### services
  Catalogue of consultancy/demo sessions that prospects can book.
  - id (uuid, PK)
  - title (text) - Service name
  - description (text) - Detailed description
  - duration_minutes (int) - Session duration
  - category (text) - Service category
  - created_at (timestamptz)

  ### bookings
  B2B/G2B booking requests from municipal authorities and corporate prospects.
  - id (uuid, PK)
  - service_id (uuid, FK -> services)
  - organization_name (text) - Municipality or firm name
  - contact_name (text)
  - contact_email (text)
  - contact_phone (text)
  - contact_role (text) - e.g. "Alcalde", "Director de Innovación"
  - message (text) - Additional context from the prospect
  - preferred_date (date)
  - preferred_time (text)
  - status (text) - "pending" | "under_review" | "scheduled"
  - admin_notes (text) - Internal notes for NEXXUV team
  - scheduled_at (timestamptz) - Confirmed meeting datetime
  - created_at (timestamptz)

  ## Security
  - RLS enabled on both tables
  - services: public read, no public write
  - bookings: public insert only, admin reads via service role (anon key restricted)

  ## Notes
  - Demo seed data is inserted for services and sample bookings
*/

-- ============================================================
-- SERVICES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  duration_minutes int NOT NULL DEFAULT 60,
  category text NOT NULL DEFAULT 'general',
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read services"
  ON services FOR SELECT
  TO anon, authenticated
  USING (true);

-- ============================================================
-- BOOKINGS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid REFERENCES services(id) ON DELETE SET NULL,
  organization_name text NOT NULL,
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text NOT NULL DEFAULT '',
  contact_role text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  preferred_date date,
  preferred_time text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'scheduled')),
  admin_notes text NOT NULL DEFAULT '',
  scheduled_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert bookings"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- SEED: SERVICES
-- ============================================================
INSERT INTO services (title, description, duration_minutes, category, display_order) VALUES
(
  'Presentación de Arquitectura: Plataforma Vecinal y Juntas de Vecinos',
  'Demostración completa de la arquitectura técnica para digitalizar la comunicación entre municipios, juntas de vecinos y ciudadanos, enmarcada en la Ley 19.418. Incluye módulos de gestión de solicitudes, tablón digital y flujos de notificación automatizados.',
  90,
  'arquitectura',
  1
),
(
  'Demo Técnica: Bot de Extracción y Monitoreo (Caso Poder Judicial)',
  'Presentación del caso de uso real de automatización de extracción de datos desde el sistema del Poder Judicial chileno. Demostración en vivo del bot de monitoreo de causas, alertas automáticas y generación de reportes para firmas legales.',
  60,
  'automatizacion',
  2
),
(
  'Auditoría de Procesos y Eliminación de Burocracia en Papel',
  'Sesión de diagnóstico para mapear los flujos de trabajo actuales de la organización, identificar cuellos de botella burocráticos y presentar una hoja de ruta concreta para digitalización. Entregable: informe de viabilidad técnica y estimación de reducción de carga operativa.',
  120,
  'consultoria',
  3
);

-- ============================================================
-- SEED: BOOKINGS (demo data)
-- ============================================================
INSERT INTO bookings (service_id, organization_name, contact_name, contact_email, contact_phone, contact_role, message, preferred_date, preferred_time, status, admin_notes) VALUES
(
  (SELECT id FROM services WHERE display_order = 1),
  'Alcaldía Municipal de Temuco',
  'Rodrigo Fuentes',
  'r.fuentes@muniTemuco.cl',
  '+56 9 8811 2233',
  'Director de Modernización Municipal',
  'Estamos evaluando soluciones para digitalizar el proceso de registro y gestión de juntas de vecinos de nuestra comuna. Tenemos 47 juntas activas y el proceso actual es 100% en papel.',
  CURRENT_DATE + INTERVAL '5 days',
  '10:00',
  'scheduled',
  'Prospecto de alta prioridad. Presupuesto municipal disponible para Q3. Confirmar con equipo técnico.'
),
(
  (SELECT id FROM services WHERE display_order = 2),
  'Estudio Jurídico Morales & Asociados',
  'Carmen Morales',
  'cmorales@moralesasociados.cl',
  '+56 9 7755 4499',
  'Socia Directora',
  'Manejamos aproximadamente 200 causas activas en el Poder Judicial. El seguimiento manual consume 3 horas diarias del equipo. Necesitamos automatizar este proceso urgentemente.',
  CURRENT_DATE + INTERVAL '3 days',
  '15:30',
  'under_review',
  'Caso ideal para el bot judicial. Revisar compatibilidad con su sistema de gestión interno (usa LexSoft).'
),
(
  (SELECT id FROM services WHERE display_order = 3),
  'Departamento de Innovación - Gobierno Regional de La Araucanía',
  'Felipe Sandoval',
  'fsandoval@gorearaucania.cl',
  '+56 45 2 441 100',
  'Jefe de Transformación Digital',
  'Tenemos un mandato regional para digitalizar 12 trámites críticos antes de fin de año. Necesitamos un socio técnico para la auditoría inicial y el diseño del roadmap.',
  CURRENT_DATE + INTERVAL '8 days',
  '09:00',
  'pending',
  ''
);
