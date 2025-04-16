/** @type {import('tailwindcss').Config} */
module.exports = {
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
        },
        keyframes: {
          gooey: {
            from: {
              filter: "blur(20px)",
              transform: "translate(10%, -10%) skew(0)",
            },
            to: {
              filter: "blur(30px)",
              transform: "translate(-10%, 10%) skew(-12deg)",
            },
          },
          slideDown: {
            "0%": { transform: "translateY(-100%)" },
            "100%": { transform: "translateY(100%)" },
          },
        },
        animation: {
          slideDown: "slideDown 2s linear infinite",
          gooey: "gooey 3s ease-in-out infinite",
        },
      },
    },
    plugins: [],
  };
  