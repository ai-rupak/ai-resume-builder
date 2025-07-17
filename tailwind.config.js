/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: '#00897B',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },

  // new updates
darkMode: ["class"],
content: [
	"./pages/**/*.{js,jsx}",
	"./components/**/*.{js,jsx}",
	"./app/**/*.{js,jsx}",
	"./src/**/*.{js,jsx}",
],
prefix: "",
theme: {
	container: {
		center: true,
		padding: '2rem',
		screens: {
			'2xl': '1400px'
		}
	},
	extend: {
		colors: {
			border: 'hsl(var(--border))',
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))',
				50: 'hsl(var(--primary-50))',
				100: 'hsl(var(--primary-100))',
				200: 'hsl(var(--primary-200))',
				300: 'hsl(var(--primary-300))',
				400: 'hsl(var(--primary-400))',
				500: 'hsl(var(--primary))',
				600: 'hsl(var(--primary-600))',
				700: 'hsl(var(--primary-700))',
				800: 'hsl(var(--primary-800))',
				900: 'hsl(var(--primary-900))',
				950: 'hsl(var(--primary-950))'
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))',
				50: 'hsl(var(--secondary-50))',
				100: 'hsl(var(--secondary-100))',
				200: 'hsl(var(--secondary-200))',
				300: 'hsl(var(--secondary-300))',
				400: 'hsl(var(--secondary-400))',
				500: 'hsl(var(--secondary))',
				600: 'hsl(var(--secondary-600))',
				700: 'hsl(var(--secondary-700))',
				800: 'hsl(var(--secondary-800))',
				900: 'hsl(var(--secondary-900))',
				950: 'hsl(var(--secondary-950))'
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))',
				50: 'hsl(var(--destructive-50))',
				100: 'hsl(var(--destructive-100))',
				200: 'hsl(var(--destructive-200))',
				300: 'hsl(var(--destructive-300))',
				400: 'hsl(var(--destructive-400))',
				500: 'hsl(var(--destructive))',
				600: 'hsl(var(--destructive-600))',
				700: 'hsl(var(--destructive-700))',
				800: 'hsl(var(--destructive-800))',
				900: 'hsl(var(--destructive-900))',
				950: 'hsl(var(--destructive-950))'
			},
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))',
				50: 'hsl(var(--muted-50))',
				100: 'hsl(var(--muted-100))',
				200: 'hsl(var(--muted-200))',
				300: 'hsl(var(--muted-300))',
				400: 'hsl(var(--muted-400))',
				500: 'hsl(var(--muted))',
				600: 'hsl(var(--muted-600))',
				700: 'hsl(var(--muted-700))',
				800: 'hsl(var(--muted-800))',
				900: 'hsl(var(--muted-900))',
				950: 'hsl(var(--muted-950))'
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))',
				50: 'hsl(var(--accent-50))',
				100: 'hsl(var(--accent-100))',
				200: 'hsl(var(--accent-200))',
				300: 'hsl(var(--accent-300))',
				400: 'hsl(var(--accent-400))',
				500: 'hsl(var(--accent))',
				600: 'hsl(var(--accent-600))',
				700: 'hsl(var(--accent-700))',
				800: 'hsl(var(--accent-800))',
				900: 'hsl(var(--accent-900))',
				950: 'hsl(var(--accent-950))'
			},
			popover: {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))'
			},
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))'
			},
			sidebar: {
				DEFAULT: 'hsl(var(--sidebar-background))',
				foreground: 'hsl(var(--sidebar-foreground))',
				primary: 'hsl(var(--sidebar-primary))',
				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
				accent: 'hsl(var(--sidebar-accent))',
				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
				border: 'hsl(var(--sidebar-border))',
				ring: 'hsl(var(--sidebar-ring))'
			},
			// Enhanced AI/Brand Colors
			'ai-purple': {
				DEFAULT: 'hsl(var(--ai-purple))',
				50: 'hsl(var(--ai-purple-50))',
				100: 'hsl(var(--ai-purple-100))',
				200: 'hsl(var(--ai-purple-200))',
				300: 'hsl(var(--ai-purple-300))',
				400: 'hsl(var(--ai-purple-400))',
				500: 'hsl(var(--ai-purple))',
				600: 'hsl(var(--ai-purple-600))',
				700: 'hsl(var(--ai-purple-700))',
				800: 'hsl(var(--ai-purple-800))',
				900: 'hsl(var(--ai-purple-900))',
				950: 'hsl(var(--ai-purple-950))'
			},
			'ai-blue': {
				DEFAULT: 'hsl(var(--ai-blue))',
				50: 'hsl(var(--ai-blue-50))',
				100: 'hsl(var(--ai-blue-100))',
				200: 'hsl(var(--ai-blue-200))',
				300: 'hsl(var(--ai-blue-300))',
				400: 'hsl(var(--ai-blue-400))',
				500: 'hsl(var(--ai-blue))',
				600: 'hsl(var(--ai-blue-600))',
				700: 'hsl(var(--ai-blue-700))',
				800: 'hsl(var(--ai-blue-800))',
				900: 'hsl(var(--ai-blue-900))',
				950: 'hsl(var(--ai-blue-950))'
			},
			// Enhanced Feature Colors
			'feature-purple': {
				DEFAULT: 'hsl(var(--feature-purple))',
				50: 'hsl(var(--feature-purple-50))',
				100: 'hsl(var(--feature-purple-100))',
				200: 'hsl(var(--feature-purple-200))',
				300: 'hsl(var(--feature-purple-300))',
				400: 'hsl(var(--feature-purple-400))',
				500: 'hsl(var(--feature-purple))',
				600: 'hsl(var(--feature-purple-600))',
				700: 'hsl(var(--feature-purple-700))',
				800: 'hsl(var(--feature-purple-800))',
				900: 'hsl(var(--feature-purple-900))',
				950: 'hsl(var(--feature-purple-950))'
			},
			'feature-blue': {
				DEFAULT: 'hsl(var(--feature-blue))',
				50: 'hsl(var(--feature-blue-50))',
				100: 'hsl(var(--feature-blue-100))',
				200: 'hsl(var(--feature-blue-200))',
				300: 'hsl(var(--feature-blue-300))',
				400: 'hsl(var(--feature-blue-400))',
				500: 'hsl(var(--feature-blue))',
				600: 'hsl(var(--feature-blue-600))',
				700: 'hsl(var(--feature-blue-700))',
				800: 'hsl(var(--feature-blue-800))',
				900: 'hsl(var(--feature-blue-900))',
				950: 'hsl(var(--feature-blue-950))'
			},
			'feature-green': {
				DEFAULT: 'hsl(var(--feature-green))',
				50: 'hsl(var(--feature-green-50))',
				100: 'hsl(var(--feature-green-100))',
				200: 'hsl(var(--feature-green-200))',
				300: 'hsl(var(--feature-green-300))',
				400: 'hsl(var(--feature-green-400))',
				500: 'hsl(var(--feature-green))',
				600: 'hsl(var(--feature-green-600))',
				700: 'hsl(var(--feature-green-700))',
				800: 'hsl(var(--feature-green-800))',
				900: 'hsl(var(--feature-green-900))',
				950: 'hsl(var(--feature-green-950))'
			},
			'feature-orange': {
				DEFAULT: 'hsl(var(--feature-orange))',
				50: 'hsl(var(--feature-orange-50))',
				100: 'hsl(var(--feature-orange-100))',
				200: 'hsl(var(--feature-orange-200))',
				300: 'hsl(var(--feature-orange-300))',
				400: 'hsl(var(--feature-orange-400))',
				500: 'hsl(var(--feature-orange))',
				600: 'hsl(var(--feature-orange-600))',
				700: 'hsl(var(--feature-orange-700))',
				800: 'hsl(var(--feature-orange-800))',
				900: 'hsl(var(--feature-orange-900))',
				950: 'hsl(var(--feature-orange-950))'
			},
			// Enhanced Background Colors
			'bg-subtle': {
				DEFAULT: 'hsl(var(--bg-subtle))',
				50: 'hsl(var(--bg-subtle-50))',
				100: 'hsl(var(--bg-subtle-100))',
				200: 'hsl(var(--bg-subtle-200))',
				300: 'hsl(var(--bg-subtle-300))',
				400: 'hsl(var(--bg-subtle-400))',
				500: 'hsl(var(--bg-subtle))',
				600: 'hsl(var(--bg-subtle-600))',
				700: 'hsl(var(--bg-subtle-700))',
				800: 'hsl(var(--bg-subtle-800))',
				900: 'hsl(var(--bg-subtle-900))',
				950: 'hsl(var(--bg-subtle-950))'
			},
			'bg-soft': {
				DEFAULT: 'hsl(var(--bg-soft))',
				50: 'hsl(var(--bg-soft-50))',
				100: 'hsl(var(--bg-soft-100))',
				200: 'hsl(var(--bg-soft-200))',
				300: 'hsl(var(--bg-soft-300))',
				400: 'hsl(var(--bg-soft-400))',
				500: 'hsl(var(--bg-soft))',
				600: 'hsl(var(--bg-soft-600))',
				700: 'hsl(var(--bg-soft-700))',
				800: 'hsl(var(--bg-soft-800))',
				900: 'hsl(var(--bg-soft-900))',
				950: 'hsl(var(--bg-soft-950))'
			},
			// Status Colors
			success: {
				DEFAULT: 'hsl(var(--success))',
				50: 'hsl(var(--success-50))',
				100: 'hsl(var(--success-100))',
				200: 'hsl(var(--success-200))',
				300: 'hsl(var(--success-300))',
				400: 'hsl(var(--success-400))',
				500: 'hsl(var(--success))',
				600: 'hsl(var(--success-600))',
				700: 'hsl(var(--success-700))',
				800: 'hsl(var(--success-800))',
				900: 'hsl(var(--success-900))',
				950: 'hsl(var(--success-950))',
				foreground: 'hsl(var(--success-foreground))'
			},
			warning: {
				DEFAULT: 'hsl(var(--warning))',
				50: 'hsl(var(--warning-50))',
				100: 'hsl(var(--warning-100))',
				200: 'hsl(var(--warning-200))',
				300: 'hsl(var(--warning-300))',
				400: 'hsl(var(--warning-400))',
				500: 'hsl(var(--warning))',
				600: 'hsl(var(--warning-600))',
				700: 'hsl(var(--warning-700))',
				800: 'hsl(var(--warning-800))',
				900: 'hsl(var(--warning-900))',
				950: 'hsl(var(--warning-950))',
				foreground: 'hsl(var(--warning-foreground))'
			},
			info: {
				DEFAULT: 'hsl(var(--info))',
				50: 'hsl(var(--info-50))',
				100: 'hsl(var(--info-100))',
				200: 'hsl(var(--info-200))',
				300: 'hsl(var(--info-300))',
				400: 'hsl(var(--info-400))',
				500: 'hsl(var(--info))',
				600: 'hsl(var(--info-600))',
				700: 'hsl(var(--info-700))',
				800: 'hsl(var(--info-800))',
				900: 'hsl(var(--info-900))',
				950: 'hsl(var(--info-950))',
				foreground: 'hsl(var(--info-foreground))'
			},
			// Gradient Colors
			gradient: {
				'primary-start': 'hsl(var(--gradient-primary-start))',
				'primary-end': 'hsl(var(--gradient-primary-end))',
				'secondary-start': 'hsl(var(--gradient-secondary-start))',
				'secondary-end': 'hsl(var(--gradient-secondary-end))',
				'accent-start': 'hsl(var(--gradient-accent-start))',
				'accent-end': 'hsl(var(--gradient-accent-end))'
			}
		},
		fontFamily: {
			'display': ['Inter', 'system-ui', 'sans-serif'],
			'body': ['Inter', 'system-ui', 'sans-serif'],
			'mono': ['JetBrains Mono', 'Monaco', 'Cascadia Code', 'Segoe UI Mono', 'Roboto Mono', 'monospace']
		},
		fontSize: {
			'xs': ['0.75rem', { lineHeight: '1rem' }],
			'sm': ['0.875rem', { lineHeight: '1.25rem' }],
			'base': ['1rem', { lineHeight: '1.5rem' }],
			'lg': ['1.125rem', { lineHeight: '1.75rem' }],
			'xl': ['1.25rem', { lineHeight: '1.75rem' }],
			'2xl': ['1.5rem', { lineHeight: '2rem' }],
			'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
			'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
			'5xl': ['3rem', { lineHeight: '1' }],
			'6xl': ['3.75rem', { lineHeight: '1' }],
			'7xl': ['4.5rem', { lineHeight: '1' }],
			'8xl': ['6rem', { lineHeight: '1' }],
			'9xl': ['8rem', { lineHeight: '1' }]
		},
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		},
		boxShadow: {
			'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 16px -4px rgba(0, 0, 0, 0.05)',
			'medium': '0 4px 16px -4px rgba(0, 0, 0, 0.1), 0 8px 32px -8px rgba(0, 0, 0, 0.1)',
			'strong': '0 8px 32px -8px rgba(0, 0, 0, 0.15), 0 16px 64px -16px rgba(0, 0, 0, 0.15)',
			'glow': '0 0 20px rgba(var(--primary-rgb), 0.3)',
			'glow-accent': '0 0 20px rgba(var(--accent-rgb), 0.3)'
		},
		keyframes: {
			'accordion-down': {
				from: { height: '0' },
				to: { height: 'var(--radix-accordion-content-height)' }
			},
			'accordion-up': {
				from: { height: 'var(--radix-accordion-content-height)' },
				to: { height: '0' }
			},
			'fade-in': {
				'0%': { opacity: '0', transform: 'translateY(10px)' },
				'100%': { opacity: '1', transform: 'translateY(0)' }
			},
			'fade-out': {
				'0%': { opacity: '1', transform: 'translateY(0)' },
				'100%': { opacity: '0', transform: 'translateY(-10px)' }
			},
			'slide-in-right': {
				'0%': { transform: 'translateX(100%)' },
				'100%': { transform: 'translateX(0)' }
			},
			'slide-in-left': {
				'0%': { transform: 'translateX(-100%)' },
				'100%': { transform: 'translateX(0)' }
			},
			'scale-in': {
				'0%': { transform: 'scale(0.9)', opacity: '0' },
				'100%': { transform: 'scale(1)', opacity: '1' }
			},
			'shimmer': {
				'0%': { transform: 'translateX(-100%)' },
				'100%': { transform: 'translateX(100%)' }
			}
		},
		animation: {
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out',
			'fade-in': 'fade-in 0.3s ease-out',
			'fade-out': 'fade-out 0.3s ease-out',
			'slide-in-right': 'slide-in-right 0.3s ease-out',
			'slide-in-left': 'slide-in-left 0.3s ease-out',
			'scale-in': 'scale-in 0.2s ease-out',
			'shimmer': 'shimmer 2s infinite'
		}
	}
},
  plugins: [require("tailwindcss-animate")],
}
