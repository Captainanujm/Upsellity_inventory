# Inventory Management System

A modern, full-stack inventory management system built for e-commerce merchants. This application provides real-time inventory tracking, analytics, and stock management capabilities.

## 🚀 Features

### Core Features
- **Product Management (CRUD)** - Create, read, update, delete products
- **Dashboard Analytics** - Real-time inventory metrics and charts
- **Search, Filter & Sort** - Find products quickly with multiple options

### Bonus Features
- **Stock History Log** - Track all stock changes with timestamps
- **Interactive Charts** - Visual inventory breakdown using Chart.js
- **Dark/Light Theme** - Toggle between themes with persistence
- **Collapsible Sidebar** - Expandable navigation with smooth animations

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite 7, Tailwind CSS 4 |
| Backend | Node.js, Express 5 |
| Charts | Chart.js, react-chartjs-2 |
| Routing | React Router |
| HTTP | Axios |

## 📁 Project Structure

```
inventory-system/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/     # StatCard, Chart, Alerts
│   │   │   ├── layout/        # Layout, Sidebar, Header
│   │   │   └── products/      # Table, Modals, Filters
│   │   ├── context/           # Theme context
│   │   ├── pages/             # Dashboard, Products, StockHistory
│   │   ├── services/          # API client
│   │   └── utils/             # Formatters
│   └── package.json
│
├── server/                    # Node.js backend
│   ├── controllers/           # Request handlers
│   ├── data/                  # In-memory data store
│   ├── routes/                # API routes
│   └── server.js              # Entry point
│
├── README.md
└── DOCUMENTATION.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd inventory-system
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
```
→ Server runs on http://localhost:5000

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```
→ App runs on http://localhost:5173

### Production Build
```bash
cd client
npm run build
```

## 📖 Usage Guide

### Dashboard
- View total products, inventory value, low stock, out of stock counts
- Interactive bar chart showing stock distribution
- Low stock alerts table with warning icons

### Products Page
- **Search** - Type to filter by name or SKU
- **Filter** - Select status (All, In Stock, Low Stock, Out of Stock)
- **Sort** - Order by name, price, or stock quantity
- **Add Product** - Click button to open modal form
- **Edit** - Click Edit button on any row
- **Delete** - Click Delete button (confirmation required)

### Stock History
- View complete log of stock changes
- See previous stock, new stock, and change amount
- Timestamps for all changes

### Theme Toggle
- Click sun/moon icon in header to switch themes
- Preference saved to localStorage

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | List all products (with search/filter/sort) |
| GET | /api/products/:id | Get single product |
| POST | /api/products | Create product |
| PUT | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |
| GET | /api/analytics | Dashboard statistics |
| GET | /api/stock-history | Stock change log |

## 🎨 UI Features

- **Color-coded Status Badges:**
  - 🟢 Green = In Stock (above threshold)
  - 🟡 Yellow = Low Stock (at or below threshold)
  - 🔴 Red = Out of Stock (0 quantity)

- **Dark/Light Theme** with smooth transitions
- **Responsive Design** for different screen sizes
- **Collapsible Sidebar** for more content space

## 📝 Sample Data

The app includes 8 sample products for testing:
- Laptop, iPhone 14, Monitor 27"
- Wireless Mouse, Keyboard, Headphones
- USB-C Cable, Webcam HD

## 🚀 Deployment

### Backend
Deploy to: Render, Railway, Heroku, or any Node.js host

### Frontend  
Deploy to: Vercel, Netlify, or Cloudflare Pages

**Live Demo:** [Add your deployment URL here]

## 📄 License

MIT License

---

Built with ❤️ for e-commerce merchants
