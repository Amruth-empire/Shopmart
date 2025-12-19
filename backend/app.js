require("dotenv").config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");
const cors = require("cors");

// DB connection
require("./config/mongoose-connection");

// ✅ CORS configuration (Vercel + Local)
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://shopmart-bag.vercel.app" // Vercel frontend
        : [
            "http://localhost:8080",
            "http://localhost:8081",
            "http://localhost:8082",
          ],
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies & sessions
app.use(cookieParser());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

app.use(flash());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.set("view engine", "ejs");

// Routes
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const routes = require("./routes");

// ✅ Health check route (IMPORTANT for Render wake-up)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.use("/", routes);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
