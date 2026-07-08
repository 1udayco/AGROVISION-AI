'use client';

const TESTIMONIALS = [
  {
    name: 'Ramesh Patil',
    role: 'Sugarcane Farmer, Nashik',
    avatar: 'RP',
    text: 'AgroVision AI detected red rot in my sugarcane crop 3 weeks before visible symptoms. Saved my entire 4-acre harvest. The AI recommendation was spot-on.',
    rating: 5,
    crop: 'Sugarcane',
  },
  {
    name: 'Sunita Devi',
    role: 'Paddy Farmer, Punjab',
    avatar: 'SD',
    text: 'The weather AI predicted the unseasonal rain correctly. I adjusted irrigation schedule and saved ₹45,000 in water costs. Incredible technology!',
    rating: 5,
    crop: 'Paddy',
  },
  {
    name: 'Arjun Reddy',
    role: 'Tomato Grower, Andhra Pradesh',
    avatar: 'AR',
    text: 'Crop recommendation feature suggested shifting to a drought-resistant tomato variety. Yield increased by 35% this season. Best farming app I\'ve used.',
    rating: 5,
    crop: 'Tomato',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-950/20 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="badge-green">FARMER SUCCESS STORIES</span>
          <h2 className="font-display text-4xl font-bold mt-4 text-white">Real Impact, Real Farmers</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="card-dark relative overflow-hidden">
              {/* Quote mark */}
              <div className="absolute top-4 right-4 text-6xl font-serif text-primary-500/10 leading-none">"</div>
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-accent-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-400">{t.avatar}</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-600 text-xs">{t.role}</p>
                </div>
                <span className="ml-auto badge-green">{t.crop}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
