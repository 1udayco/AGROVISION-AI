// AgroVision AI — Shared TypeScript Types

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  state?: string;
  role: 'farmer' | 'agronomist' | 'researcher' | 'admin';
  avatar_url?: string;
  created_at: string;
}

export interface DiseasePrediction {
  id: string;
  crop?: string;
  disease: string;
  confidence: number;
  severity: 'None' | 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  treatments: string[];
  fertilizers: string[];
  pesticides: string[];
  preventions: string[];
  image_url?: string;
  inference_ms?: number;
  created_at: string;
}

export interface CropRecommendation {
  top_crop: string;
  alternatives: string[];
  yield_prediction: number;
  revenue_estimate: number;
  water_requirement: number;
  fertilizer_plan: FertilizerPlan[];
  risk_score: number;
  confidence: number;
  radar_data: RadarPoint[];
}

export interface FertilizerPlan {
  nutrient: string;
  dose: string;
  timing: string;
}

export interface RadarPoint {
  metric: string;
  score: number;
}

export interface WeatherCurrent {
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  uv_index: number;
  visibility: number;
  description: string;
  city: string;
  country: string;
}

export interface WeatherForecastDay {
  date: string;
  max_temp: number;
  min_temp: number;
  rainfall: number;
  humidity: number;
  condition: string;
}

export interface WeatherAIPredictions {
  rain_probability_7days: number[];
  drought_risk: 'Low' | 'Medium' | 'High';
  flood_risk: 'Low' | 'Medium' | 'High';
  irrigation_advice: string;
  crop_risk: string;
}

export interface WeatherData {
  current: WeatherCurrent;
  forecast: WeatherForecastDay[];
  ai_predictions: WeatherAIPredictions;
  hourly: { time: string; temp: number; rain: number }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ForumPost {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  likes: number;
  views: number;
  created_at: string;
  users?: { name: string; state: string };
}

export interface MarketplaceProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  stock: number;
  rating: number;
  review_count: number;
  badge?: string;
  is_organic: boolean;
  location: string;
  images?: string[];
}

export interface IoTSensorData {
  soil_moisture: number;
  temperature: number;
  humidity: number;
  nitrogen: number;
  ph: number;
  light_intensity: number;
}

export interface AnalyticsDashboard {
  stats: {
    total_users: number;
    detections_today: number;
    total_detections: number;
    total_recommendations: number;
    model_accuracy: number;
    uptime: string;
  };
  disease_trends: {
    month: string;
    blight: number;
    rust: number;
    mosaic: number;
    wilt: number;
  }[];
}

export interface ApiError {
  error: string;
  message?: string;
  errors?: { msg: string; field: string }[];
}

export type Severity = 'None' | 'Low' | 'Medium' | 'High' | 'Critical';
export type UserRole = 'farmer' | 'agronomist' | 'researcher' | 'admin';
export type Season = 'Kharif' | 'Rabi' | 'Zaid' | 'Year-Round';
export type SoilType = 'Red Laterite' | 'Black Cotton' | 'Alluvial' | 'Sandy Loam' | 'Clay Loam' | 'Sandy' | 'Silty';
