import { parseColor, THEME_PRESET_PALETTES, type ThemePresetPalette } from "@hermes/shared";
import type { DashboardTheme, ThemePalette, ThemeTypography, ThemeLayout } from "./types";

/**
 * Built-in dashboard themes.
 *
 * Each theme defines its own palette, typography, and layout so switching
 * themes produces visible changes beyond just color — fonts, density, and
 * corner-radius all shift to match the theme's personality.
 *
 * Theme names must stay in sync with the backend's
 * `_BUILTIN_DASHBOARD_THEMES` list in `hermes_cli/web_server.py`.
 *
 * Presets that also ship on the desktop (midnight, ember, mono, cyberpunk)
 * take their colours from `@hermes/shared` `THEME_PRESET_PALETTES` so both
 * surfaces render one palette; only typography/layout/overrides live here.
 */

// ---------------------------------------------------------------------------
// Shared typography / layout presets
// ---------------------------------------------------------------------------

/** Default system stack — neutral, safe fallback for every platform. */
const SYSTEM_SANS =
  'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const SYSTEM_MONO =
  'ui-monospace, "SF Mono", "Cascadia Mono", Menlo, Consolas, monospace';

const DEFAULT_TYPOGRAPHY: ThemeTypography = {
  fontSans: SYSTEM_SANS,
  fontMono: SYSTEM_MONO,
  baseSize: "15px",
  lineHeight: "1.55",
  letterSpacing: "0",
};

const DEFAULT_LAYOUT: ThemeLayout = {
  radius: "0.5rem",
  density: "comfortable",
};

/**
 * Project a shared (desktop-shaped) preset palette onto the dashboard's
 * 3-slot model. The dashboard's `midground` is its text + primary-fill
 * colour, which is the desktop's `primary`; its `warmGlow` is the brand
 * accent stroke, which is the desktop's `midground` (falling back to `ring`).
 * `foreground` stays the dashboard's invisible white overlay. Dark palettes
 * are the dashboard's home turf, so a preset shipping `darkColors` is read
 * from that side.
 */
export function webPresetFromShared(
  preset: ThemePresetPalette,
): Omit<ThemePalette, "noiseOpacity"> {
  const colors = preset.darkColors ?? preset.colors;
  const [r, g, b] = parseColor(colors.midground ?? colors.ring) ?? [255, 255, 255];
  return {
    background: { hex: colors.background, alpha: 1 },
    midground: { hex: colors.primary, alpha: 1 },
    foreground: { hex: "#ffffff", alpha: 0 },
    warmGlow: `rgba(${r}, ${g}, ${b}, 0.3)`,
  };
}

// ---------------------------------------------------------------------------
// Themes
// ---------------------------------------------------------------------------

export const defaultTheme: DashboardTheme = {
  name: "default",
  label: "Hermes Teal",
  description: "Classic dark teal — the canonical Hermes look",
  palette: {
    background: { hex: "#041c1c", alpha: 1 },
    midground: { hex: "#ffe6cb", alpha: 1 },
    foreground: { hex: "#ffffff", alpha: 0 },
    warmGlow: "rgba(255, 189, 56, 0.35)",
    noiseOpacity: 1,
  },
  typography: DEFAULT_TYPOGRAPHY,
  layout: DEFAULT_LAYOUT,
  terminalBackground: "#000000",
};

export const midnightTheme: DashboardTheme = {
  name: "midnight",
  label: "Midnight",
  description: "Deep blue-violet with cool accents",
  palette: {
    ...webPresetFromShared(THEME_PRESET_PALETTES.midnight),
    noiseOpacity: 0.8,
  },
  typography: {
    ...DEFAULT_TYPOGRAPHY,
    fontSans: `"Inter", ${SYSTEM_SANS}`,
    fontMono: `"JetBrains Mono", ${SYSTEM_MONO}`,
    fontUrl:
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap",
    letterSpacing: "-0.005em",
  },
  layout: {
    ...DEFAULT_LAYOUT,
    radius: "0.75rem",
  },
};

export const emberTheme: DashboardTheme = {
  name: "ember",
  label: "Ember",
  description: "Warm crimson and bronze — forge vibes",
  palette: {
    ...webPresetFromShared(THEME_PRESET_PALETTES.ember),
    noiseOpacity: 1,
  },
  typography: {
    ...DEFAULT_TYPOGRAPHY,
    fontSans: `"Spectral", Georgia, "Times New Roman", serif`,
    fontMono: `"IBM Plex Mono", ${SYSTEM_MONO}`,
    fontUrl:
      "https://fonts.googleapis.com/css2?family=Spectral:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;700&display=swap",
  },
  layout: {
    ...DEFAULT_LAYOUT,
    radius: "0.25rem",
  },
  colorOverrides: {
    destructive: "#c92d0f",
    warning: "#f97316",
  },
};

export const monoTheme: DashboardTheme = {
  name: "mono",
  label: "Mono",
  description: "Clean grayscale — minimal and focused",
  palette: {
    ...webPresetFromShared(THEME_PRESET_PALETTES.mono),
    noiseOpacity: 0.6,
  },
  typography: {
    ...DEFAULT_TYPOGRAPHY,
    fontSans: `"IBM Plex Sans", ${SYSTEM_SANS}`,
    fontMono: `"IBM Plex Mono", ${SYSTEM_MONO}`,
    fontUrl:
      "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap",
  },
  layout: {
    ...DEFAULT_LAYOUT,
    radius: "0",
  },
};

export const cyberpunkTheme: DashboardTheme = {
  name: "cyberpunk",
  label: "Cyberpunk",
  description: "Neon green on black — matrix terminal",
  palette: {
    ...webPresetFromShared(THEME_PRESET_PALETTES.cyberpunk),
    noiseOpacity: 1.2,
  },
  typography: {
    ...DEFAULT_TYPOGRAPHY,
    fontSans: `"Share Tech Mono", "JetBrains Mono", ${SYSTEM_MONO}`,
    fontMono: `"Share Tech Mono", "JetBrains Mono", ${SYSTEM_MONO}`,
    fontUrl:
      "https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=JetBrains+Mono:wght@400;700&display=swap",
  },
  layout: {
    ...DEFAULT_LAYOUT,
    radius: "0",
  },
  colorOverrides: {
    success: "#00ff88",
    warning: "#ffd700",
    destructive: "#ff0055",
  },
};

export const roseTheme: DashboardTheme = {
  name: "rose",
  label: "Rosé",
  description: "Soft pink and warm ivory — easy on the eyes",
  palette: {
    background: { hex: "#1a0f15", alpha: 1 },
    midground: { hex: "#ffd4e1", alpha: 1 },
    foreground: { hex: "#ffffff", alpha: 0 },
    warmGlow: "rgba(249, 168, 212, 0.3)",
    noiseOpacity: 0.9,
  },
  typography: {
    ...DEFAULT_TYPOGRAPHY,
    fontSans: `"Fraunces", Georgia, serif`,
    fontMono: `"DM Mono", ${SYSTEM_MONO}`,
    fontUrl:
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=DM+Mono:wght@400;500&display=swap",
  },
  layout: {
    ...DEFAULT_LAYOUT,
    radius: "1rem",
  },
};

/** Light mode — vivid Nous-blue accents on a cream canvas. */
export const nousBlueTheme: DashboardTheme = {
  name: "nous-blue",
  label: "Nous Blue",
  description: "Light mode — vivid Nous-blue accents on cream canvas",
  palette: {
    background: { hex: "#E8F2FD", alpha: 1 },
    midground: { hex: "#0053FD", alpha: 1 },
    foreground: { hex: "#170d02", alpha: 0 },
    warmGlow: "rgba(0, 83, 253, 0.12)",
    noiseOpacity: 0,
  },
  typography: DEFAULT_TYPOGRAPHY,
  layout: DEFAULT_LAYOUT,
  terminalBackground: "#f5f8fc",
  terminalForeground: "#170d02",
  seriesColors: {
    inputTokenAccent: "#001934",
    outputTokenAccent: "#0053fd",
  },
  swatchColors: ["#170d02", "#0053FD", "#E8F2FD"],
};

/**
 * Same look as ``defaultTheme`` but with a larger root font size, looser
 * line-height, and ``spacious`` density so every rem-based size in the
 * dashboard scales up. For users who find the default 15px UI too dense.
 */
export const defaultLargeTheme: DashboardTheme = {
  name: "default-large",
  label: "Hermes Teal (Large)",
  description: "Hermes Teal with bigger fonts and roomier spacing",
  palette: defaultTheme.palette,
  typography: {
    ...DEFAULT_TYPOGRAPHY,
    baseSize: "18px",
    lineHeight: "1.65",
  },
  layout: {
    ...DEFAULT_LAYOUT,
    density: "spacious",
  },
};

/** HUD overlay for the Jarvis theme: blueprint grid, slow scan band, glowing headings. */
const JARVIS_CUSTOM_CSS = `
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 2147483000;
  pointer-events: none;
  background:
    radial-gradient(ellipse 70% 45% at 50% 0%, rgba(25, 211, 255, 0.10), transparent 70%),
    radial-gradient(circle at 100% 100%, rgba(255, 184, 77, 0.06), transparent 45%),
    linear-gradient(rgba(25, 211, 255, 0.045) 1px, transparent 1px) 0 0 / 48px 48px,
    linear-gradient(90deg, rgba(25, 211, 255, 0.045) 1px, transparent 1px) 0 0 / 48px 48px;
  mix-blend-mode: screen;
}
body::after {
  content: "";
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 160px;
  z-index: 2147483000;
  pointer-events: none;
  background: linear-gradient(180deg, transparent, rgba(25, 211, 255, 0.07) 70%, rgba(25, 211, 255, 0.16) 100%);
  border-bottom: 1px solid rgba(25, 211, 255, 0.25);
  transform: translateY(-160px);
  animation: hermes-jarvis-scan 9s linear infinite;
}
@keyframes hermes-jarvis-scan {
  to { transform: translateY(100vh); }
}
@keyframes hermes-jarvis-pulse {
  0%, 100% { opacity: 0.75; }
  50% { opacity: 1; }
}
h1, h2, h3, .font-expanded {
  font-family: var(--theme-font-display);
  letter-spacing: 0.14em;
  text-shadow: 0 0 12px rgba(25, 211, 255, 0.4);
}
#app-sidebar nav a[aria-current="page"] {
  text-shadow: 0 0 10px rgba(25, 211, 255, 0.7);
  animation: hermes-jarvis-pulse 3.2s ease-in-out infinite;
}
:focus-visible {
  outline: 1px solid #19d3ff;
  box-shadow: 0 0 0 3px rgba(25, 211, 255, 0.22);
}
::selection {
  background: rgba(25, 211, 255, 0.3);
  color: #ffffff;
}
* {
  scrollbar-width: thin;
  scrollbar-color: #1b8fb5 transparent;
}
@media (prefers-reduced-motion: reduce) {
  body::after { display: none; }
  #app-sidebar nav a[aria-current="page"] { animation: none; }
}
`;

/**
 * J.A.R.V.I.S.-style HUD: deep navy canvas, arc-reactor cyan, Stark gold for
 * warnings, chamfered panels, a blueprint grid and a slow scan band. Purely
 * visual — all chrome comes from tokens, `componentStyles` and `customCSS`.
 */
export const jarvisTheme: DashboardTheme = {
  name: "jarvis",
  label: "J.A.R.V.I.S.",
  description: "Arc-reactor cyan HUD — holographic panels on deep navy",
  palette: {
    background: { hex: "#02070d", alpha: 1 },
    midground: { hex: "#8be9ff", alpha: 1 },
    foreground: { hex: "#ffffff", alpha: 0 },
    warmGlow: "rgba(25, 211, 255, 0.35)",
    noiseOpacity: 0,
  },
  typography: {
    ...DEFAULT_TYPOGRAPHY,
    fontSans: `"Exo 2", ${SYSTEM_SANS}`,
    fontMono: `"JetBrains Mono", ${SYSTEM_MONO}`,
    fontDisplay: `"Orbitron", "Exo 2", ${SYSTEM_SANS}`,
    fontUrl:
      "https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Orbitron:wght@500;700&display=swap",
    letterSpacing: "0.015em",
  },
  layout: {
    radius: "2px",
    density: "comfortable",
  },
  customCSS: JARVIS_CUSTOM_CSS,
  componentStyles: {
    card: {
      background:
        "linear-gradient(90deg, #19d3ff, transparent 45%) top / 100% 1px no-repeat, linear-gradient(180deg, rgba(8, 34, 50, 0.78), rgba(2, 10, 16, 0.88))",
      boxShadow:
        "inset 0 0 0 1px rgba(25, 211, 255, 0.16), inset 0 0 28px rgba(25, 211, 255, 0.06)",
      clipPath:
        "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
    },
    header: {
      background: "linear-gradient(180deg, #04131c, #020a10)",
      borderImage: "linear-gradient(90deg, transparent, #19d3ff, transparent) 1",
    },
    sidebar: {
      background: "linear-gradient(180deg, #04131c 0%, #020a10 100%)",
      borderImage:
        "linear-gradient(180deg, transparent, #19d3ff 35%, #19d3ff 65%, transparent) 1",
    },
    tab: {
      clipPath:
        "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
    },
  },
  colorOverrides: {
    primary: "#19d3ff",
    primaryForeground: "#02111a",
    accent: "#0b2a3a",
    accentForeground: "#bff4ff",
    border: "#0e4a63",
    ring: "#19d3ff",
    success: "#3df5b0",
    warning: "#ffb84d",
    destructive: "#ff5c7a",
  },
  seriesColors: {
    inputTokenAccent: "#ffb84d",
    outputTokenAccent: "#19d3ff",
  },
  swatchColors: ["#02070d", "#19d3ff", "#ffb84d"],
  terminalBackground: "#020a10",
  terminalForeground: "#bdf3ff",
};

export const BUILTIN_THEMES: Record<string, DashboardTheme> = {
  default: defaultTheme,
  "default-large": defaultLargeTheme,
  jarvis: jarvisTheme,
  "nous-blue": nousBlueTheme,
  midnight: midnightTheme,
  ember: emberTheme,
  mono: monoTheme,
  cyberpunk: cyberpunkTheme,
  rose: roseTheme,
};
