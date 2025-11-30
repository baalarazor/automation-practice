const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// Small helper to await a delay
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// --- Middleware ---
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});
const upload = multer({ storage });

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

  console.log("Login attempt:", email, password);

  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    return res.json({
      status: "success",
      message: "Login successful",
      token: "fake-jwt-token-123",
      user: {
        email,
        name: "Automation Tester"
      }
    });
  }

  return res.status(401).json({
    status: "failure",
    message: "Invalid credentials"
  });
});

app.get("/api/auth/profile", (req, res) => {
  const authHeader = req.header("Authorization") || "";
  if (authHeader === "Bearer fake-jwt-token-123") {
    return res.json({
      email: VALID_EMAIL,
      name: "Automation Tester",
      role: "admin",
      labsCompleted: 3
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
    fields: payload
  });
});

// --- Challenge: delayed response endpoint ---
// For practicing explicit/implicit waits in automation.
app.get("/api/challenges/delayed-message", async (req, res) => {
  const delayMs = Number(req.query.delayMs || 3000); // configurable delay
  console.log(`Delayed endpoint hit, delaying for ${delayMs}ms`);

  await wait(delayMs);

  res.json({
    status: "success",
    delayMs,
    message: "This response was delayed on purpose."
  });
});

// --- Challenge: random flaky endpoint ---
// Sometimes returns 200, sometimes 500. Great for retry logic.
app.get("/api/challenges/flaky", (req, res) => {
  const random = Math.random();
  const threshold = 0.5; // 50% failure

  if (random < threshold) {
    console.log("Flaky endpoint: returning FAILURE");
    return res.status(500).json({
      status: "error",
      message: "Random failure occurred. Please retry."
    });
  }

  console.log("Flaky endpoint: returning SUCCESS");
  return res.json({
    status: "success",
    message: "Flaky endpoint succeeded this time."
  });
});

// --- Challenge: auth-protected form submission ---
// Requires Authorization: Bearer fake-jwt-token-123
app.post("/api/forms/protected-submit", (req, res) => {
  const authHeader = req.header("Authorization") || "";
  if (authHeader !== "Bearer fake-jwt-token-123") {
    console.log("Protected form: unauthorized");
    return res.status(401).json({
      status: "unauthorized",
      message: "Valid token required. Use /api/auth/login to get one."
    });
  }

  const payload = req.body || {};
  console.log("Protected form payload:", payload);

  return res.json({
    status: "success",
    receivedAt: new Date().toISOString(),
    fields: payload
  });
});


// --- File upload endpoints ---
app.post(
  "/api/files/upload",
  upload.array("files", 10),
  (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const files = req.files.map((f) => ({
      originalName: f.originalname,
      storedName: f.filename,
      size: f.size,
      mimeType: f.mimetype
    }));

    console.log("Files uploaded:", files);

    res.json({
      status: "success",
      count: files.length,
      files
    });
  }
);

app.use("/uploads", express.static(uploadsDir));

// --- Start server ---
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Automation Bible backend running on port ${PORT}`);
});
