'use client';

import Navbar from '@/components/layout/Navbar';
import { ExternalLink, IndianRupee, Clock, Users, CheckCircle } from 'lucide-react';

const SCHEMES = [
  {
    name: 'PM-Kisan Samman Nidhi',
    short: 'PM-KISAN',
    description: 'Direct income support of ₹6,000 per year to all landholding farmer families in 3 equal installments.',
    amount: '₹6,000/year',
    eligibility: 'All landholding farmers with cultivable land',
    documents: ['Aadhaar Card', 'Bank Account', 'Land Records (Khata/Khasra)'],
    deadline: 'Ongoing — Apply anytime',
    beneficiaries: '11.4 Crore',
    url: 'https://pmkisan.gov.in',
    category: 'Income Support',
    color: 'green',
  },
  {
    name: 'Pradhan Mantri Fasal Bima Yojana',
    short: 'PMFBY',
    description: 'Comprehensive crop insurance scheme at highly subsidized premiums — 2% for Kharif, 1.5% for Rabi crops.',
    amount: 'Up to ₹2 Lakh/claim',
    eligibility: 'All farmers including sharecroppers growing notified crops',
    documents: ['Aadhaar Card', 'Bank Account', 'Land/Tenancy Records', 'Sowing Certificate'],
    deadline: 'Kharif: July 31 · Rabi: December 31',
    beneficiaries: '5.5 Crore',
    url: 'https://pmfby.gov.in',
    category: 'Crop Insurance',
    color: 'blue',
  },
  {
    name: 'Kisan Credit Card',
    short: 'KCC',
    description: 'Short-term credit up to ₹3 lakh at 7% interest rate (4% with prompt repayment) for crop cultivation, maintenance and allied activities.',
    amount: 'Up to ₹3 Lakh',
    eligibility: 'All farmers, tenant farmers, sharecroppers, SHGs',
    documents: ['Aadhaar Card', 'Pan Card', 'Land Records', '2 Passport Photos'],
    deadline: 'Ongoing — Apply at nearest bank/cooperative',
    beneficiaries: '7.4 Crore',
    url: 'https://www.nabard.org/kcc',
    category: 'Credit',
    color: 'yellow',
  },
  {
    name: 'PM-KUSUM (Solar Pump)',
    short: 'KUSUM',
    description: 'Subsidy up to 90% for installation of standalone solar pumps and grid-connected solar power plants on farm land.',
    amount: '90% Subsidy on solar pumps',
    eligibility: 'Individual farmers, groups of farmers, cooperatives, FPOs',
    documents: ['Aadhaar Card', 'Land Records', 'Bank Account', 'Electricity Bill'],
    deadline: 'Rolling basis — check state portal',
    beneficiaries: '35 Lakh (target)',
    url: 'https://mnre.gov.in/solar/kusum',
    category: 'Solar Energy',
    color: 'orange',
  },
  {
    name: 'e-NAM (National Agriculture Market)',
    short: 'e-NAM',
    description: 'Online trading platform for agricultural commodities enabling farmers to sell produce directly to buyers across India.',
    amount: 'Higher market prices (10-30% better)',
    eligibility: 'All farmers with registered produce',
    documents: ['Aadhaar Card', 'Bank Account', 'Produce Sample'],
    deadline: 'Always open — register once, sell anytime',
    beneficiaries: '1.76 Crore',
    url: 'https://www.enam.gov.in',
    category: 'Market Access',
    color: 'purple',
  },
  {
    name: 'Soil Health Card Scheme',
    short: 'SHC',
    description: 'Free soil testing and customized fertilizer recommendations for every 2 years to improve soil health and reduce input costs.',
    amount: 'Free soil testing + advisory',
    eligibility: 'All farmers (priority to SC/ST, small/marginal)',
    documents: ['Aadhaar Card', 'Land Records', 'Soil Sample (0-20cm depth)'],
    deadline: 'Ongoing — contact nearest Krishi Vigyan Kendra',
    beneficiaries: '22 Crore cards issued',
    url: 'https://soilhealth.dac.gov.in',
    category: 'Soil Health',
    color: 'green',
  },
];

const colorMap = {
  green: { badge: 'bg-green-500/10 text-green-400 border-green-500/20', accent: 'text-primary-400' },
  blue: { badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20', accent: 'text-blue-400' },
  yellow: { badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', accent: 'text-yellow-400' },
  orange: { badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20', accent: 'text-orange-400' },
  purple: { badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20', accent: 'text-purple-400' },
};

export default function SchemesPage() {
  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />
      <div className="pt-24 pb-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="badge-green">GOVERNMENT SUPPORT</span>
          <h1 className="font-display text-4xl font-bold mt-3 text-white">Agricultural Schemes</h1>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">6 major government schemes that every Indian farmer should know about</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {SCHEMES.map((s) => {
            const c = colorMap[s.color as keyof typeof colorMap];
            return (
              <div key={s.name} className="card-dark flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-mono ${c.badge}`}>{s.short}</span>
                      <span className="text-xs text-gray-600">{s.category}</span>
                    </div>
                    <h3 className="font-display font-bold text-white text-base">{s.name}</h3>
                  </div>
                  <div className="text-right flex-shrink-0 ml-3">
                    <p className={`font-bold text-sm ${c.accent}`}>{s.amount}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed mb-4">{s.description}</p>

                <div className="space-y-2 mb-4 flex-1">
                  <div className="flex items-start gap-2 text-xs">
                    <Users size={12} className="text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-500"><span className="text-gray-400">Beneficiaries:</span> {s.beneficiaries}</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <Clock size={12} className="text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-500"><span className="text-gray-400">Deadline:</span> {s.deadline}</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <CheckCircle size={12} className="text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-500"><span className="text-gray-400">Eligibility:</span> {s.eligibility}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-600 mb-2">Required Documents:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.documents.map((d) => (
                      <span key={d} className="text-xs px-2 py-0.5 rounded-md bg-dark-600 text-gray-500 border border-white/5">{d}</span>
                    ))}
                  </div>
                </div>

                <a href={s.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-primary-500/20 text-primary-400 text-sm hover:bg-primary-500/10 transition-colors">
                  <ExternalLink size={14} /> Apply / Learn More
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
