# Falah-e-Thar Foundation Website

A modern, responsive website for Falah-e-Thar Foundation built with HTML, CSS, and JavaScript.

## Project Structure

```
ftf.com/
├── frontend/          # All frontend files
│   ├── index.html     # Homepage
│   ├── about.html     # About Us page
│   ├── projects.html  # Programs & Projects page
│   ├── media.html     # Media & Updates page
│   ├── get-involved.html # Get Involved page
│   ├── contact.html   # Contact page
│   ├── css/
│   │   └── style.css  # Main stylesheet
│   └── js/
│       └── main.js    # Main JavaScript file
├── backend/           # Backend server files
│   ├── package.json   # Node.js dependencies
│   └── server.js      # Express server
├── forntend/          # Media assets (logo)
│   └── media/
│       └── Falah-e-Thar-Foundation-log.png
└── server.json        # Server configuration
```

## Running with VS Code Live Server

1. **Install Live Server Extension** (if not already installed):
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Live Server" by Ritwick Dey
   - Click Install

2. **Open the project**:
   - Open the `frontend` folder in VS Code
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - The site will open in your browser at `http://127.0.0.1:5500/frontend/index.html`

## Running with Node.js Backend (Alternative)

1. **Install dependencies**:
   ```powershell
   cd backend
   npm install
   ```

2. **Create `.env` file** in project root:
   ```
   PORT=5000
   NODE_ENV=development
   ```

3. **Start the server**:
   ```powershell
   cd backend
   npm start
   ```

4. **Open browser**: `http://localhost:5000`

## Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Navigation menu with dropdowns and arrows
- ✅ Hero slider with auto-rotation
- ✅ Donation wizard (3-step process)
- ✅ Volunteer registration form
- ✅ Contact form
- ✅ Newsletter subscription
- ✅ Impact counters animation
- ✅ All pages with consistent header/footer

## Customization

- **Logo**: Update path in HTML files if logo location changes
- **Colors**: Edit CSS variables in `frontend/css/style.css`
- **Content**: Replace placeholder text in HTML files
- **Images**: Replace placeholder URLs with real images

## Deployment to Hostinger

1. Upload all `frontend/` files to your hosting `public_html` or `www` folder
2. Ensure `backend/` files are uploaded if using Node.js backend
3. Configure server settings as per Hostinger documentation

---

Created with ❤️ for Falah-e-Thar Foundation

