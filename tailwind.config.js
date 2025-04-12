module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        bigShoulders: ["Big Shoulders Stencil", "cursive"],
      },
      colors: {
        grey: {
          DEFAULT: "var(--grey)",
          secondary: "var(--grey-secondary)",
          secondaryDark: "var(--grey-secondary-dark)",
          secondaryLight: "var(--grey-secondary-light)",
          tertiary: "var(--grey-tertiary)",
          dark: "var(--grey-dark)",
          foreground: "var(--grey-foreground)",
        },
        brown: {
          DEFAULT: "var(--brown--primary)",
          yellow: "var(--brown--yellow)",
        },
        blue: {
          DEFAULT: "var(--blue)",
        },
        green: {
          DEFAULT: "var(--green)",
          dark: "var(--dark-green)",
        },
        yellow: {
          DEFAULT: "var(--yellow)",
          secondary: "var(--yellow-secondary)",
          dark: "var(--yellow-light)",
          landingpage: "var(--yellow-primary)",
        },
        pink: {
          DEFAULT: "var(--pink)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        border: "var(--border-primary)",
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        pupple: {
          DEFAULT: "var(--text-color-primary)",
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
  darkMode: ["class"],
};
