-- Saint Paul Tennis Club Database Schema
-- Run this in Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUM TYPES
-- ============================================

CREATE TYPE user_role AS ENUM ('member', 'staff', 'board', 'admin');
CREATE TYPE reservation_type AS ENUM ('swim_lane', 'tennis_court');
CREATE TYPE reservation_status AS ENUM ('confirmed', 'cancelled');
CREATE TYPE block_type AS ENUM ('weekly', 'one_off');
CREATE TYPE event_status AS ENUM ('upcoming', 'ongoing', 'completed', 'cancelled');
CREATE TYPE application_status AS ENUM ('pending', 'reviewed', 'interviewed', 'hired', 'declined');

-- ============================================
-- PROFILES TABLE
-- ============================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  role user_role DEFAULT 'member',
  household_id UUID,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- HOUSEHOLDS TABLE
-- ============================================

CREATE TABLE households (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT DEFAULT 'Saint Paul',
  state TEXT DEFAULT 'MN',
  zip TEXT,
  primary_contact_id UUID REFERENCES profiles(id),
  membership_type TEXT DEFAULT 'family',
  membership_status TEXT DEFAULT 'active',
  guest_passes_remaining INTEGER DEFAULT 0,
  account_balance DECIMAL(10,2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key for household_id in profiles
ALTER TABLE profiles
ADD CONSTRAINT fk_profiles_household
FOREIGN KEY (household_id) REFERENCES households(id) ON DELETE SET NULL;

-- ============================================
-- EVENTS TABLE
-- ============================================

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  location TEXT,
  category TEXT,
  max_participants INTEGER,
  registration_required BOOLEAN DEFAULT false,
  registration_deadline TIMESTAMPTZ,
  member_price DECIMAL(10,2) DEFAULT 0,
  guest_price DECIMAL(10,2),
  status event_status DEFAULT 'upcoming',
  image_url TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- EVENT REGISTRATIONS TABLE
-- ============================================

CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  household_id UUID REFERENCES households(id),
  num_members INTEGER DEFAULT 1,
  num_guests INTEGER DEFAULT 0,
  total_price DECIMAL(10,2) DEFAULT 0,
  payment_status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, profile_id)
);

-- ============================================
-- RESERVATIONS TABLE
-- ============================================

CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reservation_type reservation_type NOT NULL,
  resource_id INTEGER NOT NULL, -- lane number (1-5) or court number (1-4)
  reservation_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  subslot TEXT, -- 'A' or 'B' for swim lanes, NULL for tennis
  duration_minutes INTEGER NOT NULL,
  member_name TEXT NOT NULL,
  profile_id UUID REFERENCES profiles(id),
  household_id UUID REFERENCES households(id),
  booking_type TEXT, -- 'singles' or 'doubles' for tennis
  status reservation_status DEFAULT 'confirmed',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast reservation lookups
CREATE INDEX idx_reservations_date_type ON reservations(reservation_date, reservation_type);
CREATE INDEX idx_reservations_resource ON reservations(reservation_type, resource_id, reservation_date);

-- ============================================
-- RESERVATION BLOCKS TABLE
-- ============================================

CREATE TABLE reservation_blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reservation_type reservation_type NOT NULL,
  resource_id INTEGER NOT NULL, -- lane or court number
  block_type block_type NOT NULL,
  -- For weekly blocks
  day_of_week INTEGER, -- 0 = Sunday, 6 = Saturday
  -- For one-off blocks
  block_date DATE,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  reason TEXT NOT NULL, -- e.g., "Swim Team Practice", "Tennis Lesson", "Maintenance"
  subslot TEXT, -- 'A', 'B', or NULL for full slot
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- GUEST PASSES TABLE
-- ============================================

CREATE TABLE guest_passes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  household_id UUID NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  visit_date DATE NOT NULL,
  pass_type TEXT DEFAULT 'daily', -- 'daily' or 'pool_only' etc.
  price_paid DECIMAL(10,2),
  checked_in_at TIMESTAMPTZ,
  checked_in_by UUID REFERENCES profiles(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PURCHASES TABLE
-- ============================================

CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  household_id UUID REFERENCES households(id),
  profile_id UUID REFERENCES profiles(id),
  item_type TEXT NOT NULL, -- 'guest_pass', 'lesson', 'event', 'merchandise', etc.
  item_id UUID, -- Reference to specific item if applicable
  description TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  payment_method TEXT, -- 'card', 'account', 'cash'
  payment_status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'refunded'
  stripe_payment_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CONTACT SUBMISSIONS TABLE
-- ============================================

CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new', -- 'new', 'read', 'replied', 'archived'
  replied_at TIMESTAMPTZ,
  replied_by UUID REFERENCES profiles(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- JOB APPLICATIONS TABLE
-- ============================================

CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  position TEXT NOT NULL,
  age INTEGER,
  start_date DATE,
  experience TEXT,
  certifications TEXT[], -- Array of certifications
  availability TEXT[], -- Array of available days
  about TEXT,
  status application_status DEFAULT 'pending',
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES profiles(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SWIM LESSONS REGISTRATIONS TABLE
-- ============================================

CREATE TABLE lesson_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_type TEXT NOT NULL, -- 'private', 'group', 'semi-private'
  sport TEXT NOT NULL, -- 'swim', 'tennis'
  instructor_name TEXT NOT NULL,
  student_name TEXT NOT NULL,
  student_age INTEGER,
  profile_id UUID REFERENCES profiles(id),
  household_id UUID REFERENCES households(id),
  session_date DATE,
  session_time TIME,
  duration_minutes INTEGER,
  price DECIMAL(10,2),
  payment_status TEXT DEFAULT 'pending',
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SWIM/DIVE TEAM REGISTRATIONS TABLE
-- ============================================

CREATE TABLE team_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_type TEXT NOT NULL, -- 'swim', 'dive', 'both'
  season_year INTEGER NOT NULL,
  swimmer_name TEXT NOT NULL,
  swimmer_age INTEGER NOT NULL,
  profile_id UUID REFERENCES profiles(id),
  household_id UUID REFERENCES households(id),
  emergency_contact TEXT,
  emergency_phone TEXT,
  medical_notes TEXT,
  previous_experience TEXT,
  tshirt_size TEXT,
  registration_fee DECIMAL(10,2),
  payment_status TEXT DEFAULT 'pending',
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'waitlisted'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CHECK-INS TABLE (for board portal)
-- ============================================

CREATE TABLE check_ins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id),
  household_id UUID REFERENCES households(id),
  member_name TEXT NOT NULL,
  check_in_time TIMESTAMPTZ DEFAULT NOW(),
  check_in_type TEXT DEFAULT 'member', -- 'member', 'guest'
  checked_in_by UUID REFERENCES profiles(id),
  notes TEXT
);

-- Index for check-in lookups by date
CREATE INDEX idx_check_ins_date ON check_ins(check_in_time);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE households ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservation_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_passes ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE check_ins ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PROFILES POLICIES
-- ============================================

-- Users can read their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Board/Admin can view all profiles
CREATE POLICY "Board can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('board', 'admin')
    )
  );

-- ============================================
-- HOUSEHOLDS POLICIES
-- ============================================

-- Users can view their own household
CREATE POLICY "Users can view own household" ON households
  FOR SELECT USING (
    id IN (SELECT household_id FROM profiles WHERE id = auth.uid())
  );

-- Board/Admin can view all households
CREATE POLICY "Board can view all households" ON households
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('board', 'admin')
    )
  );

-- Board/Admin can update households
CREATE POLICY "Board can update households" ON households
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('board', 'admin')
    )
  );

-- ============================================
-- EVENTS POLICIES
-- ============================================

-- Everyone can view upcoming events
CREATE POLICY "Anyone can view events" ON events
  FOR SELECT USING (true);

-- Board/Admin can manage events
CREATE POLICY "Board can manage events" ON events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('board', 'admin')
    )
  );

-- ============================================
-- EVENT REGISTRATIONS POLICIES
-- ============================================

-- Users can view their own registrations
CREATE POLICY "Users can view own registrations" ON event_registrations
  FOR SELECT USING (profile_id = auth.uid());

-- Users can create their own registrations
CREATE POLICY "Users can create registrations" ON event_registrations
  FOR INSERT WITH CHECK (profile_id = auth.uid());

-- Board can view all registrations
CREATE POLICY "Board can view all registrations" ON event_registrations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('board', 'admin')
    )
  );

-- ============================================
-- RESERVATIONS POLICIES
-- ============================================

-- Anyone can view reservations (needed for booking display)
CREATE POLICY "Anyone can view reservations" ON reservations
  FOR SELECT USING (true);

-- Authenticated users can create reservations
CREATE POLICY "Users can create reservations" ON reservations
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Users can cancel their own reservations
CREATE POLICY "Users can update own reservations" ON reservations
  FOR UPDATE USING (profile_id = auth.uid());

-- Board can manage all reservations
CREATE POLICY "Board can manage reservations" ON reservations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('staff', 'board', 'admin')
    )
  );

-- ============================================
-- RESERVATION BLOCKS POLICIES
-- ============================================

-- Anyone can view blocks
CREATE POLICY "Anyone can view blocks" ON reservation_blocks
  FOR SELECT USING (true);

-- Board/Staff can manage blocks
CREATE POLICY "Board can manage blocks" ON reservation_blocks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('staff', 'board', 'admin')
    )
  );

-- ============================================
-- GUEST PASSES POLICIES
-- ============================================

-- Users can view their household's guest passes
CREATE POLICY "Users can view own guest passes" ON guest_passes
  FOR SELECT USING (
    household_id IN (SELECT household_id FROM profiles WHERE id = auth.uid())
  );

-- Board can view all guest passes
CREATE POLICY "Board can view all guest passes" ON guest_passes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('staff', 'board', 'admin')
    )
  );

-- ============================================
-- PURCHASES POLICIES
-- ============================================

-- Users can view their own purchases
CREATE POLICY "Users can view own purchases" ON purchases
  FOR SELECT USING (profile_id = auth.uid());

-- Board can view all purchases
CREATE POLICY "Board can view all purchases" ON purchases
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('board', 'admin')
    )
  );

-- ============================================
-- CONTACT SUBMISSIONS POLICIES
-- ============================================

-- Anyone can create contact submissions
CREATE POLICY "Anyone can create contact" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Board can view contact submissions
CREATE POLICY "Board can view contact" ON contact_submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('staff', 'board', 'admin')
    )
  );

-- ============================================
-- JOB APPLICATIONS POLICIES
-- ============================================

-- Anyone can create applications
CREATE POLICY "Anyone can apply" ON job_applications
  FOR INSERT WITH CHECK (true);

-- Board can view applications
CREATE POLICY "Board can view applications" ON job_applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('board', 'admin')
    )
  );

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_households_updated_at BEFORE UPDATE ON households
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at BEFORE UPDATE ON reservations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservation_blocks_updated_at BEFORE UPDATE ON reservation_blocks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FUNCTION: Create profile on signup
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on auth.users insert
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
