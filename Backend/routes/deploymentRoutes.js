const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createDeployment,
  getDeployments,
  getLatestDeployment
} = require("../controllers/deploymentController");

router.use(protect);

router.post("/", createDeployment);

router.get("/", getDeployments);

router.get("/latest", getLatestDeployment);

module.exports = router;