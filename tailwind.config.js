/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      // Thêm điểm ngắt tùy chỉnh
      custom: "850px",
    },
  },
};
export const plugins = [];
