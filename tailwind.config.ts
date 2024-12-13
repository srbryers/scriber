import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "input-bg": "var(--input-bg)",
        "input-border": "var(--input-border)",
        "input-border-focus": "var(--input-border-focus)",
        "input-text": "var(--input-text)",
        "input-error": "var(--input-error)",
        "primary": {
          900: "var(--color-primary-900)",
          800: "var(--color-primary-800)",
          600: "var(--color-primary-600)",
          500: "var(--color-primary-500)",
          400: "var(--color-primary-400)",
          300: "var(--color-primary-300)",
          200: "var(--color-primary-200)",
          100: "var(--color-primary-100)",
          50: "var(--color-primary-50)",
          DEFAULT: "var(--color-primary)",
        },
        secondary: {
          900: "var(--color-secondary-900)",
          800: "var(--color-secondary-800)",
          600: "var(--color-secondary-600)",
          500: "var(--color-secondary-500)",
          400: "var(--color-secondary-400)",
          300: "var(--color-secondary-300)",
          200: "var(--color-secondary-200)",
          100: "var(--color-secondary-100)",
          50: "var(--color-secondary-50)",
          DEFAULT: "var(--color-secondary)",
        },
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-primary",
    "bg-secondary",
    "bg-tertiary",
    "bg-black",
    "bg-white",
    "bg-transparent",
    "text-primary",
    "text-secondary",
    "text-tertiary",
    "text-black",
    "text-white",
    "col-span-1",
    "col-span-2",
    "col-span-3",
    "col-span-4",
    "col-span-5",
    "col-span-6",
    "col-span-7",
    "col-span-8",
    "col-span-9",
    "col-span-10",
    "col-span-11",
    "col-span-12",
  ],
} satisfies Config;
