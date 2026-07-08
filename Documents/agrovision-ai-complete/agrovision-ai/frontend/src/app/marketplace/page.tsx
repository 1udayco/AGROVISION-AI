'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { ShoppingBag, Search, Filter, Star, MapPin, Package, TrendingUp, Leaf } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: 'Organic Neem Oil Pesticide', seller: 'Patil Agro Store', location: 'Nashik, MH', price: 450, unit: '/L', rating: 4.8, reviews: 124, category: 'Pesticides', badge: 'Organic', stock: 'In Stock' },
  { id: 2, name: 'NPK 19-19-19 Fertilizer', seller: 'Kisan Depot', location: 'Pune, MH', price: 1200, unit: '/50kg', rating: 4.6, reviews: 89, category: 'Fertilizers', badge: 'Best Seller', stock: 'In Stock' },
  { id: 3, name: 'Bt Cotton Seeds — Bunny BG-II', seller: 'Seed World', location: 'Nagpur, MH', price: 830, unit: '/450g', rating: 4.9, reviews: 312, category: 'Seeds', badge: 'Top Rated', stock: 'Limited' },
  { id: 4, name: 'Drip Irrigation Kit (2 acre)', seller: 'Jain Irrigation', location: 'Jalgaon, MH', price: 18500, unit: '/set', rating: 4.7, reviews: 67, category: 'Equipment', badge: 'Govt Subsidy', stock: 'In Stock' },
  { id: 5, name: 'Soil Testing Kit (Digital)', seller: 'AgriTech India', location: 'Hyderabad, TS', price: 2800, unit: '/kit', rating: 4.5, reviews: 43, category: 'Equipment', badge: 'New', stock: 'In Stock' },
  { id: 6, name: 'Hybrid Tomato Seeds — Namdhari 503', seller: 'Namdhari Seeds', location: 'Bengaluru, KA', price: 320, unit: '/10g', rating: 4.8, reviews: 198, category: 'Seeds', badge: 'Popular', stock: 'In Stock' },
];

const CATEGORIES = ['All', 'Seeds', 'Fertilizers', 'Pesticides', 'Equipment', 'Tools', 'Organic'];

export default function MarketplacePage() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const filtered = PRODUCTS.filter(p =>
    (selectedCat === 'All' || p.category === selectedCat) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const badgeColor = (badge: string) => {
    const map: Record<string, string> = {
      'Organic': 'bg-green-500/10 text-green-400 border-green-500/20',
      'Best Seller': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      'Top Rated': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      'Govt Subsidy': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'New': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      'Popular': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      'Limited': 'bg-red-500/10 text-red-400 border-red-500/20',
    };
    return map[badge] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="badge-green">FARMER MARKETPLACE</span>
            <h1 className="font-display text-3xl font-bold mt-2 text-white">Agri Marketplace</h1>
            <p className="text-gray-500 text-sm mt-1">Seeds, fertilizers, equipment from verified sellers</p>
          </div>
          <button className="btn-outline flex items-center gap-2 text-sm">
            <ShoppingBag size={16} /> Sell Products
          </button>
        </div>

        {/* Market stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Active Listings', value: '12,400+', icon: <Package size={18} />, color: 'text-primary-400' },
            { label: 'Verified Sellers', value: '3,200+', icon: <Leaf size={18} />, color: 'text-accent-400' },
            { label: 'Orders This Month', value: '45,000+', icon: <TrendingUp size={18} />, color: 'text-blue-400' },
          ].map((s) => (
            <div key={s.label} className="card-dark flex items-center gap-3">
              <span className={s.color}>{s.icon}</span>
              <div>
                <p className={`font-display font-bold text-lg ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..."
              className="w-full bg-dark-700 border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:border-primary-500/50 focus:outline-none placeholder-gray-700" />
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="bg-dark-700 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-gray-300 focus:outline-none">
            <option value="popular">Most Popular</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setSelectedCat(c)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-medium border transition-all ${selectedCat === c ? 'bg-primary-500/20 border-primary-500/40 text-primary-300' : 'border-white/5 text-gray-500 hover:border-white/15'}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <div key={p.id} className="card-dark group cursor-pointer">
              {/* Product image placeholder */}
              <div className="h-40 rounded-xl bg-dark-600 border border-white/5 flex items-center justify-center mb-4 overflow-hidden">
                <div className="text-6xl opacity-30">🌱</div>
              </div>

              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-white text-sm leading-tight group-hover:text-primary-300 transition-colors">{p.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${badgeColor(p.badge)}`}>{p.badge}</span>
              </div>

              <div className="flex items-center gap-1 mb-1">
                <Star size={12} className="text-accent-400 fill-accent-400" />
                <span className="text-xs text-accent-400 font-medium">{p.rating}</span>
                <span className="text-xs text-gray-600">({p.reviews} reviews)</span>
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                <MapPin size={11} />{p.seller} · {p.location}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-display text-xl font-bold text-primary-400">₹{p.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-600">{p.unit}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${p.stock === 'In Stock' ? 'text-green-400' : p.stock === 'Limited' ? 'text-yellow-400' : 'text-red-400'}`}>
                    ● {p.stock}
                  </span>
                  <button className="btn-primary text-xs px-3 py-1.5">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
