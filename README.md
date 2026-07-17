# TradeDeck —  Stock Trading App

A full-stack simulated stock trading app (MERN)
## Project Structure

```
project/
├── client/     React (Vite) frontend
└── server/     Express + MongoDB backend
```

## 1. Backend Setup (Express + MongoDB)

```
cd server
npm install
```

Create a `.env` file in `server/` (copy `.env.example`):

```
MONGO_URI=mongodb://localhost:27017/stocktrading
JWT_SECRET=change_this_to_a_long_random_secret
PORT=8000
```

Start the backend (requires nodemon — installed as a dev dependency):

```
npm run dev
```

This runs `nodemon index.js`, which loads `server.js`. The API starts at:
`http://localhost:8000`

Make sure MongoDB is running locally (or point `MONGO_URI` at an Atlas cluster)
before starting the server — the app connects to the database before it starts
listening for requests.

## 2. Frontend Setup (React + Vite)

Open a second terminal:

```
cd client
npm install
npm run dev
```

The app runs at: `http://localhost:5173`

Optionally create a `client/.env` (copy `.env.example`) if your API isn't on
`http://localhost:8000/api`:

```
VITE_API_URL=http://localhost:8000/api
```

## 2b. (Optional) Seed an admin user

Instead of manually editing MongoDB to create an admin, run the seed script
once your `.env` is set up:

```
cd server
node seed.js
```

This creates two accounts (skipping any that already exist):

- **Admin** — `admin@tradedeck.com` / `admin1234`
- **Demo user** — `demo@tradedeck.com` / `demo1234`

Log in with the admin account to see the Admin dashboard immediately.

## 3. Using the App

1. Register a new account at `/register` (starts with a $100,000 simulated balance).
2. Browse the market board on the Home page, buy/sell shares.
3. Check holdings and P&L on Portfolio.
4. Review all past orders and transactions on History.
5. To access the Admin dashboard, manually set a user's `role` field to
   `"admin"` in MongoDB (e.g. via `mongosh` or MongoDB Compass), then log
   back in.

## Data Models

- **User** — username, email, password (hashed), balance, role
- **Stock** — per-user holdings: stock name/symbol/exchange, price, quantity, average price
- **Order** — buy/sell order records: stock, quantity, price, total, order type
- **Transaction** — ledger of all balance-affecting events tied to orders

## Tech Stack

- Frontend: React 18, React Router, Axios, Recharts, Vite
- Backend: Express, Mongoose, JWT auth (bcrypt password hashing)
- Styling: Custom skeuomorphic CSS design system (no UI framework)
