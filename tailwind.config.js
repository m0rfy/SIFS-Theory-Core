/**
 * Tailwind CSS Configuration for SSF-2025 Spatial Framework
 * 
 * T136 [US10]: Configure Tailwind CSS for SSF-2025 Spatial Framework integration
 * 
 * Note: Tailwind CSS v4 uses CSS-based configuration via @theme in CSS files.
 * This config file provides additional configuration for compatibility and IDE support.
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // SSF-2025 Spatial Framework colors
      colors: {
        'sifs-level-0': 'oklch(0% 0 0)', // Temporal Abyss - глубокий чёрный
        'sifs-level-1': 'rgba(15, 15, 15, 0.7)', // Substrate
        'sifs-level-2': 'rgba(255, 255, 255, 0.03)', // Control Plane
        'sifs-delta': 'var(--sifs-delta-color)',
        'sifs-stable': 'var(--sifs-stable-color)',
        'sifs-unstable': 'var(--sifs-unstable-color)',
      },
      // SSF-2025 spacing system
      spacing: {
        'sifs-xs': 'var(--spacing-xs)',
        'sifs-sm': 'var(--spacing-sm)',
        'sifs-md': 'var(--spacing-md)',
        'sifs-lg': 'var(--spacing-lg)',
        'sifs-xl': 'var(--spacing-xl)',
        'sifs-2xl': 'var(--spacing-2xl)',
      },
      // SSF-2025 typography
      fontSize: {
        'sifs-h1': 'var(--sifs-h1)',
        'sifs-h1-mobile': 'var(--sifs-h1-mobile)',
        'sifs-h2': 'var(--sifs-h2)',
        'sifs-h3': 'var(--sifs-h3)',
        'sifs-h4': 'var(--sifs-h4)',
        'sifs-base': 'var(--sifs-base)',
        'sifs-small': 'var(--sifs-small)',
      },
      lineHeight: {
        'sifs-text': 'var(--sifs-line-height-text)',
        'sifs-headings': 'var(--sifs-line-height-headings)',
      },
      maxWidth: {
        'sifs-content': 'var(--sifs-max-width)',
      },
      // SSF-2025 animations
      animation: {
        'breathe': 'breathe var(--sifs-oscillation-speed, 1s) ease-in-out infinite',
        'float': 'float var(--sifs-oscillation-speed, 1s) ease-in-out infinite',
        'pulse-sifs': 'pulse var(--sifs-oscillation-speed) ease-in-out infinite',
        'spatial-vibration': 'spatial-vibration 0.1s infinite',
      },
      // SSF-2025 backdrop filters
      backdropBlur: {
        'sifs': 'var(--sifs-sigma-blur)',
      },
      // SSF-2025 shadows
      boxShadow: {
        'spatial': 'var(--shadow-spatial)',
        'spatial-hover': '0 30px 60px -12px rgba(0, 0, 0, 0.9)',
      },
      // SSF-2025 border radius
      borderRadius: {
        'spatial': '40px',
        'spatial-dock': '24px',
        'spatial-island': '16px',
        'spatial-capsule': '12px',
      },
    },
  },
  plugins: [],
}
