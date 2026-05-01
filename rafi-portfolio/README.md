# Rafi Ahmed — Portfolio Website

A professional, minimalist dark-mode portfolio built with **Next.js 14**, **Tailwind CSS**, and **Lucide React**.

---

## 🗂 File Structure

```
rafi-portfolio/
├── app/
│   ├── layout.tsx          # Root layout with DM Sans font
│   ├── page.tsx            # Main page — toggles between Public & Admin
│   └── globals.css         # CSS variables + global styles
├── components/
│   ├── Navbar.tsx          # Fixed nav with page switcher
│   ├── Hero.tsx            # Full-screen hero section
│   ├── Gallery.tsx         # Filterable project grid
│   ├── Contact.tsx         # Contact form section
│   └── AdminDashboard.tsx  # Admin CRUD dashboard
├── lib/
│   └── store.ts            # Type definitions + seed data
├── tailwind.config.ts
└── package.json
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

---

## ✨ Features

### Public Portfolio
- **Hero** — Full-screen with name, tagline, stats
- **Gallery** — Masonry grid with category filters (Branding / Typography / Illustrations)
- **Contact** — Two-column form with project type selector

### Admin Dashboard
- **Add projects** — Title, Category, Image URL, Description
- **Edit projects** — Pre-fills form, inline update
- **Delete projects** — Instant removal with toast notification
- **Live sync** — Gallery updates in real-time via `useState`

### Design
- Dark mode by default (`#0a0a0a` background)
- **Bebas Neue** display font + **DM Sans** body font
- Warm sand accent palette (`#e8d5b0`, `#c4a882`)
- Smooth hover effects on gallery cards

---

## 🔧 Extending for Production

| Feature | Recommendation |
|---|---|
| Authentication | Next.js middleware + NextAuth.js |
| Data persistence | Supabase or PlanetScale (MySQL) |
| Image hosting | Cloudinary or Vercel Blob |
| Deployment | Vercel (zero-config) |
| CMS | Sanity.io for full content management |

---

## 🎨 Customising

Edit `lib/store.ts` to change seed projects.
Edit `app/globals.css` CSS variables to retheme the entire site.
