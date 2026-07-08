'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Leaf, Eye, EyeOff, Loader2, User, Mail, Phone, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const STATES = ['Maharashtra', 'Punjab', 'Uttar Pradesh', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu', 'Gujarat', 'Rajasthan', 'Madhya Pradesh', 'Bihar', 'Other'];

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', state: 'Maharashtra', password: '', confirm: '', role: 'farmer' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const resp = await fetch('/api/backend/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, state: form.state, password: form.password, role: form.role }),
      });
      if (!resp.ok) throw new Error((await resp.json()).message || 'Registration failed');
      toast.success('Account created! Please sign in.');
      router.push('/login');
    } catch (err: any) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark-900 flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-mesh-gradient" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/30 flex items-center justify-center">
              <Leaf size={20} className="text-primary-400" />
            </div>
            <span className="font-display font-bold text-xl">
              <span className="text-primary-400">Agro</span><span className="text-white">Vision</span>
              <span className="text-accent-400 text-xs ml-1 font-mono">AI</span>
            </span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-white">Create your account</h1>
          <p className="text-gray-500 text-sm mt-1">Join 52,000+ farmers using AI</p>
        </div>

        <div className="animated-border">
          <div className="card-dark rounded-[22px] p-8">
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Role selector */}
              <div className="flex gap-2 mb-2">
                {['farmer', 'agronomist', 'researcher'].map((r) => (
                  <button key={r} type="button"
                    onClick={() => setForm({ ...form, role: r })}
                    className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-all capitalize ${form.role === r ? 'bg-primary-500/20 border-primary-500/40 text-primary-300' : 'border-white/5 text-gray-500 hover:border-white/15'}`}>
                    {r}
                  </button>
                ))}
              </div>

              {[
                { name: 'name', label: 'Full Name', placeholder: 'Ramesh Patil', icon: <User size={14} />, type: 'text' },
                { name: 'email', label: 'Email Address', placeholder: 'farmer@example.com', icon: <Mail size={14} />, type: 'email' },
                { name: 'phone', label: 'Mobile Number', placeholder: '+91 98765 43210', icon: <Phone size={14} />, type: 'tel' },
              ].map((f) => (
                <div key={f.name}>
                  <label className="text-xs text-gray-500 mb-1.5 block">{f.label}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">{f.icon}</span>
                    <input name={f.name} type={f.type} value={(form as any)[f.name]} onChange={handleChange} placeholder={f.placeholder}
                      className="w-full bg-dark-600 border border-white/5 rounded-xl pl-9 pr-4 py-3 text-sm text-white focus:border-primary-500/50 focus:outline-none placeholder-gray-700" />
                  </div>
                </div>
              ))}

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">State</label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                  <select name="state" value={form.state} onChange={handleChange}
                    className="w-full bg-dark-600 border border-white/5 rounded-xl pl-9 pr-4 py-3 text-sm text-white focus:border-primary-500/50 focus:outline-none">
                    {STATES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {[
                { name: 'password', label: 'Password', placeholder: 'Min 6 characters' },
                { name: 'confirm', label: 'Confirm Password', placeholder: 'Repeat password' },
              ].map((f) => (
                <div key={f.name}>
                  <label className="text-xs text-gray-500 mb-1.5 block">{f.label}</label>
                  <div className="relative">
                    <input name={f.name} type={showPass ? 'text' : 'password'} value={(form as any)[f.name]} onChange={handleChange} placeholder={f.placeholder}
                      className="w-full bg-dark-600 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-primary-500/50 focus:outline-none placeholder-gray-700 pr-10" />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400">
                      {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
              ))}

              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" required className="mt-0.5 rounded border-white/10 bg-dark-600 text-primary-500" />
                <span className="text-xs text-gray-500">
                  I agree to the <Link href="#" className="text-primary-400 hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary-400 hover:underline">Privacy Policy</Link>
                </span>
              </label>

              <button type="submit" disabled={loading} className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <Loader2 size={18} className="animate-spin" /> : null}
                {loading ? 'Creating account...' : 'Create Free Account'}
              </button>
            </form>

            <p className="text-center text-xs text-gray-600 mt-5">
              Already have an account? <Link href="/login" className="text-primary-400 hover:text-primary-300">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
