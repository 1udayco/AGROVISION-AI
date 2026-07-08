'use client';

import Navbar from '@/components/layout/Navbar';
import { Satellite, TrendingUp, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

const NDVI_DATA = [
  { week: 'W1 Jun', ndvi: 0.42, health: 65 },
  { week: 'W2 Jun', ndvi: 0.51, health: 72 },
  { week: 'W3 Jun', ndvi: 0.63, health: 81 },
  { week: 'W4 Jun', ndvi: 0.71, health: 87 },
  { week: 'W1 Jul', ndvi: 0.68, health: 84 },
  { week: 'W2 Jul', ndvi: 0.74, health: 89 },
  { week: 'W3 Jul', ndvi: 0.69, health: 85 },
  { week: 'W4 Jul', ndvi: 0.76, health: 91 },
];

const REGIONS = [
  { name: 'Nashik District', crops: 'Grapes, Onion, Tomato', ndvi: 0.72, health: 88, alert: null },
  { name: 'Pune District', crops: 'Sugarcane, Wheat', ndvi: 0.65, health: 80, alert: 'Low NDVI detected in eastern sector' },
  { name: 'Nagpur District', crops: 'Orange, Soybean', ndvi: 0.78, health: 92, alert: null },
  { name: 'Aurangabad', crops: 'Cotton, Pigeon Pea', ndvi: 0.58, health: 73, alert: 'Drought stress indicators' },
];

export default function SatellitePage() {
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);

  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="badge-green">NASA SATELLITE DATA</span>
            <h1 className="font-display text-3xl font-bold mt-2 text-white">Satellite Crop Monitoring</h1>
            <p className="text-gray-500 text-sm mt-1">NDVI analysis from Sentinel-2 + Landsat-8 imagery · Updated weekly</p>
          </div>
          <button className="btn-outline flex items-center gap-2 text-sm">
            <RefreshCw size={14} /> Refresh Data
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Region list */}
          <div className="space-y-3">
            <p className="text-xs font-mono text-gray-500 tracking-widest">MONITORED REGIONS</p>
            {REGIONS.map((r) => (
              <div
                key={r.name}
                onClick={() => setSelectedRegion(r)}
                className={`card-dark cursor-pointer transition-all ${selectedRegion.name === r.name ? 'border-primary-500/40 bg-primary-500/5' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{r.name}</p>
                    <p className="text-xs text-gray-500">{r.crops}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-mono text-sm font-bold ${r.ndvi > 0.7 ? 'text-primary-400' : r.ndvi > 0.6 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {r.ndvi}
                    </p>
                    <p className="text-xs text-gray-600">NDVI</p>
                  </div>
                </div>
                {r.alert && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-yellow-400">
                    <AlertTriangle size={11} /> {r.alert}
                  </div>
                )}
                <div className="mt-2 h-1.5 bg-dark-600 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-400 rounded-full" style={{ width: `${r.health}%` }} />
                </div>
                <p className="text-xs text-gray-600 mt-1">{r.health}% crop health index</p>
              </div>
            ))}
          </div>

          {/* Main panel */}
          <div className="lg:col-span-2 space-y-5">
            {/* Satellite map placeholder */}
            <div className="card-dark h-64 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-primary-900/20 to-yellow-900/20" />
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="relative text-center">
                <Satellite size={40} className="text-primary-400 mx-auto mb-3 animate-float" />
                <p className="text-white font-display font-bold">{selectedRegion.name}</p>
                <p className="text-gray-400 text-sm">NDVI Heatmap — {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
                <p className="text-xs text-gray-600 mt-1">Connect Mapbox token to render satellite tiles</p>
              </div>
            </div>

            {/* NDVI stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'NDVI Score', value: selectedRegion.ndvi, color: 'text-primary-400' },
                { label: 'Health Index', value: `${selectedRegion.health}%`, color: 'text-accent-400' },
                { label: 'Alert Status', value: selectedRegion.alert ? '⚠ Alert' : '✓ Normal', color: selectedRegion.alert ? 'text-yellow-400' : 'text-green-400' },
              ].map((s) => (
                <div key={s.label} className="card-dark text-center">
                  <p className={`font-display text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-gray-600">{s.label}</p>
                </div>
              ))}
            </div>

            {/* NDVI trend chart */}
            <div className="card-dark">
              <p className="text-xs font-mono text-gray-500 tracking-widest mb-4">NDVI TREND — 8 WEEKS</p>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={NDVI_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,197,94,0.05)" />
                  <XAxis dataKey="week" tick={{ fill: '#6b9e7a', fontSize: 10 }} />
                  <YAxis domain={[0, 1]} tick={{ fill: '#6b9e7a', fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: 'rgba(4,15,10,0.95)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px' }} />
                  <defs>
                    <linearGradient id="ndviGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="ndvi" stroke="#22c55e" fill="url(#ndviGrad)" strokeWidth={2} name="NDVI" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
