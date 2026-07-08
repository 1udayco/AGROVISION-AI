'use client';

import { useState, useEffect, useCallback } from 'react';
import { weatherAPI } from '@/lib/api';

export interface WeatherData {
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

export function useWeather(initialCity = 'Mumbai') {
  const [city, setCity] = useState(initialCity);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async (c: string) => {
    setLoading(true);
    setError(null);
    try {
      const resp = await weatherAPI.getCurrent(c);
      setWeather(resp.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch(city);
  }, []);

  return { weather, loading, error, city, setCity, refetch: () => fetch(city) };
}
