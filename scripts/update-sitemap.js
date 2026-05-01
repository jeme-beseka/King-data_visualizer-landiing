import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

// Read the sitemap file
let sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

// Replace all <lastmod> dates with today's date
sitemapContent = sitemapContent.replace(/<lastmod>[\d-]+<\/lastmod>/g, `<lastmod>${today}</lastmod>`);

// Write the updated content back to the file
fs.writeFileSync(sitemapPath, sitemapContent, 'utf-8');

console.log(`✅ Sitemap updated with lastmod date: ${today}`);
