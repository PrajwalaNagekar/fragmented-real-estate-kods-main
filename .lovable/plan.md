# Phase 6: Deep Navy Blue Theme & Splash Redesign

Match the uploaded reference screenshots exactly — solid navy blue splash, navy gradient accents, and dark navy logo.

---

## 1. Splash Screen — Solid Navy Blue (No Photo)

The reference (image-9) shows a **solid deep navy gradient** background with NO property photo. Just a smooth gradient from `#081630` (edges) to `#0F2A5C` (center) with a subtle radial blue glow behind the logo.

**Changes to `SplashScreen.tsx`:**

- Remove the Unsplash `<img>` entirely
- Replace with a solid CSS gradient background: `radial-gradient(ellipse at center, #132B5E 0%, #0A1A3B 50%, #060E24 100%)`
- Add a subtle blue glow circle behind the logo (not cyan/teal — deep blue `#1E3A8A` with low opacity)
- Keep the "O" logo box but change `gradient-gold` to a new navy-blue gradient class
- Update the shimmer animation to blue tones instead of cyan
- Keep the loading dots but use deep blue color instead of `bg-primary` cyan

---

## 2. Logo Icon — Dark Navy Blue Gradient

The reference shows the logo icon using a **deep navy-to-royal-blue** gradient, NOT teal/cyan.

**Changes to `src/index.css`:**

- `.gradient-gold`: Change from `hsl(210, 45%, 18%) → hsl(192, 80%, 32%)` (navy-to-cyan) to `hsl(220, 60%, 15%) → hsl(220, 70%, 35%)` (deep navy-to-royal-blue)
- `.glow-gold`: Change from cyan glow to deep blue glow `rgba(30, 58, 138, 0.35)`
- `.shimmer`: Change from cyan `hsl(192, 91%, 50%)` to royal blue `hsl(220, 80%, 50%)`

---

## 3. CSS Color Variables — Navy Blue Primary

The reference uses **royal/deep blue** as the primary accent (not cyan). Update both modes:

**Light Mode (:root):**


| Token          | Current              | New                                  |
| -------------- | -------------------- | ------------------------------------ |
| `--primary`    | `199 89% 48%` (cyan) | `220 80% 50%` (royal blue `#1D4ED8`) |
| `--ring`       | `199 89% 48%`        | `220 80% 50%`                        |
| `--gold`       | `199 89% 48%`        | `220 80% 50%`                        |
| `--gold-muted` | `199 70% 38%`        | `220 65% 40%`                        |
| `--rose`       | `199 60% 65%`        | `220 60% 65%`                        |


**Dark Mode (.theme-dark):**


| Token          | Current              | New                                          |
| -------------- | -------------------- | -------------------------------------------- |
| `--primary`    | `192 91% 50%` (cyan) | `220 80% 60%` (lighter royal blue `#3B82F6`) |
| `--ring`       | `192 91% 50%`        | `220 80% 60%`                                |
| `--gold`       | `192 91% 50%`        | `220 80% 60%`                                |
| `--gold-muted` | `192 70% 40%`        | `220 65% 45%`                                |
| `--rose`       | `192 60% 65%`        | `220 60% 70%`                                |


Sidebar primary tokens also shift from `199`/`192` hue to `220` hue.

---

## 4. Dashboard Chart Gradient

The chart in `Dashboard.tsx` already uses `hsl(250, 100%, 55%)` (purple-blue). Update to match the navy-blue theme:

- Change chart gradient from `hsl(250, 100%, 55%)` to `hsl(220, 80%, 50%)` (royal blue)
- This affects the `blueGrad` linearGradient and the Area stroke/fill

---

## 5. MobileShell Battery Icon

The reference (image-8) shows a **green battery icon**. Currently using `bg-primary` (which was cyan, will become blue). Change the battery fill to green `bg-emerald-500` to match the reference exactly.  
  
**6. Add colorful grapgs and colorful dashboards.**

---

## Files Changed


| File                                  | Changes                                                                                  |
| ------------------------------------- | ---------------------------------------------------------------------------------------- |
| `src/index.css`                       | Primary hue shift from cyan (192-199) to royal blue (220); gradient/glow/shimmer updates |
| `src/components/app/SplashScreen.tsx` | Remove photo background; solid navy gradient; navy-blue glow behind logo                 |
| `src/components/app/MobileShell.tsx`  | Battery icon fill to green                                                               |
| `src/components/app/Dashboard.tsx`    | Chart gradient from purple to royal blue                                                 |


---

## Implementation Order

1. CSS variable overhaul — shift all cyan/teal accents to deep navy-royal blue
2. Splash screen — remove photo, solid navy gradient, blue logo glow
3. MobileShell — green battery icon
4. Dashboard — chart color alignment