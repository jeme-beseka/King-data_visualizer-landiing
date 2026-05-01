# King Data Visualizer Landing Page

A modern, high-performance landing page for King Data Visualizer - a free, open-source desktop application for creating interactive data visualizations from CSV files.

![King Data Visualizer](https://img.shields.io/badge/version-3.3-gold)
![React](https://img.shields.io/badge/React-18.3-61DAFB)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Features

- **Modern UI/UX**: Dark theme with gold accents, smooth animations, and premium feel
- **Interactive Elements**: 
  - Scroll progress bar
  - Custom cursor glow effect
  - Parallax effects
  - Section transitions with overlaps
- **Performance Optimized**:
  - Code splitting with manual chunks
  - Lazy loading for images
  - Debounced scroll events
  - React.memo for component optimization
- **Accessibility**:
  - Reduced motion support
  - Touch device detection
  - Keyboard navigation
  - ARIA labels
- **SEO Ready**: Complete meta tags, Open Graph, Twitter cards
- **Responsive**: Mobile-first design with smooth animations
- **Direct Download**: One-click .exe download with proper headers

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/jeme-beseka/King-data_visualizer-landiing.git

# Navigate to project directory
cd King-data_visualizer-landiing

# Install dependencies
npm install
```

## 🛠️ Development

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

## 🏗️ Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The build output will be in the `dist/` directory.

## 🌐 Deployment

### Netlify (Recommended)

1. **Git Integration**:
   - Connect your GitHub repository to Netlify
   - Netlify will automatically build and deploy on push
   - Build settings are configured in `netlify.toml`

2. **Manual Deploy**:
   ```bash
   npm run build
   # Drag and drop the dist/ folder to Netlify
   ```

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Other Platforms

The project can be deployed to any static hosting service:
- Vercel
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

## 📁 Project Structure

```
king-data-visualizer/
├── public/                 # Static assets
│   ├── King_Data_Visualizer-3.3.exe
│   ├── logo.png
│   └── favicon.svg
├── src/
│   ├── assets/            # Images and assets
│   ├── components/        # React components
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Features.jsx
│   │   ├── Footer.jsx
│   │   ├── ScrollProgressBar.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── LoadingScreen.jsx
│   │   └── ...
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── netlify.toml           # Netlify configuration
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies
└── README.md              # This file
```

## 🎨 Technologies Used

- **Frontend Framework**: React 18.3
- **Build Tool**: Vite 8.0
- **Animation**: Framer Motion
- **Routing**: React Scroll
- **Charts**: Recharts
- **Icons**: React Icons
- **Styling**: Tailwind CSS
- **Fonts**: Inter, Orbitron

## ⚙️ Configuration Files

- `netlify.toml` - Netlify build and deployment settings
- `vite.config.js` - Vite build configuration with code splitting
- `.env.example` - Environment variables template

## 🔧 Customization

### Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --gold: #b8860b;
  --gold-light: #ffd700;
  --bg-primary: #0d0d1a;
  /* ... */
}
```

### Download File
Replace the .exe file in `public/` with your version and update the filename in:
- `src/components/Hero.jsx`
- `src/components/DownloadSection.jsx`
- `netlify.toml`

### Social Links
Update social media URLs in `src/components/Footer.jsx`

## 📝 Environment Variables

Copy `.env.example` to `.env` and configure:

```env
VITE_WEB_APP_URL=https://your-web-app.com
VITE_GA_ID=your-google-analytics-id
VITE_API_URL=https://api.your-domain.com
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Jeme Beseka**

- GitHub: [@jeme-beseka](https://github.com/jeme-beseka)
- Email: j.beseka@gmail.com

## 🙏 Acknowledgments

- Built with passion for data visualization
- Inspired by modern landing page designs
- Icons from React Icons
- Fonts from Google Fonts

## 📄 License

MIT License - feel free to use this project for your own landing page.

## 🔗 Links

- [Live Site](https://king-datavisualizer.netlify.app/)
- [King Data Visualizer GitHub](https://github.com/jeme-beseka/Data_Visualization_Desktop)
- [Deployment Guide](DEPLOYMENT.md)

---

Made with ❤️ by Jeme Beseka
