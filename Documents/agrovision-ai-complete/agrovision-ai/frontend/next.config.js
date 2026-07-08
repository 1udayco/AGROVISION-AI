/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'openweathermap.org',
      'res.cloudinary.com',
      'your-supabase-project.supabase.co',
    ],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_OPENWEATHER_API_KEY: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000',
    NEXT_PUBLIC_ML_SERVICE_URL: process.env.NEXT_PUBLIC_ML_SERVICE_URL || 'http://localhost:8000',
  },
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    const mlServiceUrl = process.env.NEXT_PUBLIC_ML_SERVICE_URL || 'http://localhost:8000';

    return [
      {
        source: '/api/backend/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: '/api/ml/:path*',
        destination: `${mlServiceUrl}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
