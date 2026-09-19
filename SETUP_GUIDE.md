# Setup Guide - Premium MERN Portfolio

## 🎯 Quick Start (5 minutes)

### Step 1: Start Development Server

```bash
npm run dev
```

Open your browser to `http://localhost:8080`

### Step 2: Update Your Information

Open `src/data/portfolio.ts` and update:

1. **Your Contact Info**:
```typescript
export const socialLinks = {
  email: "your-email@example.com",        // ← Change this
  github: "https://github.com/username",  // ← Change this
  linkedin: "https://linkedin.com/in/username", // ← Change this
  fiverr: "https://fiverr.com/username"   // ← Change this
};
```

2. **Your Experience**:
```typescript
export const experiences: Experience[] = [
  {
    id: 1,
    period: "YOUR DATES HERE",           // ← Change this
    title: "Your Job Title",             // ← Change this
    company: "Your Company",             // ← Change this
    location: "Your Location",           // ← Change this
    description: "What you do..."        // ← Change this
  }
];
```

3. **Your Skills** (optional - modify as needed):
```typescript
export const skills = [
  "Full-Stack Web Applications",
  // Add or remove skills...
];
```

### Step 3: Add Your Projects

In the same `src/data/portfolio.ts` file, update the projects:

```typescript
{
  id: 1,
  title: "Your Project Name",           // ← Change this
  description: "Project description",   // ← Change this
  technologies: ["Tech1", "Tech2"],     // ← Change this
  image: "/projects/your-image.jpg",    // ← Add your image
  liveUrl: "https://your-site.com",     // ← Change this
  githubUrl: "https://github.com/..."   // ← Change this
}
```

### Step 4: Add Project Images

1. Take screenshots of your projects (1200x900px recommended)
2. Save them in the `public/projects/` folder
3. Name them to match the image paths in your project data

Example:
- `public/projects/ecommerce.jpg`
- `public/projects/portfolio.jpg`
- etc.

## 🎨 Customization Options

### Change Your Name/Logo

**File**: `src/components/portfolio/Navbar.tsx` (line ~37)

```typescript
FIZA<span className="text-[#c4ff00]">.</span>
```

Change "FIZA" to your name.

**File**: `src/components/portfolio/Footer.tsx` (line ~28)

```typescript
FIZA<span className="text-[#c4ff00]">.</span>
```

Change here too for consistency.

### Modify Hero Section Text

**File**: `src/components/portfolio/Hero.tsx` (lines ~28-40)

```typescript
<h1>I build</h1>
<h1>digital</h1>        {/* This word is in neon green */}
<h1>experiences.</h1>
```

Update to your preferred headline.

### Change Availability Status

**Navbar** (`src/components/portfolio/Navbar.tsx` line ~77):
```typescript
<span className="text-xs text-white/60">Available</span>
```

**Footer** (`src/components/portfolio/Footer.tsx` line ~72):
```typescript
<span className="text-xs text-white/60">Available for freelance</span>
```

### Adjust Accent Color

**File**: `src/styles.css` (line ~59)

```css
--accent-color: #c4ff00;  /* Neon Green */
```

Change `#c4ff00` to any color you prefer.

You'll also need to update the color in components:
- Search for `#c4ff00` or `[#c4ff00]`
- Replace with your new color code

**Common places**:
- Button backgrounds
- Hover states
- Glow effects
- Border colors

## 📱 Testing Your Portfolio

### Desktop Testing
1. Open `http://localhost:8080`
2. Test all navigation links
3. Click through all projects (prev/next buttons)
4. Test contact links
5. Check animations and hover effects

### Mobile Testing
1. Open browser dev tools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select a mobile device (iPhone, Android)
4. Test hamburger menu
5. Check all sections scroll correctly
6. Verify no horizontal scrolling

### Browser Compatibility
Test in:
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## 🚀 Deployment

### Option 1: Vercel (Easiest)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects settings
6. Click "Deploy"

Done! Your site is live.

### Option 2: Netlify

1. Build your site:
   ```bash
   npm run build
   ```

2. Go to [netlify.com](https://netlify.com)
3. Drag & drop the `dist/client` folder
4. Your site is live!

### Option 3: GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist/client"
     }
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

## ✨ Pro Tips

### Image Optimization

Before adding project images:
1. Resize to 1200x900px
2. Use [TinyPNG](https://tinypng.com) to compress
3. Keep file size under 500KB
4. Use JPG for photos, PNG for graphics

### Performance

The site is already optimized, but you can:
- Use WebP images (better compression)
- Enable Cloudflare (free CDN)
- Lazy load images below the fold

### SEO

Add meta tags to `index.html`:
```html
<title>Your Name - MERN Full-Stack Developer</title>
<meta name="description" content="Your description">
<meta property="og:title" content="Your Name - Portfolio">
<meta property="og:image" content="/og-image.jpg">
```

Create `public/og-image.jpg` (1200x630px) for social sharing.

### Analytics

Add Google Analytics:
1. Get tracking ID from [analytics.google.com](https://analytics.google.com)
2. Add script to `index.html` `<head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🐛 Troubleshooting

### Dev Server Won't Start

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Build Fails

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Clear cache and rebuild
rm -rf dist
npm run build
```

### Images Not Loading

- Check file names match exactly (case-sensitive)
- Verify images are in `public/projects/` folder
- Check image paths in `src/data/portfolio.ts`

### Animations Laggy

- Reduce animation complexity in components
- Check browser performance tab
- Test on different devices

### Mobile Menu Not Working

- Clear browser cache
- Check for JavaScript errors in console
- Test in different browsers

## 📋 Pre-Launch Checklist

Before deploying to production:

- [ ] Update all personal information
- [ ] Add all project details
- [ ] Upload project screenshots
- [ ] Test all navigation links
- [ ] Test all CTAs (buttons)
- [ ] Verify contact links work
- [ ] Test on mobile devices
- [ ] Test in multiple browsers
- [ ] Check for console errors
- [ ] Optimize all images
- [ ] Add meta tags for SEO
- [ ] Test loading speed
- [ ] Proofread all text
- [ ] Get feedback from friends
- [ ] Run Lighthouse audit

## 🎓 Learning Resources

### Customize Further

- [Framer Motion Docs](https://www.framer.com/motion/) - Advanced animations
- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Styling utilities
- [React Docs](https://react.dev) - React fundamentals

### Design Inspiration

- [Awwwards](https://awwwards.com) - Award-winning designs
- [Dribbble](https://dribbble.com) - Portfolio designs
- [Behance](https://behance.net) - Creative portfolios

## 💡 Need Help?

1. **Check the code**: All components have comments
2. **Read the docs**: Check framework documentation
3. **Search**: Most issues have solutions online
4. **Ask**: Reach out to the dev community

## 🎉 You're Ready!

Your portfolio is now ready to customize and deploy. Take your time to make it truly yours!

Key points to remember:
- ✅ Keep it simple and professional
- ✅ Showcase your best work
- ✅ Make it easy to contact you
- ✅ Keep content up to date
- ✅ Test on all devices

Good luck! 🚀
