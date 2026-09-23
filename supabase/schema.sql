-- ==============================================================================
-- RETREAT OS — SUPABASE DATABASE SCHEMA (v1.0.0)
-- Boutique Sanctuary Intake, Cohort Ledger & Masterclass Expedition OS
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Retreat Sanctuaries Table
CREATE TABLE IF NOT EXISTS public.retreat_programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(64) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255) NOT NULL,
    tagline TEXT,
    location VARCHAR(255) NOT NULL,
    dates VARCHAR(128) NOT NULL,
    duration_days INTEGER NOT NULL DEFAULT 7,
    hero_image TEXT NOT NULL,
    total_spots INTEGER NOT NULL DEFAULT 12,
    spots_remaining INTEGER NOT NULL DEFAULT 4,
    status VARCHAR(32) NOT NULL DEFAULT 'Enrolling',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Accommodation Tiers Table
CREATE TABLE IF NOT EXISTS public.accommodation_tiers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    retreat_id UUID REFERENCES public.retreat_programs(id) ON DELETE CASCADE,
    tier_name VARCHAR(128) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    spots_total INTEGER NOT NULL DEFAULT 4,
    spots_remaining INTEGER NOT NULL DEFAULT 1,
    description TEXT,
    amenities JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Cohort Applications & Deposits Table
CREATE TABLE IF NOT EXISTS public.cohort_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_code VARCHAR(32) NOT NULL UNIQUE,
    retreat_id UUID REFERENCES public.retreat_programs(id) ON DELETE SET NULL,
    retreat_title VARCHAR(255) NOT NULL,
    tier_name VARCHAR(128) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(64),
    instagram VARCHAR(128),
    calling_text TEXT,
    experience_text TEXT,
    dietary_restrictions TEXT,
    deposit_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(32) NOT NULL DEFAULT 'pending',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.retreat_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accommodation_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cohort_applications ENABLE ROW LEVEL SECURITY;

-- 6. Public Read Policies
CREATE POLICY "Allow public read access to retreats" 
    ON public.retreat_programs FOR SELECT USING (true);

CREATE POLICY "Allow public read access to accommodation tiers" 
    ON public.accommodation_tiers FOR SELECT USING (true);

CREATE POLICY "Allow applicants to submit intake applications" 
    ON public.cohort_applications FOR INSERT WITH CHECK (true);

-- 7. Host Director Admin Policies
CREATE POLICY "Expedition host manage retreats" 
    ON public.retreat_programs FOR ALL USING (true);

CREATE POLICY "Expedition host manage applications" 
    ON public.cohort_applications FOR ALL USING (true);
