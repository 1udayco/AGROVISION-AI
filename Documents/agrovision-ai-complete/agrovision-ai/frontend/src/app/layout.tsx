import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'AgroVision AI — Revolutionizing Agriculture with AI',
  description: 'AI-powered crop disease detection, smart recommendations, weather forecasting, and farmer assistance platform.',
  keywords: 'agriculture AI, crop disease detection, smart farming, precision agriculture, ML farming',
  openGraph: {
    title: 'AgroVision AI',
    description: 'Revolutionizing Agriculture with Artificial Intelligence',
    images: ['/images/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgroVision AI',
    description: 'Revolutionizing Agriculture with Artificial Intelligence',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#020c07" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(4, 15, 10, 0.95)',
              color: '#e2f5ea',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '12px',
              fontFamily: 'Cabinet Grotesk, sans-serif',
            },
            success: {
              iconTheme: { primary: '#22c55e', secondary: '#020c07' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#020c07' },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
