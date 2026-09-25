/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './Sections/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#006e2f',
        'primary-container': '#22c55e',
        'on-primary': '#ffffff',
        'whatsapp-green': '#25D366',
        'whatsapp-teal': '#075e54',
        'whatsapp-header': '#128c7e',
        'whatsapp-bubble': '#dcf8c6',
        'surface': '#f9f9f9',
        'background': '#f9f9f9',
        'surface-pure': '#ffffff',
        'surface-subtle': '#F8FAFC',
        'surface-card': '#ffffff',
        'surface-pastel': '#f0fdf4',
        'surface-blue-tint': '#eff6ff',
        'text-primary': '#0F172A',
        'text-secondary': '#475569',
        'outline': '#64748B',
        'border-muted': '#E2E8F0',
        'crm-sync-gold': '#d97706',
        'read-cyan': '#0284c7',
        'lime-growth': '#65a30d',
        'error': '#dc2626',
        'error-subtle': '#fef2f2',
        brand: {
          green: '#10B981',
          'green-hover': '#059669',
          'green-light': '#ECFDF5',
          'green-text': '#047857',
          linkedin: '#0A66C2'
        }
      },
      borderRadius: {
        'DEFAULT': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px'
      },
      spacing: {
        'gutter-mobile': '1rem',
        'gutter': '1.5rem',
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '2rem',
        'space-2xl': '3rem',
        'space-3xl': '4.5rem'
      },
      fontFamily: {
        'display': ['Sora', 'sans-serif'],
        'headline-lg': ['Sora', 'sans-serif'],
        'headline-md': ['Sora', 'sans-serif'],
        'headline-sm': ['Sora', 'sans-serif'],
        'body-base': ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        'code-mono': ['JetBrains Mono', 'monospace']
      }
    }
  },
  plugins: [],
};
