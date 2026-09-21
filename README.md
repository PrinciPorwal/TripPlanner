# ✈️ TripPlanner - Full-Stack Travel Planning & Expense Management

<div align="center">


<p align="center">
  <b>TripPlanner is a web application that allows users to plan trips, organize day-wise itineraries, manage destinations and activities, track expenses and visualize their entire journey through an interactive interface.</b>
  <br />
  Plan itineraries day-by-day, organize activities, track expenses in multiple currencies, visualize spending breakdowns, and keep your adventures seamless.
</p>


</div>

---

## 🌟 Key Features

- **🗺️ Intuitive Trip Dashboard**: View all upcoming, ongoing, and completed trips at a glance with destination tags, date countdowns, traveler counts, and quick budget indicators.
- **📅 Day-by-Day Itinerary Builder**:
  - Automatically calculates trip duration and organizes activities by individual calendar days.
  - Categorize activities by type (*Attraction, Restaurant, Hotel, Transport, Shopping, Other*).
  - Chronological time scheduling, estimated costs, exact locations, and custom travel notes.
- **💰 Smart Expense & Budget Tracker**:
  - Log expenses categorized by *Food, Transport, Accommodation, Activities, Shopping, and Other*.
  - Real-time budget progress bar with warning indicators when approaching or exceeding limits.
  - Interactive spending visualization charts powered by **Recharts** (category distributions and totals).
- **⚡ Resilient & Cold-Start Friendly**:
  - Axios configured with a 60-second timeout to gracefully handle Render free-tier cold starts.
  - Built-in fallback demo data in Zustand store to ensure UI responsiveness at all times.
- **📱 Fully Responsive Design**: Crafted with modern Tailwind CSS, Lucide icons, glassmorphism UI accents, modal sheets, and smooth notifications with `react-hot-toast`.

---

## 🛠️ Tech Stack

### Frontend (`/client`)
- **Core Framework**: React 18 (Vite SPA)
- **Styling**: Tailwind CSS v3, PostCSS, Autoprefixer
- **State Management**: Zustand
- **Routing**: React Router DOM v6 (with client rewrites configured for Vercel)
- **Charts & Visuals**: Recharts
- **Icons & Notifications**: Lucide React, React Hot Toast
- **HTTP Client**: Axios

### Backend (`/server`)
- **Runtime**: Node.js
- **Framework**: Express.js 4
- **Database & ODM**: MongoDB Atlas & Mongoose 8
- **Middleware**: CORS (dynamic origin matching), Dotenv

---








