import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export function Layout() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: '#060912',
        fontFamily: 'DM Sans, system-ui, sans-serif',
        color: '#f1f5f9',
      }}
    >
      {/* Subtle radial glow at top */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% -10%, rgba(34,211,238,0.06) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      <Navbar />

      <main
        className="relative"
        style={{ zIndex: 1, paddingTop: '60px' }}
      >
        <Outlet />
      </main>
    </div>
  );
}
