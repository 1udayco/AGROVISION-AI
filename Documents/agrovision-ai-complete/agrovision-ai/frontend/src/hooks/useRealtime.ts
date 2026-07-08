'use client';

import { useEffect, useRef, useState } from 'react';

// Realtime subscription hook (mock-safe without supabase connection)
export function useRealtimeDetections(limit = 10) {
  const [detections, setDetections] = useState<any[]>([]);

  useEffect(() => {
    // Mock realtime feed — replace with supabase.channel() in production
    const interval = setInterval(() => {
      const DISEASES = ['Late Blight', 'Early Blight', 'Leaf Rust', 'Mosaic Virus', 'Powdery Mildew'];
      const CROPS = ['Tomato', 'Potato', 'Rice', 'Wheat', 'Cotton', 'Maize'];
      const STATES = ['Maharashtra', 'Punjab', 'Karnataka', 'Andhra Pradesh', 'Uttar Pradesh'];
      const SEV = ['Low', 'Medium', 'High', 'Critical'];
      setDetections((prev) => [
        {
          id: Date.now(),
          crop: CROPS[Math.floor(Math.random() * CROPS.length)],
          disease: DISEASES[Math.floor(Math.random() * DISEASES.length)],
          severity: SEV[Math.floor(Math.random() * SEV.length)],
          state: STATES[Math.floor(Math.random() * STATES.length)],
          confidence: (Math.random() * 15 + 83).toFixed(1),
          created_at: new Date().toISOString(),
        },
        ...prev,
      ].slice(0, limit));
    }, 4000);

    return () => clearInterval(interval);
  }, [limit]);

  return { detections };
}

export function useIoTSensor(farmId: string) {
  const [sensorData, setSensorData] = useState({
    soil_moisture: 58.4,
    temperature: 29.1,
    humidity: 64.2,
    nitrogen: 38.5,
    ph: 6.72,
    light_intensity: 42000,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData((prev) => ({
        soil_moisture: +(prev.soil_moisture + (Math.random() - 0.5) * 2).toFixed(1),
        temperature: +(prev.temperature + (Math.random() - 0.5) * 0.5).toFixed(1),
        humidity: +(prev.humidity + (Math.random() - 0.5) * 1.5).toFixed(1),
        nitrogen: +(prev.nitrogen + (Math.random() - 0.5) * 0.3).toFixed(1),
        ph: +(prev.ph + (Math.random() - 0.5) * 0.05).toFixed(2),
        light_intensity: Math.floor(prev.light_intensity + (Math.random() - 0.5) * 2000),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, [farmId]);

  return { sensorData };
}
