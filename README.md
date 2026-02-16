# TV Shows Search App

A modern React + TypeScript web application for searching TV shows using the TVMaze public API.

This project demonstrates clean state architecture, separation of server/client state, and production-style React patterns.

🔗 Live Demo: https://tv-series-searcher.vercel.app/
📂 Repository: https://github.com/xLax  

---

## 🚀 Tech Stack

- React 18
- TypeScript
- Redux Toolkit
- TanStack Query (React Query)
- React Router
- TVMaze Public API
- Vite / Webpack
- Deployed on Vercel

## ✨ Features

- Search TV shows by name
- Paginated results
- Server-side caching with TanStack Query
- Loading & error states handling
- Fallback image handling
- Favorites management (Redux)
- URL-synced search state
- Responsive UI

## 🧠 Architecture Overview

### Server State → TanStack Query

All API calls are managed with TanStack Query to provide:

- Automatic caching
- Background refetching
- Optimized network usage
- Built-in loading and error handling

### Client State → Redux Toolkit

Redux Toolkit is used for managing global client-side state that is shared across multiple components.

Currently used for:

- Favorites / Watchlist management
- UI-level shared state
- Persistent state via localStorage

Why Redux instead of Context:

- Better scalability
- Clear state structure (slices)
- DevTools support for debugging
- Cleaner separation of concerns

Redux DevTools is fully supported during development.

## 🛠 Installation

Clone the repository and run the project locally:

```bash
git clone https://github.com/YOUR_GITHUB_URL
cd tv-shows-app
npm install
npm run dev

## 🌐 API

This project uses the free public **TVMaze API**:

https://api.tvmaze.com/search/shows?q=QUERY


Key notes:

- No API key required
- Results are limited by API design (typically up to 10 best matches)
- Server data is handled using **TanStack Query**
- Pagination is managed at the UI level

## 🚀 Live Demo

The application is deployed on **Vercel**:

https://tv-series-searcher.vercel.app/


## 🎯 What This Project Demonstrates

- Clear separation between server and client state
- Proper async data handling with TanStack Query
- Global state management using Redux Toolkit
- URL-driven state synchronization
- Type-safe development with TypeScript
- Scalable and maintainable React architecture
- Performance-conscious API usage


## 🧩 Architecture Highlights

- **Server state** is managed using TanStack Query for caching, background refetching, and loading/error handling.
- **Client state** (favorites and shared UI state) is managed using Redux Toolkit.
- **Search term and page number** are synced with URL query parameters for refresh persistence and shareable links.
- Fallback image handling ensures consistent UI when API data is incomplete.


## 📌 Future Improvements

- Infinite scroll support
- Advanced filtering (genre, rating, status)
- Unit & integration testing
- Backend proxy layer
- Improved UI polish and animations


## 👤 Author

Liron Levi

