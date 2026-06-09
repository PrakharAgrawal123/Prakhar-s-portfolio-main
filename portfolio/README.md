# Prakhar Agrawal — 3D Portfolio Website

A modern, futuristic 3D portfolio built with React, Three.js, Framer Motion, and Tailwind CSS.

## 🚀 Tech Stack

- **React 18** + **Vite** (build tool)
- **Three.js** + **React Three Fiber** (3D graphics)
- **@react-three/drei** (3D helpers: Stars, Float, MeshDistortMaterial)
- **Framer Motion** (animations & transitions)
- **Tailwind CSS** (utility-first styling)
- **Recharts** (data visualization charts)
- **React Type Animation** (typewriter effect)
- **React Intersection Observer** (scroll-triggered animations)

## 📁 Project Structure

```
portfolio/
├── public/
├── src/
│   ├── components/
│   │   ├── Loader.jsx        # Animated loading screen
│   │   ├── Cursor.jsx        # Custom neon cursor
│   │   ├── Navbar.jsx        # Sticky nav with scroll detection
│   │   ├── Hero.jsx          # 3D animated hero section
│   │   ├── About.jsx         # Bio + timeline
│   │   ├── Skills.jsx        # 3D orbit + skill bars
│   │   ├── Projects.jsx      # Tilt cards for projects
│   │   ├── DataScience.jsx   # Charts + pipeline viz
│   │   ├── Achievements.jsx  # Achievement cards + stats
│   │   ├── Contact.jsx       # Contact form + socials
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css             # Global styles + animations
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 🛠 Setup & Run

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# 1. Navigate to the project folder
cd portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

## 🎨 Features

### Design
- **Dark futuristic theme** with neon cyan (#00f5ff), purple (#bf00ff), and green (#00ff88) accents
- **Glassmorphism** cards with backdrop blur
- **Custom cursor** with smooth lag effect
- **Scan line overlay** for cyberpunk feel
- **Grid background** throughout

### Sections
1. **Hero** — Full 3D scene (Three.js) with floating shapes, particle rings, orbiting spheres, star field, and mouse parallax camera
2. **About** — Bio card + interactive journey timeline
3. **Skills** — 3D orbiting spheres + animated skill bars by category
4. **Projects** — 3D tilt-on-hover cards for all three projects
5. **Data Science** — Live Recharts (Radar, Area, Bar) + pipeline visualization
6. **Achievements** — CGPA, GSSoC, HackDiwas cards with progress goals
7. **Contact** — Validated form + social links

### Performance
- Lazy 3D scene loading with Suspense
- Scroll-triggered animations (only animate when in view)
- CSS animations for decorative elements (no JS overhead)
- Tree-shaking via Vite

## 📝 Customization

Update your personal info in:
- `src/components/Hero.jsx` — Name, title, stats
- `src/components/About.jsx` — Bio, timeline events
- `src/components/Projects.jsx` — Project details, GitHub links
- `src/components/Achievements.jsx` — Achievements & goals
- `src/components/Contact.jsx` — Email, location, social URLs

## 🌐 Deployment

Deploy to Vercel (recommended):
```bash
npm run build
# Upload /dist folder to Vercel or run:
npx vercel --prod
```

Or Netlify:
```bash
npm run build
# Drag /dist to netlify.com/drop
```

---

Built with ❤️ for Prakhar Agrawal's portfolio
