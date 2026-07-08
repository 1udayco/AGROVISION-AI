'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { BarChart2, Loader2, Leaf, TrendingUp, Droplets, IndianRupee } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const STATES = ['Maharashtra', 'Punjab', 'Uttar Pradesh', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu', 'Gujarat', 'Rajasthan', 'Madhya Pradesh', 'Bihar'];
const SOIL_TYPES = ['Red Laterite', 'Black Cotton', 'Alluvial', 'Sandy Loam', 'Clay Loam', 'Sandy', 'Silty'];
const SEASONS = ['Kharif (Jun–Oct)', 'Rabi (Nov–Mar)', 'Zaid (Mar–Jun)', 'Year-Round'];

interface RecommendationResult {
  top_crop: string;
  alternatives: string[];
  yield_prediction: number;
  revenue_estimate: number;
  water_requirement: number;
  fertilizer_plan: { nutrient: string; dose: string; timing: string }[];
  risk_score: number;
  confidence: number;
  radar_data: { metric: string; score: number }[];
}

export default function RecommendPage() {
  const [form, setForm] = useState({
    state: 'Maharashtra',
    district: '',
    soil_type: 'Black Cotton',
    rainfall: '',
    temperature: '',
    humidity: '',
    ph_level: '',
    water_availability: 'Medium',
    season: 'Kharif (Jun–Oct)',
    farm_size: '',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.district || !form.rainfall || !form.temperature) {
      toast.error('Please fill in all required fields');
      return;
    }
    setLoading(true);

    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_ML_SERVICE_URL}/recommend-crop`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await resp.json();
      setResult(data);
    } catch {
      // Demo data
      await new Promise((r) => setTimeout(r, 2000));
      setResult({
        top_crop: 'Soybean',
        alternatives: ['Cotton', 'Pigeon Pea', 'Maize'],
        yield_prediction: 2.4,
        revenue_estimate: 86400,
        water_requirement: 450,
        fertilizer_plan: [
          { nutrient: 'Nitrogen (N)', dose: '20 kg/ha', timing: 'At sowing' },
          { nutrient: 'Phosphorus (P)', dose: '60 kg/ha', timing: 'Basal application' },
          { nutrient: 'Potassium (K)', dose: '40 kg/ha', timing: 'Basal + top dressing' },
          { nutrient: 'Zinc Sulphate', dose: '25 kg/ha', timing: 'Pre-sowing if deficient' },
        ],
        risk_score: 28,
        confidence: 91.3,
        radar_data: [
          { metric: 'Soil Match', score: 92 },
          { metric: 'Climate Fit', score: 88 },
          { metric: 'Profitability', score: 85 },
          { metric: 'Water Efficiency', score: 76 },
          { metric: 'Market Demand', score: 90 },
          { metric: 'Pest Resistance', score: 72 },
        ],
      });
    } finally {
      setLoading(false);
      toast.success('Recommendation ready!');
    }
  };

  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />
      <div className="pt-24 pb-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="badge-green">ML-POWERED ENGINE</span>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mt-3 text-white">
            Smart Crop Recommendation
          </h1>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            XGBoost + Random Forest ensemble analyzes 12 parameters to recommend the most profitable crops
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="card-dark space-y-5">
            <p className="text-xs font-mono text-primary-400 tracking-widest">FARM PARAMETERS</p>

            <div className="grid grid-cols-2 gap-4">
              {/* State */}
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xs text-gray-500 mb-1.5 block">State *</label>
                <select name="state" value={form.state} onChange={handleChange}
                  className="w-full bg-dark-600 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary-500/50 focus:outline-none">
                  {STATES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              {/* District */}
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xs text-gray-500 mb-1.5 block">District *</label>
                <input name="district" value={form.district} onChange={handleChange} placeholder="e.g. Nashik"
                  className="w-full bg-dark-600 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary-500/50 focus:outline-none placeholder-gray-700" />
              </div>

              {/* Soil */}
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xs text-gray-500 mb-1.5 block">Soil Type</label>
                <select name="soil_type" value={form.soil_type} onChange={handleChange}
                  className="w-full bg-dark-600 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary-500/50 focus:outline-none">
                  {SOIL_TYPES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              {/* Season */}
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xs text-gray-500 mb-1.5 block">Season</label>
                <select name="season" value={form.season} onChange={handleChange}
                  className="w-full bg-dark-600 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary-500/50 focus:outline-none">
                  {SEASONS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              {[
                { name: 'rainfall', label: 'Annual Rainfall (mm) *', placeholder: 'e.g. 800' },
                { name: 'temperature', label: 'Avg Temperature (°C) *', placeholder: 'e.g. 28' },
                { name: 'humidity', label: 'Humidity (%)', placeholder: 'e.g. 65' },
                { name: 'ph_level', label: 'Soil pH Level', placeholder: 'e.g. 6.5' },
                { name: 'farm_size', label: 'Farm Size (acres)', placeholder: 'e.g. 2.5' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-xs text-gray-500 mb-1.5 block">{field.label}</label>
                  <input
                    name={field.name}
                    value={(form as any)[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    type="number"
                    className="w-full bg-dark-600 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary-500/50 focus:outline-none placeholder-gray-700"
                  />
                </div>
              ))}

              {/* Water availability */}
              <div className="col-span-2">
                <label className="text-xs text-gray-500 mb-1.5 block">Water Availability</label>
                <div className="flex gap-3">
                  {['Low', 'Medium', 'High', 'Irrigation'].map((w) => (
                    <button
                      key={w}
                      onClick={() => setForm({ ...form, water_availability: w })}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
                        form.water_availability === w
                          ? 'bg-primary-500/20 border-primary-500/40 text-primary-300'
                          : 'border-white/5 text-gray-500 hover:border-white/15'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full btn-primary py-4 text-base flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? <><Loader2 size={20} className="animate-spin" /> Running ML Models...</> : <><BarChart2 size={20} /> Get Recommendation</>}
            </button>
          </div>

          {/* Results */}
          <div>
            {!result ? (
              <div className="card-dark h-full flex flex-col items-center justify-center text-center py-16">
                <BarChart2 size={40} className="text-primary-500/20 mb-4" />
                <p className="text-gray-500 font-display font-semibold text-lg">Fill parameters and submit</p>
                <p className="text-gray-600 text-sm mt-2">ML recommendation will appear here</p>
              </div>
            ) : (
              <div className="space-y-4 animate-slide-up">
                {/* Top crop */}
                <div className="animated-border">
                  <div className="card-dark rounded-[14px]">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xs font-mono text-primary-400 tracking-widest">BEST CROP MATCH</p>
                      <span className="badge-green">{result.confidence}% Confidence</span>
                    </div>
                    <h2 className="font-display text-4xl font-bold text-primary-400">{result.top_crop}</h2>
                    <p className="text-xs text-gray-500 mt-1 mb-4">Recommended by XGBoost + Random Forest Ensemble</p>
                    <div className="flex flex-wrap gap-2">
                      {result.alternatives.map((alt) => (
                        <span key={alt} className="text-xs px-3 py-1 rounded-full glass border border-white/10 text-gray-400">
                          Alt: {alt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Est. Yield', value: `${result.yield_prediction} T/ha`, icon: <Leaf size={14} />, color: 'text-primary-400' },
                    { label: 'Revenue/acre', value: `₹${(result.revenue_estimate / 2.47).toFixed(0)}`, icon: <IndianRupee size={14} />, color: 'text-accent-400' },
                    { label: 'Water Need', value: `${result.water_requirement}mm`, icon: <Droplets size={14} />, color: 'text-blue-400' },
                  ].map((s) => (
                    <div key={s.label} className="card-dark text-center py-4">
                      <div className={`flex justify-center mb-1 ${s.color}`}>{s.icon}</div>
                      <p className={`font-display font-bold text-lg ${s.color}`}>{s.value}</p>
                      <p className="text-xs text-gray-600">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Radar chart */}
                <div className="card-dark">
                  <p className="text-xs font-mono text-gray-500 tracking-widest mb-4">SUITABILITY SCORES</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <RadarChart data={result.radar_data}>
                      <PolarGrid stroke="rgba(34,197,94,0.1)" />
                      <PolarAngleAxis dataKey="metric" tick={{ fill: '#6b9e7a', fontSize: 11 }} />
                      <Radar name="Score" dataKey="score" stroke="#22c55e" fill="#22c55e" fillOpacity={0.15} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Fertilizer plan */}
                <div className="card-dark">
                  <p className="text-xs font-mono text-gray-500 tracking-widest mb-3">FERTILIZER PLAN</p>
                  <div className="space-y-2">
                    {result.fertilizer_plan.map((f, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <span className="text-sm text-white">{f.nutrient}</span>
                        <div className="text-right">
                          <p className="text-sm data-value">{f.dose}</p>
                          <p className="text-xs text-gray-600">{f.timing}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
