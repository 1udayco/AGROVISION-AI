-- ============================================================
-- AgroVision AI — Supabase PostgreSQL Schema
-- Run this in the Supabase SQL editor to set up the database
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── USERS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.users (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,
  email           TEXT UNIQUE NOT NULL,
  phone           TEXT,
  state           TEXT,
  role            TEXT NOT NULL DEFAULT 'farmer' CHECK (role IN ('farmer', 'agronomist', 'researcher', 'admin')),
  password_hash   TEXT NOT NULL,
  avatar_url      TEXT,
  is_verified     BOOLEAN DEFAULT FALSE,
  is_active       BOOLEAN DEFAULT TRUE,
  last_login      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── DISEASE PREDICTIONS ──────────────────────────────────
CREATE TABLE IF NOT EXISTS public.disease_predictions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES public.users(id) ON DELETE SET NULL,
  crop            TEXT,
  disease         TEXT NOT NULL,
  confidence      NUMERIC(5,2) NOT NULL,
  severity        TEXT CHECK (severity IN ('None', 'Low', 'Medium', 'High', 'Critical')),
  image_url       TEXT,
  location        TEXT,
  district        TEXT,
  state           TEXT,
  treatments      JSONB,
  report_url      TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── RECOMMENDATIONS ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.recommendations (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID REFERENCES public.users(id) ON DELETE SET NULL,
  state               TEXT NOT NULL,
  district            TEXT,
  soil_type           TEXT,
  rainfall            NUMERIC,
  temperature         NUMERIC,
  humidity            NUMERIC,
  ph_level            NUMERIC,
  top_crop            TEXT NOT NULL,
  alternatives        JSONB,
  yield_prediction    NUMERIC,
  revenue_estimate    NUMERIC,
  confidence          NUMERIC(5,2),
  radar_data          JSONB,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ─── WEATHER LOGS ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.weather_logs (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  city            TEXT NOT NULL,
  state           TEXT,
  temperature     NUMERIC,
  feels_like      NUMERIC,
  humidity        INTEGER,
  wind_speed      NUMERIC,
  rainfall        NUMERIC DEFAULT 0,
  uv_index        INTEGER,
  description     TEXT,
  ai_drought_risk TEXT,
  ai_flood_risk   TEXT,
  raw_data        JSONB,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── CHATBOT HISTORY ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.chatbot_history (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES public.users(id) ON DELETE CASCADE,
  role            TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content         TEXT NOT NULL,
  language        TEXT DEFAULT 'English',
  tokens_used     INTEGER,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── FORUM POSTS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.forum_posts (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  content         TEXT NOT NULL,
  category        TEXT NOT NULL,
  tags            TEXT[],
  likes           INTEGER DEFAULT 0,
  views           INTEGER DEFAULT 0,
  is_pinned       BOOLEAN DEFAULT FALSE,
  is_solved       BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.forum_replies (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id         UUID REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  user_id         UUID REFERENCES public.users(id) ON DELETE CASCADE,
  content         TEXT NOT NULL,
  likes           INTEGER DEFAULT 0,
  is_solution     BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── MARKETPLACE ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.marketplace_products (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id       UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  description     TEXT,
  price           NUMERIC NOT NULL,
  unit            TEXT NOT NULL,
  category        TEXT NOT NULL,
  stock           INTEGER DEFAULT 0,
  images          TEXT[],
  rating          NUMERIC(3,2) DEFAULT 0,
  review_count    INTEGER DEFAULT 0,
  badge           TEXT,
  is_organic      BOOLEAN DEFAULT FALSE,
  is_active       BOOLEAN DEFAULT TRUE,
  location        TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.orders (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id        UUID REFERENCES public.users(id) ON DELETE SET NULL,
  product_id      UUID REFERENCES public.marketplace_products(id) ON DELETE SET NULL,
  quantity        INTEGER NOT NULL,
  total_price     NUMERIC NOT NULL,
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  delivery_address TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ANALYTICS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type      TEXT NOT NULL,
  user_id         UUID REFERENCES public.users(id) ON DELETE SET NULL,
  metadata        JSONB,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── NOTIFICATIONS ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.notifications (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  message         TEXT NOT NULL,
  type            TEXT DEFAULT 'info' CHECK (type IN ('info', 'warning', 'alert', 'success')),
  is_read         BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── IOT SENSOR DATA ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.iot_sensor_data (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id         UUID,
  user_id         UUID REFERENCES public.users(id) ON DELETE CASCADE,
  sensor_type     TEXT,
  soil_moisture   NUMERIC,
  temperature     NUMERIC,
  humidity        NUMERIC,
  nitrogen        NUMERIC,
  phosphorus      NUMERIC,
  potassium       NUMERIC,
  ph_level        NUMERIC,
  light_intensity NUMERIC,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── INDEXES ──────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_disease_user ON public.disease_predictions(user_id);
CREATE INDEX IF NOT EXISTS idx_disease_created ON public.disease_predictions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_disease_state ON public.disease_predictions(state);
CREATE INDEX IF NOT EXISTS idx_recommendations_user ON public.recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_weather_city ON public.weather_logs(city);
CREATE INDEX IF NOT EXISTS idx_weather_created ON public.weather_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chatbot_user ON public.chatbot_history(user_id);
CREATE INDEX IF NOT EXISTS idx_forum_category ON public.forum_posts(category);
CREATE INDEX IF NOT EXISTS idx_forum_created ON public.forum_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_marketplace_category ON public.marketplace_products(category);
CREATE INDEX IF NOT EXISTS idx_iot_user ON public.iot_sensor_data(user_id, created_at DESC);

-- ─── ROW LEVEL SECURITY ────────────────────────────────────
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disease_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.iot_sensor_data ENABLE ROW LEVEL SECURITY;

-- Users can only read/update their own data
CREATE POLICY "users_own_data" ON public.users FOR ALL USING (auth.uid()::text = id::text);
CREATE POLICY "disease_own_data" ON public.disease_predictions FOR ALL USING (auth.uid()::text = user_id::text);
CREATE POLICY "chatbot_own_data" ON public.chatbot_history FOR ALL USING (auth.uid()::text = user_id::text);
CREATE POLICY "notifications_own" ON public.notifications FOR ALL USING (auth.uid()::text = user_id::text);
CREATE POLICY "iot_own_data" ON public.iot_sensor_data FOR ALL USING (auth.uid()::text = user_id::text);

-- Public read for forum and marketplace
CREATE POLICY "forum_public_read" ON public.forum_posts FOR SELECT USING (true);
CREATE POLICY "marketplace_public_read" ON public.marketplace_products FOR SELECT USING (is_active = true);
CREATE POLICY "weather_public_read" ON public.weather_logs FOR SELECT USING (true);

-- ─── FUNCTIONS & TRIGGERS ──────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER forum_updated_at BEFORE UPDATE ON public.forum_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── REALTIME ─────────────────────────────────────────────
-- Enable realtime for these tables in Supabase dashboard:
-- disease_predictions, weather_logs, notifications, iot_sensor_data, forum_posts

-- ─── SEED DATA ────────────────────────────────────────────
-- Insert sample admin user (change password before production)
INSERT INTO public.users (name, email, phone, state, role, password_hash) VALUES
  ('AgroVision Admin', 'admin@agrovision.ai', '+919999999999', 'Maharashtra', 'admin', '$2b$12$placeholder_hash_change_this')
ON CONFLICT (email) DO NOTHING;

COMMENT ON TABLE public.users IS 'Platform users — farmers, agronomists, researchers';
COMMENT ON TABLE public.disease_predictions IS 'AI crop disease detection results';
COMMENT ON TABLE public.recommendations IS 'ML crop recommendation results';
COMMENT ON TABLE public.weather_logs IS 'Weather data cache and history';
COMMENT ON TABLE public.chatbot_history IS 'AI chatbot conversation history';
COMMENT ON TABLE public.iot_sensor_data IS 'IoT farm sensor readings';
