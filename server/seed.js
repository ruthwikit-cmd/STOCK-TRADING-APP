// Seeds the database with an admin user (and optionally a demo user)
// so you don't have to manually flip a role in MongoDB Compass.
//
// Usage:
//   cd server
//   node seed.js
//
// Reads MONGO_URI from your .env file, same as the main server.

require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");
const mongoose = require("mongoose");

const ADMIN = {
  username: "admin",
  email: "admin@tradedeck.com",
  password: "admin1234", // change this after first login if this matters to you
  role: "admin",
  balance: 1000000,
};

const DEMO_USER = {
  username: "demo",
  email: "demo@tradedeck.com",
  password: "demo1234",
  role: "user",
  balance: 100000,
};

const seed = async () => {
  await connectDB();

  for (const data of [ADMIN, DEMO_USER]) {
    const existing = await User.findOne({ email: data.email });
    if (existing) {
      console.log(`Skipped — ${data.email} already exists.`);
      continue;
    }
    const hashed = await bcrypt.hash(data.password, 10);
    await User.create({ ...data, password: hashed });
    console.log(`Created ${data.role} user: ${data.email} / password: ${data.password}`);
  }

  console.log("\nSeeding complete. Log in with:");
  console.log(`  Admin -> email: ${ADMIN.email}  password: ${ADMIN.password}`);
  console.log(`  Demo  -> email: ${DEMO_USER.email}  password: ${DEMO_USER.password}`);

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seeding failed:", err.message);
  process.exit(1);
});
