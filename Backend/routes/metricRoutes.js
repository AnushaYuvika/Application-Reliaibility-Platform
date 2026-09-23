
const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createMetric,
  getMetrics,
  getLatestMetric
} = require("../controllers/metricController");

router.use(protect);

router.post("/", createMetric);

router.get("/", getMetrics);

// IMPORTANT: /latest must come before any /:id route
router.get("/latest", getLatestMetric);

module.exports = router;

