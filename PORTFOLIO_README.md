# Premium MERN Full-Stack Developer Portfolio

A modern, professional portfolio website featuring a dark theme with neon green accents, smooth animations, and premium editorial design.

## 🎨 Design Features

### Color Palette
- **Background**: Near-black (#0a0a0a)
- **Primary Accent**: Neon Green (#c4ff00)
- **Text**: White/Off-white with varying opacity
- **Borders**: Subtle white with low opacity

### Design Principles
- **Minimal & Clean**: Intentional negative space, no clutter
- **Premium Editorial Style**: Large bold typography, thin borders
- **Smooth Animations**: Professional transitions using Framer Motion
- **Fully Responsive**: Optimized for desktop, tablet, and mobile

## 📁 Project Structure

```
src/
├── components/
│   └── portfolio/
│       ├── Navbar.tsx           # Fixed navigation with smooth scroll
│       ├── Hero.tsx             # Editorial hero section
│       ├── About.tsx            # About section with tech stack
│       ├── ProjectShowcase.tsx  # Interactive project carousel
│       ├── Experience.tsx       # Timeline and skills
│       ├── Contact.tsx          # Contact section
│       ├── Footer.tsx           # Footer with social links
│       └── CustomCursor.tsx     # Custom cursor effect (desktop)
├── data/
│   └── portfolio.ts             # All portfolio data (projects, experience, skills)
├── routes/
│   └── index.tsx                # Main page component
└── styles.css                   # Global styles with neon green theme
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## 📝 Customization Guide

### 1. Personal Information

Edit `src/data/portfolio.ts`:

```typescript
export const socialLinks = {
  email: "your-email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  fiverr: "https://fiverr.com/yourusername"
};
```

### 2. Projects

Update the `projects` array in `src/data/portfolio.ts`:

```typescript
{
  id: 1,
  title: "Your Project Name",
  description: "Detailed project description...",
  technologies: ["React", "Node.js", "MongoDB"],
  image: "/projects/your-image.jpg",
  liveUrl: "https://your-project.com",
  githubUrl: "https://github.com/you/project"
}
```

**Add Project Screenshots**:
- Place images in `public/projects/` folder
- Recommended size: 1200x900px (4:3 aspect ratio)
- Format: JPG or PNG
- Optimize images to < 500KB for better performance

### 3. Experience

Update the `experiences` array in `src/data/portfolio.ts`:

```typescript
{
  id: 1,
  period: "JUN 2026 — PRESENT",
  title: "Your Job Title",
  company: "Company Name",
  location: "Location",
  description: "What you do..."
}
```

### 4. Skills

Update the `skills` array in `src/data/portfolio.ts`:

```typescript
export const skills = [
  "Your Skill 1",
  "Your Skill 2",
  // Add more skills...
];
```

### 5. Branding

**Logo/Name**: Edit the name "FIZA" in:
- `src/components/portfolio/Navbar.tsx`
- `src/components/portfolio/Footer.tsx`

**Availability Status**: Modify the availability indicator in the Navbar and Footer components.

## 🎬 Animations

The portfolio uses Framer Motion for smooth, professional animations:

- **Scroll Animations**: Elements fade and slide into view
- **Hover Effects**: Subtle scale and color transitions
- **Page Transitions**: Smooth navigation scrolling
- **Custom Cursor**: Desktop-only interactive cursor (hidden on mobile)
- **Project Carousel**: Smooth transitions between projects

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations
- Hamburger menu navigation
- Stacked layouts
- Touch-optimized buttons
- Hidden custom cursor
- Optimized typography scaling

## 🎨 Color Theme

The neon green theme is defined in `src/styles.css`:

```css
:root {
  --accent-color: #c4ff00;
  --accent-color-dim: rgba(196, 255, 0, 0.15);
}
```

To change the accent color:
1. Update `--accent-color` and related variables in `src/styles.css`
2. Replace `#c4ff00` throughout component files
3. Update glow effects and hover states

## 🔧 Tech Stack

- **Framework**: React 19 + Vite
- **Routing**: TanStack Router
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Type Safety**: TypeScript

## 📦 Build Output

Running `npm run build` creates:
- `dist/client/` - Static assets for hosting
- `dist/server/` - Server bundle (if needed)
- Optimized and minified for production

## 🌐 Deployment

### Static Hosting (Recommended)
Deploy the `dist/client` folder to:
- **Vercel**: Connect your GitHub repo
- **Netlify**: Drag & drop or connect repo
- **GitHub Pages**: Use GitHub Actions
- **AWS S3 + CloudFront**: Upload to S3 bucket

### Build Command
```bash
npm run build
```

### Output Directory
```
dist/client
```

## ✅ Testing Checklist

Before deploying, verify:

- [ ] All navigation links work correctly
- [ ] All CTAs (buttons) are functional
- [ ] Mobile menu opens and closes properly
- [ ] All sections scroll smoothly
- [ ] Project navigation (prev/next) works
- [ ] Contact links open correctly
- [ ] No horizontal scrolling on mobile
- [ ] Images load properly
- [ ] No console errors
- [ ] Animations perform smoothly
- [ ] Site works on different browsers
- [ ] Responsive on all screen sizes

## 🎯 Performance Tips

1. **Optimize Images**:
   - Use WebP format when possible
   - Compress images before upload
   - Use lazy loading for below-fold images

2. **Code Splitting**:
   - Already configured with Vite
   - Components load on demand

3. **Animations**:
   - Hardware-accelerated transforms
   - Reduced motion support included

4. **Fonts**:
   - System fonts used for better performance
   - No external font loading

## 📄 License

This portfolio template is free to use for personal and commercial projects. Attribution is appreciated but not required.

## 🤝 Support

For questions or issues:
1. Check the customization guide above
2. Review component files for inline comments
3. Consult Framer Motion and Tailwind CSS documentation

## 🎉 Features

- ✅ Modern, premium design
- ✅ Smooth scroll navigation
- ✅ Interactive project showcase
- ✅ Custom cursor (desktop)
- ✅ Mobile-friendly responsive design
- ✅ Optimized performance
- ✅ SEO-friendly structure
- ✅ Accessibility compliant
- ✅ Easy to customize
- ✅ Production-ready

---

Built with ❤️ for MERN Full-Stack Developers
