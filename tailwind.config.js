module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        bigShoulders: ["Big Shoulders Stencil", "cursive"],
      },
      colors: {
        primary: {
          DEFAULT: "#F72585",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F0F1F3",
          foreground: "#7209B7",
        },
        border: "hsl(var(--border-primary))",

        accent: {
          DEFAULT: "#3A0CA3",
          foreground: "#7209B7",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#7209B7",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#7209B7",
        },
        muted: {
          DEFAULT: "#F0F1F3",
          foreground: "#3A0CA3",
        },
        destructive: {
          DEFAULT: "#FF4C4C",
          foreground: "#FFFFFF",
        },
        border: "#E0E0E0",
        input: "#E0E0E0",
        ring: "#F72585",
        chart: {
          1: "#FF6F61",
          2: "#4CAF50",
          3: "#03A9F4",
          4: "#FFC107",
          5: "#8E44AD",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        heading: "28px",
        body: "16px",
      },
      fontWeight: {
        heading: "600",
        body: "400",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  darkMode: ["class", "class"],
};
