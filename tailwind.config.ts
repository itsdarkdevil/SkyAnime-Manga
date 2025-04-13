
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
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
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
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
				// Infernal Theme Colors
				infernal: {
					black: "#000000",
					darkest: "#0A0A0A",
					charcoal: "#222222",
					blood: "#800000",
					crimson: "#DC143C",
					ember: "#FF4500",
					ash: "#333333",
					purple: "#2D1B2E",
					voidGray: "#1A1A1A"
				}
			},
			fontFamily: {
				gothic: ['EB Garamond', 'serif'],
				demonic: ['Pirata One', 'cursive'],
				ritual: ['Cinzel', 'serif']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				'flicker': {
					'0%, 100%': { opacity: '1' },
					'25%': { opacity: '0.75' },
					'50%': { opacity: '0.9' },
					'75%': { opacity: '0.85' }
				},
				'pulse-glow': {
					'0%, 100%': {
						filter: 'drop-shadow(0 0 6px rgba(255, 0, 0, 0.8))'
					},
					'50%': {
						filter: 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.6))'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'slow-spin': {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				},
				'reveal-text': {
					'0%': {
						width: '0'
					},
					'100%': {
						width: '100%'
					}
				},
				'drip': {
					'0%': {
						transform: 'translateY(0) scaleY(0)',
						opacity: '0'
					},
					'50%': {
						transform: 'translateY(3px) scaleY(1)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(10px)',
						opacity: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'flicker': 'flicker 3s linear infinite',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'slow-spin': 'slow-spin 20s linear infinite',
				'slow-spin-reverse': 'slow-spin 25s linear infinite reverse',
				'reveal-text': 'reveal-text 2s ease-in-out forwards',
				'drip': 'drip 2s ease-in-out'
			},
			backgroundImage: {
				'void-bg': 'radial-gradient(circle, rgba(45,27,46,1) 0%, rgba(10,10,10,1) 100%)',
				'ember-bg': 'linear-gradient(to bottom, #800000, #220000)',
				'ritual-circle': "url('/ritual-circle.svg')"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
