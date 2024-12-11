const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
// Load environment variables
require("dotenv").config();

// Connect to database
const db = require("./db/mongoose");

// Create express app and add middlewares
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT || "http://localhost:5173", // Allow the frontend origin
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(session({
  secret: process.env.SESSION_SECRET, // Replace with a secure key or an environment variable
  resave: false, // Don't save session if unmodified
  saveUninitialized: true, // Doesn't save empty sessions
  cookie: { secure: process.env.NODE_ENV === 'production' } // Set to true if using HTTPS in production
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cookieParser());

// Middleware for error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server error");
});

// Static files
app.use(express.static(path.join(__dirname, 'static')));

// Set up routes
const domainRoutes = require("./routes/domain.routes");
app.use("/", domainRoutes);

const routes = require("./routes");
app.use("/api", routes);

// Test routes
app.use("/api/test/", require("./test/loginTest"));
app.use("/api/test/mail", require("./test/mailTest"));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
