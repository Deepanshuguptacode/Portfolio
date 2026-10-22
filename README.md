# Deepanshu Gupta — AI Engineer Portfolio

A sleek, responsive, and high-performance personal portfolio website built with HTML5, CSS3, and JavaScript, featuring cyberpunk neon themes, custom interactive particle canvas, dynamic project filtering, and smooth micro-animations.

---

## 🚀 Deploy to Vercel

This repository is fully configured and optimized for **Vercel** with:
- `vercel.json` (security headers, caching policies, clean URLs)
- Custom branded `404.html` error page
- Responsive SVG favicon (`favicon.svg`)
- Open Graph and Twitter Card social metadata
- `robots.txt` & `sitemap.xml` for SEO

### Method 1: Deploy via Vercel Web Dashboard (Recommended)

1. Push this repository to your GitHub account:
   ```bash
   git add .
   git commit -m "Configure project for Vercel deployment"
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..." → "Project"**.
4. Select and **Import** the `Portfolio` repository.
5. In the configuration screen:
   - **Framework Preset:** `Other` (auto-detected)
   - **Root Directory:** `./`
   - **Build and Output Settings:** Leave default (no build command needed)
6. Click **Deploy**. Your portfolio will be live in seconds with an SSL-secured URL (e.g. `https://portfolio-xxx.vercel.app`).

Every future commit pushed to `main` will automatically trigger a production deployment!

---

### Method 2: Deploy via Vercel CLI (Terminal)

You don't need global installation; simply run with `npx`:

```bash
# Preview deployment
npx vercel

# Production deployment
npx vercel --prod
```

Follow the interactive prompts in your terminal:
- Set up and deploy? **Y**
- Which scope? Select your personal account
- Link to existing project? **N** (for first time)
- Project name: `portfolio` (or your preferred name)
- In which directory is your code located? `./`

---

## 🌐 Custom Domain Setup (Optional)

1. In your Vercel project dashboard, navigate to **Settings → Domains**.
2. Enter your custom domain (e.g., `deepanshugupta.tech` or `voxveritas.tech`).
3. Follow the DNS instructions provided by Vercel (adding A and CNAME records at your domain registrar).

---

## 🛠️ Project Structure

```text
├── index.html           # Main portfolio single-page application
├── style.css            # Styles, design tokens, responsive breakpoints, animations
├── script.js            # Particle canvas, theme switcher, filters, interaction logic
├── 404.html             # Custom branded AI 404 error page
├── vercel.json          # Vercel configuration (headers, clean URLs, cache headers)
├── favicon.svg          # Modern SVG favicon matching brand logo
├── robots.txt           # Search crawler directives
├── sitemap.xml          # Sitemap for SEO discovery
├── profile.png          # Profile avatar and social preview image
└── .gitignore           # Git ignore file for Vercel, IDEs, and local logs
```

---

## 📄 License

&copy; 2025 Deepanshu Gupta. All rights reserved.
