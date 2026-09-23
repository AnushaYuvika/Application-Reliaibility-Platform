// const express = require("express");

// const router = express.Router();

// const protect = require("../middleware/authMiddleware");

// const {
//   createInvestigation,
//   getInvestigations,
//   getInvestigationById,
//   updateInvestigation,
//   deleteInvestigation
// } = require("../controllers/investigationController");

// router.use(protect);

// router.post("/", createInvestigation);
// router.get("/", getInvestigations);
// router.get("/:id", getInvestigationById);
// router.put("/:id", updateInvestigation);
// router.delete("/:id", deleteInvestigation);

// module.exports = router;



const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
createInvestigation,
analyzeIncident,
getInvestigations,
getInvestigationById,
updateInvestigation,
deleteInvestigation
} = require("../controllers/investigationController");

router.use(protect);

router.post("/", createInvestigation);

// Autonomous incident analysis
router.post("/analyze", analyzeIncident);

router.get("/", getInvestigations);

router.get("/:id", getInvestigationById);

router.put("/:id", updateInvestigation);

router.delete("/:id", deleteInvestigation);

module.exports = router;
