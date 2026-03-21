/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0b0f19",
        card: "#111827",
        border: "#1f2937",

        primary: "#ef4444",
        secondary: "#f97316",

        textPrimary: "#f9fafb",
        textSecondary: "#9ca3af",
      },
    },
  },
  plugins: [],
};