import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: { id: string; email: string; name: string; phone: string; state: string; role: string; created_at: string };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>;
      };
      disease_predictions: {
        Row: { id: string; user_id: string; crop: string; disease: string; confidence: number; severity: string; image_url: string; created_at: string };
        Insert: Omit<Database['public']['Tables']['disease_predictions']['Row'], 'id' | 'created_at'>;
      };
      recommendations: {
        Row: { id: string; user_id: string; state: string; district: string; soil_type: string; top_crop: string; created_at: string };
        Insert: Omit<Database['public']['Tables']['recommendations']['Row'], 'id' | 'created_at'>;
      };
      weather_logs: {
        Row: { id: string; city: string; temperature: number; humidity: number; rainfall: number; created_at: string };
        Insert: Omit<Database['public']['Tables']['weather_logs']['Row'], 'id' | 'created_at'>;
      };
      chatbot_history: {
        Row: { id: string; user_id: string; role: string; content: string; created_at: string };
        Insert: Omit<Database['public']['Tables']['chatbot_history']['Row'], 'id' | 'created_at'>;
      };
      forum_posts: {
        Row: { id: string; user_id: string; title: string; content: string; category: string; likes: number; views: number; created_at: string };
        Insert: Omit<Database['public']['Tables']['forum_posts']['Row'], 'id' | 'created_at'>;
      };
      marketplace_products: {
        Row: { id: string; seller_id: string; name: string; price: number; unit: string; category: string; stock: number; created_at: string };
        Insert: Omit<Database['public']['Tables']['marketplace_products']['Row'], 'id' | 'created_at'>;
      };
    };
  };
};
