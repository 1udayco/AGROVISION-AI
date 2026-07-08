-- ============================================================
-- AgroVision AI — Supabase Realtime & Edge Functions Config
-- Run AFTER 001_initial_schema.sql
-- ============================================================

-- ─── Realtime Publication ─────────────────────────────────
-- Enable realtime on these tables via Supabase Dashboard:
-- Go to: Database → Replication → Tables → Enable for each

-- Or via SQL:
ALTER PUBLICATION supabase_realtime ADD TABLE disease_predictions;
ALTER PUBLICATION supabase_realtime ADD TABLE weather_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE iot_sensor_data;
ALTER PUBLICATION supabase_realtime ADD TABLE forum_posts;

-- ─── Storage Buckets ──────────────────────────────────────
-- Create via Supabase Dashboard → Storage → New Bucket
-- Or use supabase-js client:

-- INSERT INTO storage.buckets (id, name, public) VALUES ('crop-images', 'crop-images', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('disease-reports', 'disease-reports', false);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('profile-avatars', 'profile-avatars', true);

-- ─── Storage Policies ─────────────────────────────────────
CREATE POLICY "Public crop images" ON storage.objects
  FOR SELECT USING (bucket_id = 'crop-images');

CREATE POLICY "Auth users can upload crop images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'crop-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users own disease reports" ON storage.objects
  FOR ALL USING (bucket_id = 'disease-reports' AND auth.uid()::text = (storage.foldername(name))[1]);

-- ─── Supabase Auth Config ─────────────────────────────────
-- Configure in Supabase Dashboard → Authentication → Settings:
-- 1. Enable email confirmations (optional for dev)
-- 2. Set site URL to your frontend URL
-- 3. Add redirect URLs

-- ─── Edge Functions (optional) ────────────────────────────
-- Create edge functions for:
-- supabase/functions/send-disease-alert/index.ts
-- supabase/functions/daily-weather-update/index.ts
-- supabase/functions/crop-risk-notify/index.ts

-- ─── Cron Jobs via pg_cron (enable in Supabase) ───────────
-- SELECT cron.schedule('daily-cleanup', '0 2 * * *', $$
--   DELETE FROM weather_logs WHERE created_at < NOW() - INTERVAL '30 days';
--   DELETE FROM analytics_events WHERE created_at < NOW() - INTERVAL '90 days';
-- $$);
