import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

// allowing cors
const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Parsing JSON
app.use(express.json());

// Passport Middleware
app.use(passport.initialize());

// Cookie Parser
app.use(cookieParser());

// Adding logs
app.use(morgan("dev"));

// adding security headers
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// API
app.use("/api/v1/user", userRoutes);

// Serving images
app.use("/uploads", express.static("uploads"));

// Global Catch Handler
app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    msg: "route not defined yet!",
  });
});

// listen
app.listen(PORT, () => {
  console.log("Server is running successfully");
});
