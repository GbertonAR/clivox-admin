/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Colores ultra-creativos
        neon: {
          blue: "hsl(var(--neon-blue))",
          purple: "hsl(var(--electric-purple))",
          violet: "hsl(var(--cosmic-violet))",
          pink: "hsl(var(--cyber-pink))",
          teal: "hsl(var(--quantum-teal))",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        futuristic: ['Orbitron', 'Inter', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xs': ['0.5rem', { lineHeight: '0.625rem' }],
      },
      animation: {
        // Animaciones ultra-creativas
        'shimmer': 'shimmer 3s infinite',
        'aurora-flow': 'aurora-flow 8s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 4s ease-in-out infinite',
        'hologram-pulse': 'hologram-pulse 6s ease-in-out infinite',
        'floating-cosmic': 'floating-cosmic 8s ease-in-out infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite alternate',
        'rotate-hologram': 'rotate-hologram 20s linear infinite',
        'slide-up-cosmic': 'slide-up-cosmic 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in-cosmic': 'scale-in-cosmic 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'particles-float': 'particles-float 15s linear infinite',
        // Animaciones adicionales para micro-interacciones
        'bounce-subtle': 'bounce 1s ease-in-out 2',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px hsl(var(--electric-purple) / 0.5)' 
          },
          '50%': { 
            boxShadow: '0 0 40px hsl(var(--electric-purple) / 0.8), 0 0 80px hsl(var(--neon-blue) / 0.3)' 
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-cosmic': 'var(--gradient-cosmic)',
        'gradient-neon': 'var(--gradient-neon)',
        'gradient-aurora': 'var(--gradient-aurora)',
        'hologram-1': 'var(--hologram-1)',
        'hologram-2': 'var(--hologram-2)',
        // Patrones ultra-creativos
        'mesh-cosmic': `
          radial-gradient(at 40% 20%, hsl(var(--neon-blue)) 0px, transparent 50%), 
          radial-gradient(at 80% 0%, hsl(var(--electric-purple)) 0px, transparent 50%), 
          radial-gradient(at 0% 50%, hsl(var(--cosmic-violet)) 0px, transparent 50%),
          radial-gradient(at 60% 80%, hsl(var(--cyber-pink)) 0px, transparent 50%)
        `,
        'neural-network': `
          linear-gradient(45deg, transparent 30%, hsl(var(--electric-purple) / 0.1) 30%, hsl(var(--electric-purple) / 0.1) 70%, transparent 70%),
          linear-gradient(-45deg, transparent 30%, hsl(var(--neon-blue) / 0.1) 30%, hsl(var(--neon-blue) / 0.1) 70%, transparent 70%)
        `,
      },
      boxShadow: {
        'neon-sm': 'var(--shadow-neon-sm)',
        'neon-md': 'var(--shadow-neon-md)',
        'neon-lg': 'var(--shadow-neon-lg)',
        'neon-xl': 'var(--shadow-neon-xl)',
        'inner-neon': 'inset 0 1px 0 hsl(var(--electric-purple) / 0.2)',
        'cosmic': '0 0 50px hsl(var(--electric-purple) / 0.3), 0 0 100px hsl(var(--neon-blue) / 0.2)',
      },
      backdropBlur: {
        'ultra': '25px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [],
};