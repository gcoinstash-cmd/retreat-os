-- ==============================================================================
-- RETREAT OS — SUPABASE SEED DATA (v1.0.0)
-- ==============================================================================

-- Seed Retreat Programs
INSERT INTO public.retreat_programs (slug, title, subtitle, tagline, location, dates, duration_days, hero_image, total_spots, spots_remaining, status)
VALUES
('soma-silence', 'FOCUS & DECOMPRESSION', 'Strategic Business & Focus Masterclass', 'A seven-day structured workspace program offering private quiet desks, ergonomic workstations, and recovery protocols.', 'Ubud, Bali', 'October 12 – 18, 2026', 7, 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=1200', 12, 4, 'Enrolling'),
('kairou-clay', 'WOOD KILN CERAMICS APPRENTICESHIP', 'Traditional Japanese Craft & Spatial Harmony', 'An eight-day intensive pottery workshop immersing participants in high-fire anagama wood kilns.', 'Kyoto, Japan', 'November 04 – 11, 2026', 8, 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200', 10, 2, 'Enrolling'),
('prana-surf', 'COLD IMMERSION & SURF ALIGNMENT', 'Metabolic Resilience & Wave Mechanics', 'A seven-day athletic conditioning program integrating morning point-break surfing with cold tub plunges.', 'Nosara, Costa Rica', 'January 15 – 21, 2027', 7, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200', 14, 6, 'Enrolling')
ON CONFLICT (slug) DO NOTHING;

-- Seed Cohort Applications
INSERT INTO public.cohort_applications (application_code, retreat_title, tier_name, full_name, email, phone, instagram, calling_text, experience_text, dietary_restrictions, deposit_amount, status)
VALUES
('RET-9021', 'FOCUS & DECOMPRESSION (Ubud)', 'Forest Villa Suite', 'Dr. Evelyn St. Claire', 'evelyn@stclaire-health.com', '+1 (415) 890-4421', '@dr.evelyn.stclaire', 'Seeking focused spatial reset to prepare new neurological recovery curriculum without digital device fatigue.', '10 years somatic movement instruction and executive coaching.', 'Plant-forward organic, zero seed oils, gluten-free.', 4800.00, 'accepted'),
('RET-9022', 'WOOD KILN CERAMICS (Kyoto)', 'Machiya Ryokan Room', 'Marcus Vance', 'marcus@vancedesign.org', '+1 (212) 554-0918', '@marcus.vance.arch', 'Exploring ancient wood-fire glaze chemistry and kiln structural geometry.', 'Architectural ceramicist for commercial brutalist buildings.', 'None.', 5400.00, 'reviewed'),
('RET-9023', 'COLD IMMERSION & SURF (Nosara)', 'Ocean Ridge Bungalow', 'Aria Thorne', 'aria@thornecapital.io', '+1 (310) 774-2910', '@ariathorne', 'Intense metabolic physical training and wave alignment retreat before launch of fund IV.', 'Intermediate point-break surfer and daily cold-tub practitioner.', 'Pescatarian.', 4200.00, 'pending')
ON CONFLICT (application_code) DO NOTHING;
