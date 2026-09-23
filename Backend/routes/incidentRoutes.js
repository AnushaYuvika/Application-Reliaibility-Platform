const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createIncident,
  getIncidents,
  getIncidentById,
  updateIncident,
  deleteIncident
} = require("../controllers/incidentController");

router.use(protect);

router.post("/", createIncident);
router.get("/", getIncidents);
router.get("/:id", getIncidentById);
router.put("/:id", updateIncident);
router.delete("/:id", deleteIncident);

module.exports = router;