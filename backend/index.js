const express = require("express");
const cors = require("cors");
const multer = require("multer");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

// Small helper to await a delay
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// --- Security & middleware ---

// Security headers
app.use(helmet());

// CORS: only allow your frontend + local dev
app.use(
  cors({
    origin: ["https://automation-bible.com", "http://localhost:3000", "https://automation-bible.vercel.app","https://automation-practice-tvfj.onrender.com"],
    methods: ["GET", "POST"],
  })
);

// JSON body parsing
app.use(express.json());

// Basic rate limiting for all /api routes
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 100, // 100 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", apiLimiter);

// Multer config for file uploads: IN-MEMORY, not saved to disk
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
    files: 10,
  },
});

// --- Basic health routes ---
app.get("/api/ping", (req, res) => {
  res.json({ message: "Backend is running 🚀", time: new Date().toISOString() });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "automation-bible-backend" });
});

// --- Simple auth simulation ---
const VALID_EMAIL = "test@automation.com";
const VALID_PASSWORD = "password123";

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body || {};

  // basic validation to avoid weird payloads
  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ message: "Invalid payload" });
  }
  if (email.length > 200 || password.length > 100) {
    return res.status(400).json({ message: "Payload too long" });
  }

  console.log("Login attempt:", email);

  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    return res.json({
      status: "success",
      message: "Login successful",
      token: "fake-jwt-token-123",
      user: {
        email,
        name: "Automation Tester",
      },
    });
  }

  return res.status(401).json({
    status: "failure",
    message: "Invalid credentials",
  });
});

app.get("/api/auth/profile", (req, res) => {
  const authHeader = req.header("Authorization") || "";
  if (authHeader === "Bearer fake-jwt-token-123") {
    return res.json({
      email: VALID_EMAIL,
      name: "Automation Tester",
      role: "admin",
      labsCompleted: 3,
    });
  }

  return res.status(401).json({ message: "Unauthorized" });
});

// --- Form submission endpoint ---
app.post("/api/forms/submit", (req, res) => {
  const payload = req.body || {};
  console.log("Form submission payload:", payload);

  res.json({
    status: "received",
    receivedAt: new Date().toISOString(),
    fields: payload,
  });
});

// --- Challenge: delayed response endpoint ---
app.get("/api/challenges/delayed-message", async (req, res) => {
  const delayMs = Number(req.query.delayMs || 3000); // configurable delay
  console.log(`Delayed endpoint hit, delaying for ${delayMs}ms`);

  await wait(delayMs);

  res.json({
    status: "success",
    delayMs,
    message: "This response was delayed on purpose.",
  });
});

// --- Challenge: random flaky endpoint ---
app.get("/api/challenges/flaky", (req, res) => {
  const random = Math.random();
  const threshold = 0.5; // 50% failure

  if (random < threshold) {
    console.log("Flaky endpoint: returning FAILURE");
    return res.status(500).json({
      status: "error",
      message: "Random failure occurred. Please retry.",
    });
  }

  console.log("Flaky endpoint: returning SUCCESS");
  return res.json({
    status: "success",
    message: "Flaky endpoint succeeded this time.",
  });
});

// --- Challenge: auth-protected form submission ---
app.post("/api/forms/protected-submit", (req, res) => {
  const authHeader = req.header("Authorization") || "";
  if (authHeader !== "Bearer fake-jwt-token-123") {
    console.log("Protected form: unauthorized");
    return res.status(401).json({
      status: "unauthorized",
      message: "Valid token required. Use /api/auth/login to get one.",
    });
  }

  const payload = req.body || {};
  console.log("Protected form payload:", payload);

  return res.json({
    status: "success",
    receivedAt: new Date().toISOString(),
    fields: payload,
  });
});

// --- File upload endpoint (IN MEMORY, NOT STORED) ---
const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];

app.post("/api/files/upload", upload.array("files", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const invalid = req.files.filter(
    (f) => !allowedTypes.includes(f.mimetype)
  );

  if (invalid.length > 0) {
    return res.status(400).json({
      status: "error",
      message: "Some file types are not allowed for this demo",
    });
  }

  const files = req.files.map((f) => ({
    originalName: f.originalname,
    size: f.size,
    mimeType: f.mimetype,
  }));

  console.log("Files uploaded (NOT stored):", files);

  res.json({
    status: "success",
    count: files.length,
    files,
  });
});

// --- Start server ---
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Automation Bible backend running on port ${PORT}`);
});