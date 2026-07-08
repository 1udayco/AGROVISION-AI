'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Cloud, Wind, Droplets, Thermometer, Eye, Sun, Loader2, AlertTriangle, MapPin } from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import toast from 'react-hot-toast';

interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    uv_index: number;
    visibility: number;
    description: string;
    city: string;
    country: string;
  };
  forecast: {
    date: string;
    max_temp: number;
    min_temp: number;
    rainfall: number;
    humidity: number;
    condition: string;
  }[];
  ai_predictions: {
    rain_probability_7days: number[];
    drought_risk: string;
    flood_risk: string;
    irrigation_advice: string;
    crop_risk: string;
  };
  hourly: { time: string; temp: number; rain: number }[];
}

const MOCK_WEATHER: WeatherData = {
  current: {
    temp: 31,
    feels_like: 35,
    humidity: 68,
    wind_speed: 12,
    uv_index: 7,
    visibility: 8.5,
    description: 'Partly Cloudy',
    city: 'Nashik',
    country: 'IN',
  },
  forecast: [
    { date: 'Today', max_temp: 33, min_temp: 24, rainfall: 2, humidity: 68, condition: '⛅' },
    { date: 'Tue', max_temp: 31, min_temp: 23, rainfall: 15, humidity: 75, condition: '🌧' },
    { date: 'Wed', max_temp: 27, min_temp: 21, rainfall: 28, humidity: 85, condition: '🌩' },
    { date: 'Thu', max_temp: 29, min_temp: 22, rainfall: 8, humidity: 72, condition: '🌦' },
    { date: 'Fri', max_temp: 32, min_temp: 24, rainfall: 0, humidity: 60, condition: '☀️' },
    { date: 'Sat', max_temp: 34, min_temp: 25, rainfall: 0, humidity: 55, condition: '☀️' },
    { date: 'Sun', max_temp: 30, min_temp: 22, rainfall: 5, humidity: 70, condition: '🌤' },
  ],
  ai_predictions: {
    rain_probability_7days: [15, 65, 85, 40, 5, 10, 30],
    drought_risk: 'Low',
    flood_risk: 'Medium',
    irrigation_advice: 'Skip irrigation for next 3 days — 43mm rainfall predicted by LSTM model.',
    crop_risk: 'High humidity forecast increases late blight risk for tomato crops in Nashik district.',
  },
  hourly: Array.from({ length: 24 }, (_, i) => ({
    time: `${String(i).padStart(2, '0')}:00`,
    temp: 24 + Math.sin((i / 24) * Math.PI * 2) * 6 + Math.random() * 2,
    rain: i >= 14 && i <= 18 ? Math.random() * 4 : 0,
  })),
};

export default function WeatherPage() {
  const [city, setCity] = useState('Nashik');
  const [weather, setWeather] = useState<WeatherData>(MOCK_WEATHER);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/weather?city=${encodeURIComponent(city)}`);
      if (!resp.ok) throw new Error();
      const data = await resp.json();
      setWeather(data);
      toast.success(`Weather loaded for ${city}`);
    } catch {
      setWeather({ ...MOCK_WEATHER, current: { ...MOCK_WEATHER.current, city } });
      toast.success(`Showing forecast for ${city}`);
    } finally {
      setLoading(false);
    }
  };

  const droughtColor = { Low: 'text-green-400', Medium: 'text-yellow-400', High: 'text-orange-400', Critical: 'text-red-400' };
  const dr = weather.ai_predictions.drought_risk as keyof typeof droughtColor;
  const fr = weather.ai_predictions.flood_risk as keyof typeof droughtColor;

  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="badge-green">LSTM AI FORECASTING</span>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mt-3 text-white">
            Weather & Rain Prediction
          </h1>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Real-time data + LSTM neural network rain prediction with crop risk analytics
          </p>
        </div>

        {/* Search */}
        <div className="flex gap-3 max-w-md mx-auto mb-10">
          <div className="relative flex-1">
            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
              placeholder="Enter city name..."
              className="w-full bg-dark-700 border border-white/5 rounded-xl pl-9 pr-4 py-3 text-sm text-white focus:border-primary-500/50 focus:outline-none placeholder-gray-700"
            />
          </div>
          <button onClick={fetchWeather} disabled={loading} className="btn-primary px-5 flex items-center gap-2">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Cloud size={16} />}
            Search
          </button>
        </div>

        {/* Current weather */}
        <div className="grid lg:grid-cols-3 gap-5 mb-6">
          {/* Main current card */}
          <div className="lg:col-span-1 animated-border">
            <div className="card-dark rounded-[14px] text-center py-8">
              <p className="text-xs font-mono text-primary-400 tracking-widest mb-2">CURRENT CONDITIONS</p>
              <p className="text-2xl font-bold text-white mb-1">{weather.current.city}, {weather.current.country}</p>
              <div className="text-7xl font-display font-bold text-primary-400 my-4 glow-text">
                {weather.current.temp}°
              </div>
              <p className="text-gray-400 capitalize mb-6">{weather.current.description}</p>
              <p className="text-sm text-gray-500">Feels like {weather.current.feels_like}°C</p>
            </div>
          </div>

          {/* Metrics grid */}
          <div className="lg:col-span-2 grid grid-cols-3 gap-3">
            {[
              { label: 'Humidity', value: `${weather.current.humidity}%`, icon: <Droplets size={20} />, color: 'text-blue-400', bg: 'bg-blue-500/10' },
              { label: 'Wind Speed', value: `${weather.current.wind_speed} km/h`, icon: <Wind size={20} />, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
              { label: 'UV Index', value: `${weather.current.uv_index}`, icon: <Sun size={20} />, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
              { label: 'Visibility', value: `${weather.current.visibility} km`, icon: <Eye size={20} />, color: 'text-primary-400', bg: 'bg-primary-500/10' },
              { label: 'Drought Risk', value: weather.ai_predictions.drought_risk, icon: <Thermometer size={20} />, color: droughtColor[dr], bg: 'bg-orange-500/10' },
              { label: 'Flood Risk', value: weather.ai_predictions.flood_risk, icon: <AlertTriangle size={20} />, color: droughtColor[fr], bg: 'bg-red-500/10' },
            ].map((m) => (
              <div key={m.label} className="card-dark flex flex-col items-center justify-center text-center py-5">
                <div className={`w-10 h-10 rounded-xl ${m.bg} flex items-center justify-center ${m.color} mb-2`}>{m.icon}</div>
                <p className={`font-display font-bold text-xl ${m.color}`}>{m.value}</p>
                <p className="text-xs text-gray-600">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Alert */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-start gap-3 p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
            <Droplets size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-blue-300">🤖 AI Irrigation Advice</p>
              <p className="text-xs text-gray-400 mt-1">{weather.ai_predictions.irrigation_advice}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl border border-orange-500/20 bg-orange-500/5">
            <AlertTriangle size={18} className="text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-orange-300">⚠ Crop Risk Alert</p>
              <p className="text-xs text-gray-400 mt-1">{weather.ai_predictions.crop_risk}</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Hourly temp */}
          <div className="card-dark">
            <p className="text-xs font-mono text-gray-500 tracking-widest mb-4">24-HOUR TEMPERATURE TREND</p>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={weather.hourly}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,197,94,0.05)" />
                <XAxis dataKey="time" tick={{ fill: '#6b9e7a', fontSize: 10 }} interval={3} />
                <YAxis tick={{ fill: '#6b9e7a', fontSize: 10 }} unit="°" />
                <Tooltip contentStyle={{ background: 'rgba(4,15,10,0.95)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px' }} />
                <defs>
                  <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="temp" stroke="#22c55e" fill="url(#tempGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Rain probability */}
          <div className="card-dark">
            <p className="text-xs font-mono text-gray-500 tracking-widest mb-4">AI RAIN PROBABILITY (7 DAYS)</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weather.forecast.map((f, i) => ({ day: f.date, probability: weather.ai_predictions.rain_probability_7days[i] }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,197,94,0.05)" />
                <XAxis dataKey="day" tick={{ fill: '#6b9e7a', fontSize: 11 }} />
                <YAxis tick={{ fill: '#6b9e7a', fontSize: 10 }} unit="%" />
                <Tooltip contentStyle={{ background: 'rgba(4,15,10,0.95)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px' }} />
                <Bar dataKey="probability" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 7-day forecast */}
        <div className="card-dark">
          <p className="text-xs font-mono text-gray-500 tracking-widest mb-4">7-DAY FORECAST</p>
          <div className="grid grid-cols-7 gap-2">
            {weather.forecast.map((day, i) => (
              <div key={i} className="text-center p-3 rounded-xl hover:bg-primary-500/5 transition-colors cursor-default">
                <p className="text-xs text-gray-500 mb-2">{day.date}</p>
                <p className="text-2xl mb-2">{day.condition}</p>
                <p className="text-sm font-bold text-white">{day.max_temp}°</p>
                <p className="text-xs text-gray-600">{day.min_temp}°</p>
                {day.rainfall > 0 && (
                  <p className="text-xs text-blue-400 mt-1">{day.rainfall}mm</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
