'use client';

import Navbar from '@/components/layout/Navbar';
import { useIoTSensor } from '@/hooks/useRealtime';
import { Wifi, Thermometer, Droplets, Zap, Activity, Wind } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { useState, useEffect } from 'react';

export default function IoTPage() {
  const { sensorData } = useIoTSensor('farm-001');
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    setHistory((prev) => [
      ...prev.slice(-19),
      { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), ...sensorData },
    ]);
  }, [sensorData]);

  const sensors = [
    { label: 'Soil Moisture', value: `${sensorData.soil_moisture}%`, icon: <Droplets size={20} />, color: 'text-blue-400', bg: 'bg-blue-500/10', ideal: '50-70%', status: sensorData.soil_moisture >= 50 && sensorData.soil_moisture <= 70 ? 'Optimal' : 'Check' },
    { label: 'Temperature', value: `${sensorData.temperature}°C`, icon: <Thermometer size={20} />, color: 'text-orange-400', bg: 'bg-orange-500/10', ideal: '25-32°C', status: sensorData.temperature >= 25 && sensorData.temperature <= 32 ? 'Optimal' : 'Monitor' },
    { label: 'Humidity', value: `${sensorData.humidity}%`, icon: <Wind size={20} />, color: 'text-cyan-400', bg: 'bg-cyan-500/10', ideal: '55-75%', status: 'Optimal' },
    { label: 'Nitrogen (N)', value: `${sensorData.nitrogen} ppm`, icon: <Zap size={20} />, color: 'text-primary-400', bg: 'bg-primary-500/10', ideal: '30-50 ppm', status: 'Optimal' },
    { label: 'Soil pH', value: sensorData.ph, icon: <Activity size={20} />, color: 'text-purple-400', bg: 'bg-purple-500/10', ideal: '6.0-7.0', status: sensorData.ph >= 6.0 && sensorData.ph <= 7.0 ? 'Optimal' : 'Adjust' },
    { label: 'Light Intensity', value: `${(sensorData.light_intensity / 1000).toFixed(1)}k lux`, icon: <Zap size={20} />, color: 'text-yellow-400', bg: 'bg-yellow-500/10', ideal: '>30k lux', status: 'Good' },
  ];

  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="badge-green">IOT SENSORS</span>
            <h1 className="font-display text-3xl font-bold mt-2 text-white">Live Farm Sensor Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Farm ID: farm-001 · 6 sensors active · Data refreshes every 3s</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-primary-500/20">
            <Wifi size={14} className="text-primary-400 animate-pulse" />
            <span className="text-xs font-mono text-primary-400">LIVE</span>
          </div>
        </div>

        {/* Sensor Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {sensors.map((s) => (
            <div key={s.label} className="card-dark">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center ${s.color}`}>{s.icon}</div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  s.status === 'Optimal' || s.status === 'Good' ? 'bg-green-500/10 text-green-400' :
                  s.status === 'Monitor' ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-red-500/10 text-red-400'
                }`}>{s.status}</span>
              </div>
              <p className={`font-display text-2xl font-bold ${s.color} transition-all duration-500`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              <p className="text-xs text-gray-700 mt-0.5">Ideal: {s.ideal}</p>
            </div>
          ))}
        </div>

        {/* Live Chart */}
        <div className="card-dark">
          <p className="text-xs font-mono text-gray-500 tracking-widest mb-4">REAL-TIME SOIL MOISTURE & TEMPERATURE TREND</p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,197,94,0.05)" />
              <XAxis dataKey="time" tick={{ fill: '#6b9e7a', fontSize: 10 }} interval={2} />
              <YAxis yAxisId="left" tick={{ fill: '#6b9e7a', fontSize: 10 }} unit="%" />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#f97316', fontSize: 10 }} unit="°" />
              <Tooltip contentStyle={{ background: 'rgba(4,15,10,0.95)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px', fontSize: 11 }} />
              <Line yAxisId="left" type="monotone" dataKey="soil_moisture" stroke="#22c55e" strokeWidth={2} dot={false} name="Soil Moisture" />
              <Line yAxisId="right" type="monotone" dataKey="temperature" stroke="#f97316" strokeWidth={2} dot={false} name="Temperature" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}
