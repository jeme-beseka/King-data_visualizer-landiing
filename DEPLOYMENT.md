# Netlify Deployment Guide

This guide covers deploying the King Data Visualizer landing page to Netlify with direct .exe file download support.

## Prerequisites

- Node.js 20 or higher
- npm or yarn
- Netlify account (free tier works)
- Git repository (optional, for automatic deployments)

## Pre-Deployment Checklist

1. **Verify .exe file placement**
   - Ensure `King_Data_Visualizer-3.3.exe` is in the `/public` folder
   - Current size: ~77MB (within Netlify's 100MB free tier limit)
   - If file grows beyond 100MB, consider Netlify Large Media add-on

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Test local build**
   ```bash
   npm run build
   ```
   - Verify `dist/` folder is created
   - Check that .exe file is copied to `dist/`
   - Test the build locally: `npm run preview`

## Deployment Methods

### Method 1: Drag & Drop (Simplest)

1. Build the project:
   ```bash
   npm run build
   ```

2. Log in to Netlify (app.netlify.com)

3. Go to "Sites" tab

4. Drag the `dist/` folder to the deployment area

5. Netlify will deploy automatically

6. Test the download functionality

### Method 2: Git Integration (Recommended for ongoing updates)

1. Push your code to GitHub/GitLab/Bitbucket

2. Log in to Netlify

3. Click "Add new site" → "Import an existing project"

4. Select your Git provider and repository

5. Configure build settings (already in `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 20

6. Click "Deploy site"

7. Future pushes will auto-deploy

## Configuration Files

### netlify.toml
- Build command and publish directory
- SPA routing redirects
- .exe file download headers
- Security headers
- Deployment checklist (see comments in file)

### vite.config.js
- Base path set to `./` for relative assets
- Output directory: `dist/`
- Asset size limits configured
- Code splitting for better performance

## Environment Variables

Optional environment variables can be set in Netlify dashboard:

1. Go to Site settings → Environment variables

2. Add any needed variables (see `.env.example`):
   - `VITE_WEB_APP_URL` (for future web app)
   - `VITE_GA_ID` (Google Analytics)
   - `VITE_API_URL` (API endpoints)

## Post-Deployment Testing

1. **Test navigation**
   - All sections load correctly
   - Scroll navigation works
   - Mobile menu functions

2. **Test download**
   - Click download buttons in Hero and Download sections
   - Verify .exe file downloads (doesn't open in browser)
   - Check file integrity

3. **Test animations**
   - Loading screen shows on first visit
   - Scroll progress bar works
   - Parallax effects function
   - Custom cursor appears (desktop only)

4. **Test SEO**
   - Check page title and meta description
   - Verify Open Graph tags
   - Test social media sharing

## Troubleshooting

### Download opens in browser instead of downloading
- Check `netlify.toml` headers configuration
- Verify .exe file path matches header rule
- Clear browser cache and retry

### 404 errors on page refresh
- Verify redirect rule in `netlify.toml`
- Check that SPA routing is configured correctly

### Build fails
- Ensure Node.js version 20 is set in Netlify
- Check build logs for specific errors
- Verify all dependencies are installed

### Large file warnings
- Current .exe is ~77MB (within limit)
- If file grows, consider Netlify Large Media add-on
- Alternatively, host .exe on CDN and link to it

## Continuous Deployment

With Git integration set up:

1. Make changes locally
2. Commit and push to Git
3. Netlify automatically builds and deploys
4. Preview deployments available for pull requests

## Custom Domain (Optional)

1. Go to Site settings → Domain management

2. Add custom domain

3. Update DNS records as instructed by Netlify

4. Enable HTTPS (automatic with Netlify)

## Performance Optimization

The project includes:
- Code splitting (vendor, framer-motion, recharts chunks)
- Lazy loading for images
- Debounced scroll events
- React.memo for component optimization
- Asset size warnings configured

## Security

Netlify configuration includes:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- HTTPS automatically enabled

## Support

For issues:
- Check Netlify deployment logs
- Review browser console for errors
- Verify all configuration files are correct
- Test locally with `npm run build && npm run preview`
