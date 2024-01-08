const breakpoints = {
  mobile: 320,
  tablet: 768,
  desktop: 1280,
};

const theme = {
  colors: {
    accent: "#78b5f0",
    accentActive: "#083ac4",
    background: "#d8e8e8",
    incomeHeader: "#095a16",
    expensesHeader: "#773305",
    spinner: "#54aff0",
    red: "#dc7632",
    green: "#95fda6",
    dark: "#0c0d0d",
    light: "#f2f5f2",
    valid: "#329432",
    invalid: "#eb2d36",
  },
  fonts: {
    comfortaa: "'Comfortaa', sans-serif",
    merriweather: "'Merriweather', serif",
    open_sans: "'Open Sans', sans-serif",
  },
  fontSizes: {
    extraSmall: "12px",
    small: "14px",
    normal: "16px",
    bold: "20px",
    extraBold: "22px",
  },
  fontWeight: {
    light: 300,
    normal: 400,
    bold: 700,
  },
  borders: {
    none: "none",
    normal: "1px solid",
    medium: "2px solid",
  },
  radii: {
    none: "0",
    small: "10px",
    normal: "20px",
    round: "50%",
  },
  mq: {
    mobileOnly: `@media screen and (max-width: ${breakpoints.tablet - 0.02}px)`,
    mobile: `@media screen and (min-width: ${breakpoints.mobile}px)`,
    tabletOnly: `@media screen and (min-width: ${
      breakpoints.tablet
    }px) and (max-width: ${breakpoints.desktop - 0.02}px)`,
    tablet: `@media screen and (min-width: ${breakpoints.tablet}px)`,
    notDesktop: `@media screen and (max-width: ${
      breakpoints.desktop - 0.02
    }px)`,
    desktop: `@media screen and (min-width: ${breakpoints.desktop}px)`,
  },
  transitions: {
    durations: {
      default: "250ms",
    },
    functions: {
      default: "cubic-bezier(0.3, 0, 0.2, 1)",
    },
  },
};

export { theme, breakpoints };
