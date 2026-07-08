-- ============================================================
-- AgroVision AI — Seed Data
-- Sample data for development and demo purposes
-- ============================================================

-- ─── Sample Forum Posts ───────────────────────────────────
INSERT INTO public.forum_posts (title, content, category, tags, likes, views) VALUES
  ('Best practices for organic cotton farming in Maharashtra?',
   'I have been farming cotton for 10 years and want to transition to organic. Looking for guidance on natural pest control and soil improvement techniques.',
   'Organic Farming', ARRAY['Cotton', 'Organic', 'Maharashtra'], 34, 289),
  ('AI detected late blight in my tomatoes — what treatment worked for you?',
   'The AgroVision AI tool detected late blight in my tomato crop with 94% confidence. What treatments have worked best for other farmers?',
   'Disease Management', ARRAY['Tomato', 'Late Blight', 'Treatment'], 56, 412),
  ('PM-Kisan 17th installment — when is it coming?',
   'Has anyone received the 17th PM-Kisan installment? The official portal shows pending status for my application.',
   'Government Schemes', ARRAY['PM-Kisan', 'Government', 'Subsidy'], 89, 1204),
  ('Drip irrigation setup cost for 5 acres — affordable options?',
   'Planning to install drip irrigation on my 5-acre farm. What is the approximate cost and are there government subsidies available?',
   'Irrigation', ARRAY['Irrigation', 'Drip', 'Cost'], 28, 198),
  ('Kharif 2025: Which soybean variety gave you the best yield?',
   'Looking for recommendations on high-yield soybean varieties suitable for Vidarbha region black soil.',
   'Crop Varieties', ARRAY['Soybean', 'Kharif', 'Yield'], 67, 543)
ON CONFLICT DO NOTHING;

-- ─── Sample Marketplace Products ──────────────────────────
INSERT INTO public.marketplace_products (name, description, price, unit, category, stock, badge, is_organic, location, rating, review_count) VALUES
  ('Organic Neem Oil Pesticide', 'Cold-pressed neem oil, effective against 200+ pests. 100% organic, safe for beneficial insects.', 450, '/L', 'Pesticides', 200, 'Organic', true, 'Nashik, MH', 4.8, 124),
  ('NPK 19-19-19 Fertilizer', 'Balanced water-soluble fertilizer for all crops. Suitable for fertigation and foliar application.', 1200, '/50kg', 'Fertilizers', 150, 'Best Seller', false, 'Pune, MH', 4.6, 89),
  ('Bt Cotton Seeds — Bunny BG-II', 'High yield Bt cotton hybrid. Bollworm resistant. Suitable for Maharashtra, AP, Gujarat.', 830, '/450g', 'Seeds', 500, 'Top Rated', false, 'Nagpur, MH', 4.9, 312),
  ('Drip Irrigation Kit (2 acre)', 'Complete drip system including mainline, laterals, drippers, filter and fertilizer tank.', 18500, '/set', 'Equipment', 30, 'Govt Subsidy', false, 'Jalgaon, MH', 4.7, 67),
  ('Digital Soil Testing Kit', 'Measures NPK, pH, moisture, temperature. LCD display. Battery operated. 5-year warranty.', 2800, '/kit', 'Equipment', 80, 'New', false, 'Hyderabad, TS', 4.5, 43),
  ('Hybrid Tomato Seeds — Namdhari 503', 'Determinate type, 75-80 day maturity. High yield 80-100 T/ha. Suitable for all seasons.', 320, '/10g', 'Seeds', 1000, 'Popular', false, 'Bengaluru, KA', 4.8, 198)
ON CONFLICT DO NOTHING;

-- ─── Sample Notifications ─────────────────────────────────
-- (These would normally be user-specific, just showing structure)
-- INSERT INTO public.notifications (user_id, title, message, type) VALUES
--   ('USER_UUID_HERE', 'Disease Alert — Nashik', 'AI detected late blight risk in your district. Check your tomato crops.', 'alert'),
--   ('USER_UUID_HERE', 'PM-Kisan Update', 'New installment scheduled for release on 28th this month.', 'info');

SELECT 'Seed data inserted successfully' AS status;
