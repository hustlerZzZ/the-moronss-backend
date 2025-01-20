import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";

const app = express();

// allowing cors
app.use(cors());

// Parsing JSON
app.use(express.json());

// Adding logs
app.use(morgan("dev"));

// adding security headers
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// API

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
app.listen(3123, () => {
  console.log("Server is running successfully");
});
