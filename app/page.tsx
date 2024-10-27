import dynamic from 'next/dynamic';

const TradingDashboard = dynamic(
  () => import('@/components/trading/trading-dashboard'),
  { ssr: false }
);

const LoginForm = dynamic(() => import('@/components/trading/login-form'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <LoginForm />
        <TradingDashboard />
      </div>
    </main>
  );
}