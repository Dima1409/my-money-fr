const breakpoints = {
  mobile: 320,
  tablet: 768,
  desktop: 1280,
};

const theme = {
  colors: {
    accent: "#78b5f0",
    accentActive: "#083ac4",
    background: "#d8f0f0",
    incomeHeader: "#095a16",
    expensesHeader: "#bc5915",
    mainBg: "#ecfcfc",
    spinner: "#54aff0",
    red: "#eac3a9",
    green: "#ccfcd4",
    dark: "#0c0d0d",
    darkRed: "#a34848",
    light: "#f2f5f2",
    valid: "#329432",
    invalid: "#eb2d36",
    transfers: "#d3d366",
  },
  diagramColors: [
    "#FF6384",
    "#36A2EB",
    "#99720d",
    "#8BC34A",
    "#8139c9",
    "#39d8a5",
    "#869377",
    "#6c6a13",
    "#534a4c",
    "#0a2c43",
    "#795f18",
    "#5b1e0b",
    "#42186c",
    "#22493d",
    "#52564e",
    "#6c6a13",
    "#696969",
    "#0e075e",
    "#261e0b",
    "#a04e1c",
    "#a1603b",
    "#2049a0",
    "#416f0d",
    "#0c4f57",
  ],
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
    extraBold: "28px",
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
