import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, ExternalLink, ChevronDown,
  BookOpen, Zap, TrendingUp, Database,
} from 'lucide-react';

interface SubItem {
  to: string;
  label: string;
}

interface NavItem {
  to?: string;
  label: string;
  sub?: SubItem[];
  icon?: React.ComponentType<{ className?: string }>;
  external?: boolean;
}

const navItems: NavItem[] = [
  { to: '/', label: 'Главная' },
  {
    label: 'Теория',
    icon: BookOpen,
    sub: [
      { to: '/docs/theory/overview', label: 'Обзор теории' },
      { to: '/docs/calculations/proton-mass', label: 'Расчёты' },
      { to: '/docs/predictions/README', label: 'Предсказания' },
      { to: '/docs/data/desi-2025', label: 'Данные наблюдений' },
    ],
  },
  {
    label: 'Симуляции',
    icon: Zap,
    sub: [
      { to: '/simulations/collapse', label: 'Информационный коллапс' },
      { to: '/simulations/temporal', label: 'Синхронизация времени' },
      { to: '/simulations/calculations', label: 'Интерактивные расчёты' },
      { to: '/simulations/visualizations', label: 'Визуализации' },
    ],
  },
  { to: '/docs/predictions/README', label: 'Предсказания', icon: TrendingUp },
];

function DropdownMenu({ items }: { items: SubItem[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-0 mt-2 w-56 rounded-xl overflow-hidden"
      style={{
        background: 'rgba(10, 14, 28, 0.95)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `block px-4 py-2.5 text-sm transition-colors ${
              isActive
                ? 'text-[#22d3ee] bg-white/5'
                : 'text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-white/5'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </motion.div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(6, 9, 18, 0.92)' : 'rgba(6, 9, 18, 0.6)',
          backdropFilter: 'blur(16px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-[60px] flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #22d3ee 0%, #a78bfa 100%)' }}
            >
              S
            </span>
            <span className="font-semibold text-[#f1f5f9] text-[15px] tracking-tight">
              SIFS Theory
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              if (item.sub) {
                const isOpen = openDropdown === item.label;
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors"
                      style={{
                        color: isOpen ? '#f1f5f9' : '#94a3b8',
                        background: isOpen ? 'rgba(255,255,255,0.05)' : 'transparent',
                        fontFamily: 'DM Sans, sans-serif',
                      }}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && <DropdownMenu items={item.sub} />}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.to}
                  to={item.to!}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'text-[#f1f5f9] bg-white/5'
                        : 'text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-white/5'
                    }`
                  }
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Right: GitHub + Mobile trigger */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/m0rfy/SIFS-Theory-Core"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm transition-all"
              style={{
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#94a3b8',
                fontFamily: 'DM Sans, sans-serif',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#f1f5f9';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              GitHub
            </a>

            <button
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: '#94a3b8' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[60px] left-0 right-0 z-40 md:hidden"
            style={{
              background: 'rgba(6, 9, 18, 0.98)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <nav className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col gap-1">
              {navItems.map((item) => {
                if (item.sub) {
                  return (
                    <div key={item.label}>
                      <div
                        className="px-3 py-2 text-xs font-medium uppercase tracking-wider"
                        style={{ color: '#475569', fontFamily: 'DM Sans, sans-serif' }}
                      >
                        {item.label}
                      </div>
                      {item.sub.map((sub) => (
                        <NavLink
                          key={sub.to}
                          to={sub.to}
                          className={({ isActive }) =>
                            `block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                              isActive ? 'text-[#22d3ee]' : 'text-[#94a3b8]'
                            }`
                          }
                          style={{ fontFamily: 'DM Sans, sans-serif' }}
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  );
                }
                return (
                  <NavLink
                    key={item.to}
                    to={item.to!}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        isActive ? 'text-[#f1f5f9] bg-white/5' : 'text-[#94a3b8]'
                      }`
                    }
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {item.label}
                  </NavLink>
                );
              })}
              <a
                href="https://github.com/m0rfy/SIFS-Theory-Core"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2.5 text-sm"
                style={{ color: '#94a3b8', fontFamily: 'DM Sans, sans-serif' }}
              >
                <ExternalLink className="w-4 h-4" />
                GitHub
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
