'use client';

import Navbar from '@/components/layout/Navbar';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { Users, Activity, AlertTriangle, TrendingUp, Leaf, Brain, Cpu, Server } from 'lucide-react';

const diseaseData = [
  { month: 'Jan', blight: 145, rust: 89, mosaic: 67, wilt: 43 },
  { month: 'Feb', blight: 132, rust: 102, mosaic: 74, wilt: 38 },
  { month: 'Mar', blight: 167, rust: 118, mosaic: 89, wilt: 52 },
  { month: 'Apr', blight: 189, rust: 134, mosaic: 95, wilt: 61 },
  { month: 'May', blight: 234, rust: 156, mosaic: 112, wilt: 74 },
  { month: 'Jun', blight: 312, rust: 198, mosaic: 143, wilt: 98 },
];

const cropRecommendations = [
  { name: 'Soybean', value: 28 },
  { name: 'Cotton', value: 22 },
  { name: 'Wheat', value: 18 },
  { name: 'Rice', value: 16 },
  { name: 'Others', value: 16 },
];

const modelAccuracy = [
  { model: 'EfficientNet', accuracy: 98.7, f1: 97.9, precision: 98.2 },
  { model: 'ResNet50', accuracy: 96.3, f1: 95.8, precision: 96.1 },
  { model: 'XGBoost', accuracy: 94.8, f1: 94.1, precision: 94.5 },
  { model: 'LSTM', accuracy: 91.2, f1: 90.7, precision: 91.0 },
  { model: 'BERT', accuracy: 89.4, f1: 88.9, precision: 89.2 },
];

const COLORS = ['#22c55e', '#eab308', '#3b82f6', '#a855f7', '#f97316'];

const statCards = [
  { label: 'Total Users', value: '52,340', icon: <Users size={20} />, change: '+12%', color: 'text-primary-400', bg: 'bg-primary-500/10' },
  { label: 'Detections Today', value: '1,284', icon: <Activity size={20} />, change: '+8%', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { label: 'Active Alerts', value: '23', icon: <AlertTriangle size={20} />, change: '+3', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { label: 'Avg Yield Boost', value: '34%', icon: <TrendingUp size={20} />, change: '+4%', color: 'text-accent-400', bg: 'bg-accent-500/10' },
  { label: 'Crops Monitored', value: '189k', icon: <Leaf size={20} />, change: '+6%', color: 'text-primary-400', bg: 'bg-primary-500/10' },
  { label: 'AI Predictions', value: '1.2M', icon: <Brain size={20} />, change: '+15%', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { label: 'API Calls/hr', value: '48.3k', icon: <Cpu size={20} />, change: '-2%', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { label: 'Uptime', value: '99.9%', icon: <Server size={20} />, change: '30d', color: 'text-green-400', bg: 'bg-green-500/10' },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="badge-green">ADMIN ANALYTICS</span>
            <h1 className="font-display text-3xl font-bold mt-2 text-white">Analytics Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
            <span className="text-xs font-mono text-primary-400">LIVE</span>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map((s) => (
            <div key={s.label} className="card-dark">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center ${s.color}`}>
                  {s.icon}
                </div>
                <span className="text-xs text-gray-500 font-mono">{s.change}</span>
              </div>
              <p className={`font-display text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Disease trends */}
          <div className="lg:col-span-2 card-dark">
            <p className="text-xs font-mono text-gray-500 tracking-widest mb-4">DISEASE DETECTION TRENDS (6 MONTHS)</p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={diseaseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,197,94,0.05)" />
                <XAxis dataKey="month" tick={{ fill: '#6b9e7a', fontSize: 11 }} />
                <YAxis tick={{ fill: '#6b9e7a', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: 'rgba(4,15,10,0.95)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ color: '#6b9e7a', fontSize: 11 }} />
                {[
                  { key: 'blight', color: '#22c55e' },
                  { key: 'rust', color: '#eab308' },
                  { key: 'mosaic', color: '#3b82f6' },
                  { key: 'wilt', color: '#a855f7' },
                ].map((d) => (
                  <Area key={d.key} type="monotone" dataKey={d.key} stackId="1" stroke={d.color} fill={d.color} fillOpacity={0.15} />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Crop recommendations pie */}
          <div className="card-dark">
            <p className="text-xs font-mono text-gray-500 tracking-widest mb-4">TOP RECOMMENDED CROPS</p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={cropRecommendations} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} paddingAngle={3}>
                  {cropRecommendations.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'rgba(4,15,10,0.95)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-2">
              {cropRecommendations.map((c, i) => (
                <div key={c.name} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-xs text-gray-500">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Model accuracy */}
        <div className="card-dark mb-6">
          <p className="text-xs font-mono text-gray-500 tracking-widest mb-4">ML MODEL PERFORMANCE COMPARISON</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={modelAccuracy} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,197,94,0.05)" />
              <XAxis dataKey="model" tick={{ fill: '#6b9e7a', fontSize: 11 }} />
              <YAxis domain={[85, 100]} tick={{ fill: '#6b9e7a', fontSize: 11 }} unit="%" />
              <Tooltip contentStyle={{ background: 'rgba(4,15,10,0.95)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px' }} />
              <Legend wrapperStyle={{ color: '#6b9e7a', fontSize: 11 }} />
              <Bar dataKey="accuracy" fill="#22c55e" radius={[4, 4, 0, 0]} name="Accuracy" />
              <Bar dataKey="f1" fill="#3b82f6" radius={[4, 4, 0, 0]} name="F1 Score" />
              <Bar dataKey="precision" fill="#a855f7" radius={[4, 4, 0, 0]} name="Precision" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent activity */}
        <div className="card-dark">
          <p className="text-xs font-mono text-gray-500 tracking-widest mb-4">RECENT DISEASE DETECTIONS</p>
          <div className="space-y-2">
            {[
              { crop: 'Tomato', disease: 'Late Blight', farmer: 'Ramesh Patil', location: 'Nashik, MH', time: '2 min ago', severity: 'High', conf: '94.7%' },
              { crop: 'Rice', disease: 'Blast', farmer: 'Sukhwinder Singh', location: 'Ludhiana, PB', time: '8 min ago', severity: 'Medium', conf: '88.3%' },
              { crop: 'Cotton', disease: 'Leaf Curl Virus', farmer: 'Arjun Reddy', location: 'Guntur, AP', time: '15 min ago', severity: 'High', conf: '92.1%' },
              { crop: 'Wheat', disease: 'Yellow Rust', farmer: 'Rajveer Hooda', location: 'Haryana', time: '23 min ago', severity: 'Low', conf: '96.5%' },
              { crop: 'Banana', disease: 'Panama Wilt', farmer: 'Manoj Patel', location: 'Anand, GJ', time: '31 min ago', severity: 'Critical', conf: '97.8%' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary-500/5 transition-colors border border-transparent hover:border-primary-500/10">
                <div className="w-9 h-9 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <Leaf size={16} className="text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-semibold">{item.crop} — {item.disease}</p>
                  <p className="text-xs text-gray-500">{item.farmer} · {item.location}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    item.severity === 'Critical' ? 'bg-red-500/10 text-red-400' :
                    item.severity === 'High' ? 'bg-orange-500/10 text-orange-400' :
                    item.severity === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-green-500/10 text-green-400'
                  }`}>{item.severity}</span>
                  <p className="text-xs text-gray-600 mt-1 font-mono">{item.conf} · {item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
