'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { MessageSquare, ThumbsUp, Eye, Plus, Search, Tag, TrendingUp } from 'lucide-react';

const POSTS = [
  { id: 1, title: 'Best practices for organic cotton farming in Maharashtra?', author: 'Ramesh Patil', avatar: 'RP', state: 'Maharashtra', category: 'Organic Farming', likes: 34, views: 289, replies: 12, time: '2h ago', tags: ['Cotton', 'Organic', 'Maharashtra'] },
  { id: 2, title: 'AI detected late blight in my tomatoes — what treatment worked for you?', author: 'Sunita Devi', avatar: 'SD', state: 'Punjab', category: 'Disease Management', likes: 56, views: 412, replies: 23, time: '5h ago', tags: ['Tomato', 'Late Blight', 'Treatment'] },
  { id: 3, title: 'PM-Kisan 17th installment — when is it coming?', author: 'Arjun Reddy', avatar: 'AR', state: 'Andhra Pradesh', category: 'Government Schemes', likes: 89, views: 1204, replies: 45, time: '1d ago', tags: ['PM-Kisan', 'Government', 'Subsidy'] },
  { id: 4, title: 'Drip irrigation setup cost for 5 acres — affordable options?', author: 'Manoj Patel', avatar: 'MP', state: 'Gujarat', category: 'Irrigation', likes: 28, views: 198, replies: 9, time: '2d ago', tags: ['Irrigation', 'Drip', 'Cost'] },
  { id: 5, title: 'Kharif 2025: Which soybean variety gave you the best yield?', author: 'Vijay Salunke', avatar: 'VS', state: 'Maharashtra', category: 'Crop Varieties', likes: 67, views: 543, replies: 31, time: '3d ago', tags: ['Soybean', 'Kharif', 'Yield'] },
];

const CATEGORIES = ['All', 'Disease Management', 'Organic Farming', 'Government Schemes', 'Irrigation', 'Crop Varieties', 'Market Prices', 'Weather'];

export default function CommunityPage() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = POSTS.filter(p =>
    (selectedCat === 'All' || p.category === selectedCat) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />
      <div className="pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="badge-green">FARMER COMMUNITY</span>
            <h1 className="font-display text-3xl font-bold mt-2 text-white">Community Forum</h1>
            <p className="text-gray-500 text-sm mt-1">Connect with 52,000+ farmers across India</p>
          </div>
          <button className="btn-primary flex items-center gap-2 text-sm">
            <Plus size={16} /> New Post
          </button>
        </div>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search discussions..."
              className="w-full bg-dark-700 border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:border-primary-500/50 focus:outline-none placeholder-gray-700" />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {CATEGORIES.slice(0, 5).map((c) => (
              <button key={c} onClick={() => setSelectedCat(c)}
                className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${selectedCat === c ? 'bg-primary-500/20 border-primary-500/40 text-primary-300' : 'border-white/5 text-gray-500 hover:border-white/15'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-3">
          {filtered.map((post) => (
            <div key={post.id} className="card-dark cursor-pointer group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary-400">{post.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white group-hover:text-primary-300 transition-colors mb-1">{post.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-2">
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{post.state}</span>
                    <span>·</span>
                    <span>{post.time}</span>
                    <span className="badge-green">{post.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-dark-600 text-gray-500 border border-white/5">
                        <Tag size={9} className="inline mr-1" />{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span className="flex items-center gap-1"><ThumbsUp size={12} />{post.likes}</span>
                    <span className="flex items-center gap-1"><MessageSquare size={12} />{post.replies} replies</span>
                    <span className="flex items-center gap-1"><Eye size={12} />{post.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
