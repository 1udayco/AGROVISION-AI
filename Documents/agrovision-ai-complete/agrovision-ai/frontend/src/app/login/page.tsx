'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Leaf, Eye, EyeOff, Loader2, Github, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    try {
      const resp = await fetch('/api/backend/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!resp.ok) throw new Error((await resp.json()).message || 'Login failed');
      const { token } = await resp.json();
      localStorage.setItem('agrovision_token', token);
      toast.success('Welcome back!');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-mesh-gradient" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/30 flex items-center justify-center">
              <Leaf size={20} className="text-primary-400" />
            </div>
            <span className="font-display font-bold text-xl">
              <span className="text-primary-400">Agro</span>
              <span className="text-white">Vision</span>
              <span className="text-accent-400 text-xs ml-1 font-mono">AI</span>
            </span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your farmer account</p>
        </div>

        <div className="animated-border">
          <div className="card-dark rounded-[22px] p-8">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="farmer@example.com"
                    className="w-full bg-dark-600 border border-white/5 rounded-xl pl-9 pr-4 py-3 text-sm text-white focus:border-primary-500/50 focus:outline-none placeholder-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-dark-600 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-primary-500/50 focus:outline-none placeholder-gray-700 pr-10"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400">
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-white/10 bg-dark-600 text-primary-500" />
                  <span className="text-xs text-gray-500">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-xs text-primary-400 hover:text-primary-300">Forgot password?</Link>
              </div>

              <button type="submit" disabled={loading} className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <Loader2 size={18} className="animate-spin" /> : null}
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
              <div className="relative flex justify-center"><span className="bg-dark-700 px-3 text-xs text-gray-600">or continue with</span></div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/5 glass text-sm text-gray-300 hover:border-white/15 hover:text-white transition-all">
              <Github size={16} /> Sign in with GitHub
            </button>

            <p className="text-center text-xs text-gray-600 mt-5">
              Don't have an account?{' '}
              <Link href="/register" className="text-primary-400 hover:text-primary-300">Create one free</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
