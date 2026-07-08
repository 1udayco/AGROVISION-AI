'use client';

export default function TechStackSection() {
  const stacks = [
    { category: 'Frontend', items: ['Next.js 15', 'React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'GSAP'] },
    { category: 'Backend', items: ['Node.js', 'Express.js', 'FastAPI', 'WebSockets', 'JWT Auth', 'Redis', 'REST APIs'] },
    { category: 'AI / ML', items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'Hugging Face', 'XGBoost', 'LSTM'] },
    { category: 'Database & Cloud', items: ['PostgreSQL', 'Supabase RT', 'Supabase Auth', 'Cloudinary', 'Firebase', 'Redis Cache'] },
    { category: 'DevOps', items: ['Docker', 'Kubernetes', 'GitHub Actions', 'Vercel', 'Railway', 'Swagger', 'Monitoring'] },
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="badge-green">TECH STACK</span>
          <h2 className="font-display text-4xl font-bold mt-4 text-white">Built with Enterprise Tech</h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Production-grade technologies from frontend to MLOps
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
          {stacks.map((stack) => (
            <div key={stack.category} className="card-dark">
              <h3 className="text-xs font-mono text-primary-400 tracking-widest uppercase mb-3">{stack.category}</h3>
              <div className="flex flex-wrap gap-2">
                {stack.items.map((item) => (
                  <span key={item} className="text-xs px-2.5 py-1 rounded-lg glass border border-white/5 text-gray-400 hover:text-primary-300 hover:border-primary-500/20 transition-colors cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
