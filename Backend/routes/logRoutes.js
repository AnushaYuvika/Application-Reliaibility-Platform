const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createLog,
  getLogs,
  getLogById,
  deleteLog
} = require("../controllers/logController");

router.use(protect);

router.post("/", createLog);

router.get("/", getLogs);

router.get("/:id", getLogById);

router.delete("/:id", deleteLog);

module.exports = router;