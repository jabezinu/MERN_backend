const fs = require('fs');
const path = require('path');

// Create favicon directory if it doesn't exist
const faviconDir = path.join(__dirname, 'images', 'favicon');
if (!fs.existsSync(faviconDir)) {
  fs.mkdirSync(faviconDir, { recursive: true });
}

// Create SVG favicon with initials JS
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3498db;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2980b9;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="12" fill="url(#grad)"/>
  <text x="32" y="42" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle">JS</text>
</svg>`;

// Write SVG to file
fs.writeFileSync(path.join(faviconDir, 'favicon.svg'), svgContent);

console.log('Favicon created successfully!');
console.log('SVG favicon saved to: ' + path.join(faviconDir, 'favicon.svg'));

// Instructions for adding to HTML
console.log('\nAdd these lines to your HTML <head> section:');
console.log(`
<link rel="icon" type="image/svg+xml" href="images/favicon/favicon.svg">
<link rel="apple-touch-icon" href="images/favicon/favicon.svg">
<link rel="manifest" href="images/favicon/site.webmanifest">
`);

// Create a simple web manifest file
const webManifest = {
  name: "Jabez Shiferaw | Full Stack Developer",
  short_name: "Jabez Shiferaw",
  icons: [
    {
      src: "favicon.svg",
      sizes: "64x64",
      type: "image/svg+xml"
    }
  ],
  theme_color: "#3498db",
  background_color: "#ffffff",
  display: "standalone"
};

fs.writeFileSync(
  path.join(faviconDir, 'site.webmanifest'),
  JSON.stringify(webManifest, null, 2)
);

console.log('Web manifest created at: ' + path.join(faviconDir, 'site.webmanifest'));
