const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createResponse,
  getResponses,
  getResponseById,
  updateResponse,
  deleteResponse
} = require("../controllers/responseController");

router.use(protect);

router.post("/", createResponse);
router.get("/", getResponses);
router.get("/:id", getResponseById);
router.put("/:id", updateResponse);
router.delete("/:id", deleteResponse);

module.exports = router;