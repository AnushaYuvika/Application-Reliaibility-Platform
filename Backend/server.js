const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");

const projectRoutes = require("./routes/projectRoutes");
const incidentRoutes = require("./routes/incidentRoutes");
const investigationRoutes = require("./routes/investigationRoutes");
const responseRoutes = require("./routes/responseRoutes");
const verificationRoutes = require("./routes/verificationRoutes");
const authRoutes = require("./routes/authRoutes");
const logRoutes = require("./routes/logRoutes");
const metricRoutes = require("./routes/metricRoutes");
const deploymentRoutes = require("./routes/deploymentRoutes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://application-reliaibility-platform.vercel.app"
    ]
  })
);

connectDB();
console.log("MongoDB URI exists:", !!process.env.MONGO_URI);

app.use(express.json());

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/investigations", investigationRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/verifications", verificationRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/metrics", metricRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/deployments", deploymentRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Autonomous Software Reliability Platform API is running"
  });
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});