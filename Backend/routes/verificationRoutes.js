const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createVerification,
  getVerifications,
  getVerificationById,
  updateVerification,
  deleteVerification
} = require("../controllers/verificationController");

router.use(protect);

router.post("/", createVerification);
router.get("/", getVerifications);
router.get("/:id", getVerificationById);
router.put("/:id", updateVerification);
router.delete("/:id", deleteVerification);

module.exports = router;