# BossmanDrive — Premium Nigerian Luxury Car Dealership

A modern, minimalist, production-ready automotive dealership web application built for the Nigerian luxury and executive market (Victoria Island, Lekki Phase 1, and Maitama Abuja).

Features authentic Nigerian Naira (`₦`) pricing, Foreign Used (Tokunbo) / Brand New / Certified Nigerian Used vehicle catalog, 100% Nigerian Customs Service (NCS) Single Goods Declaration (SGD) verification hub, interactive Car Swap & Trade-In equity valuation calculator, side-by-side vehicle comparison, wishlist favorites, and an animated multi-agent **WhatsApp VIP Concierge widget**.

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/) / GitHub Pages / Cloud Run

---

## 📁 Project Structure

```text
bossmandrive/
├── public/
│   ├── images/                          # Production-ready vehicle and showroom imagery
│   │   ├── hero_luxury_dealership_showroom.jpg
│   │   ├── car_mercedes_g63_amg.jpg
│   │   ├── car_lexus_lx600_suv.jpg
│   │   ├── car_landcruiser_300.jpg
│   │   └── car_range_rover_autobiography.jpg
│   └── src/assets/images/               # Fallback mirror for direct source path compatibility
├── src/
│   ├── assets/images/                   # Source original assets
│   ├── components/
│   │   ├── Navbar.tsx                   # Top Bar contract navigation with currency toggle
│   │   ├── Hero.tsx                     # Cinematic showroom hero + quick search console
│   │   ├── CarCard.tsx                  # Vehicle card with zero-pill metadata & direct WhatsApp
│   │   ├── CarModal.tsx                 # Detailed inspection modal & appointment scheduler
│   │   ├── CarFilter.tsx                # Multi-criteria segmented filter controls
│   │   ├── CarSwapCalculator.tsx        # Instant Nigerian car trade-in valuation calculator
│   │   ├── CustomsGuarantee.tsx         # NCS Single Goods Declaration (SGD) verification hub
│   │   ├── CompareModal.tsx             # Side-by-side 3-vehicle comparison matrix
│   │   ├── SavedCarsDrawer.tsx          # Wishlist favorites drawer with persistent state
│   │   ├── ShowroomsAndTestimonials.tsx # Lagos & Abuja vaults + verified VIP deliveries
│   │   ├── Footer.tsx                   # Showroom addresses, legal and CAC disclaimers
│   │   └── WhatsAppWidget.tsx           # Floating animated multi-agent WhatsApp concierge
│   ├── data/
│   │   └── cars.ts                      # Curated vehicle catalog and WhatsApp agent profiles
│   ├── types/
│   │   └── car.ts                       # TypeScript interfaces
│   ├── utils/
│   │   └── formatters.ts                # Naira/USD currency formatters & WhatsApp URL builders
│   ├── App.tsx                          # Root application component
│   ├── main.tsx                         # React 19 entry point
│   └── index.css                        # Global Tailwind CSS v4 styles & luxury dark theme
├── .env.example                         # Environment configuration template
├── .gitignore                           # Git exclusions (preserves public/ and src/assets/)
├── index.html                           # HTML entry with luxury typography Google Fonts
├── metadata.json                        # App metadata
├── package.json                         # Dependencies without conflicts
├── package-lock.json                    # Audited lockfile with 0 peer dependency conflicts
├── tsconfig.json                        # TypeScript configuration
├── vercel.json                          # Vercel deployment configuration with SPA rewrites
└── README.md                            # Complete documentation
```

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js `18.x` or higher
- npm `9.x` or higher

### 2. Installation
Clone the repository and install dependencies using standard `npm install`:
```bash
npm install
```
*(Resolves cleanly with 0 vulnerabilities and 0 peer dependency conflicts).*

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 4. Create Production Build
```bash
npm run build
```
The compiled, minified production assets are output to the `dist/` folder.

### 5. Preview Production Build Locally
```bash
npm run preview
```

---

## 🌐 Deploying to Vercel

This repository is pre-configured with `vercel.json` and builds smoothly on Vercel without any additional tweaks.

### Step-by-Step Vercel Deployment:

1. **Upload your code to GitHub**:
   - Initialize git in your local project root:
     ```bash
     git init
     git add .
     git commit -m "Initial commit of BossmanDrive"
     ```
   - Create a new repository on GitHub (e.g. `bossmandrive`).
   - Push your code:
     ```bash
     git remote add origin https://github.com/<your-username>/bossmandrive.git
     git branch -M main
     git push -u origin main
     ```
   > **Note**: Make sure to upload the **entire project root** (containing `package.json`, `index.html`, `public/`, `src/`, etc.), **NOT** just the `src` folder.

2. **Connect to Vercel**:
   - Log into [Vercel](https://vercel.com).
   - Click **"Add New Project"** and select **"Import Git Repository"**.
   - Choose your `bossmandrive` GitHub repository.

3. **Verify Project Settings**:
   Vercel automatically detects Vite from `vercel.json`:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Deploy**:
   - Click **"Deploy"**.
   - Deployment takes ~30 seconds and outputs a live, custom URL (e.g., `https://bossmandrive.vercel.app`).

---

## 🔧 Resolutions to Previous Deployment Errors

### 1. Fixed "ERESOLVE could not resolve" Dependency Error
- **Root Cause**: `package.json` had an outdated, conflicting `"esbuild": "^0.25.0"` pinned in `devDependencies` that conflicted with Vite's internal peer dependency requirements (`esbuild@^0.27.0 || ^0.28.0`).
- **Resolution**: Removed the conflicting explicit esbuild pin from `package.json` and aligned `@tailwindcss/vite`, `@vitejs/plugin-react`, and `motion`.
- **Result**: `npm install` runs smoothly on standard npm and on Vercel without needing `--legacy-peer-deps` or `--force`.

### 2. Fixed Image Loading Issues in Production
- **Root Cause**: Images were previously referenced using development-only paths (`/src/assets/images/...`). In a production Vite build (`npm run build`), the `src` folder is bundled into JavaScript and not served as static files, resulting in 404 errors on live deployments.
- **Resolution**:
  1. All vehicle photography and showroom assets are placed in the `public/images/` directory.
  2. All image paths in `src/data/cars.ts` use root-relative `/images/...` paths.
  3. When Vite builds to `dist/`, everything in `public/` is copied verbatim into `dist/images/`.
  4. Added asset caching headers in `vercel.json` for lightning-fast image delivery.
  5. Fallback CSS styling and fallback paths ensure zero broken image frames.

---

## 🛡 License

Licensed under the Apache License, Version 2.0.
