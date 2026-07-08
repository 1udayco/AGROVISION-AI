'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { User, Mail, Phone, MapPin, Save, Loader2, Shield, Bell, BarChart2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const [form, setForm] = useState({ name: 'Ramesh Patil', email: 'ramesh@example.com', phone: '+91 98765 43210', state: 'Maharashtra', bio: 'Sugarcane and soybean farmer for 15 years.' });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    toast.success('Profile updated!');
  };

  const stats = [
    { label: 'Analyses Run', value: '284', icon: <BarChart2 size={16} />, color: 'text-primary-400' },
    { label: 'Recommendations', value: '47', icon: <BarChart2 size={16} />, color: 'text-accent-400' },
    { label: 'Forum Posts', value: '12', icon: <BarChart2 size={16} />, color: 'text-blue-400' },
    { label: 'Member Since', value: 'Jan 2024', icon: <Shield size={16} />, color: 'text-purple-400' },
  ];

  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />
      <div className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-400">RP</span>
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-white">{form.name}</h1>
            <p className="text-gray-500 text-sm">Farmer · Maharashtra</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="card-dark text-center">
              <div className={`flex justify-center mb-1 ${s.color}`}>{s.icon}</div>
              <p className={`font-display font-bold text-xl ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-600">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-dark space-y-4">
            <p className="text-xs font-mono text-primary-400 tracking-widest">PROFILE SETTINGS</p>
            {[
              { name: 'name', label: 'Full Name', icon: <User size={14} /> },
              { name: 'email', label: 'Email', icon: <Mail size={14} /> },
              { name: 'phone', label: 'Phone', icon: <Phone size={14} /> },
              { name: 'state', label: 'State', icon: <MapPin size={14} /> },
            ].map((f) => (
              <div key={f.name}>
                <label className="text-xs text-gray-500 mb-1.5 block">{f.label}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">{f.icon}</span>
                  <input
                    value={(form as any)[f.name]}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    className="w-full bg-dark-600 border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:border-primary-500/50 focus:outline-none"
                  />
                </div>
              </div>
            ))}
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={3}
                className="w-full bg-dark-600 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary-500/50 focus:outline-none resize-none"
              />
            </div>
            <button onClick={handleSave} disabled={saving} className="w-full btn-primary flex items-center justify-center gap-2">
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          <div className="space-y-4">
            <div className="card-dark">
              <p className="text-xs font-mono text-primary-400 tracking-widest mb-4">NOTIFICATIONS</p>
              {[
                { label: 'Disease Alerts', desc: 'Get notified about nearby crop disease outbreaks', on: true },
                { label: 'Weather Warnings', desc: 'Rain, drought and flood alerts for your region', on: true },
                { label: 'Government Schemes', desc: 'New scheme announcements and deadlines', on: false },
                { label: 'Market Prices', desc: 'Daily mandi price updates for your crops', on: false },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-sm text-white">{n.label}</p>
                    <p className="text-xs text-gray-600">{n.desc}</p>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${n.on ? 'bg-primary-500' : 'bg-dark-600 border border-white/10'}`}>
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${n.on ? 'right-0.5' : 'left-0.5'}`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="card-dark">
              <p className="text-xs font-mono text-primary-400 tracking-widest mb-4">SECURITY</p>
              <button className="w-full btn-outline text-sm">Change Password</button>
              <button className="w-full mt-2 py-2.5 rounded-xl border border-red-500/20 text-red-400 text-sm hover:bg-red-500/10 transition-colors">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
