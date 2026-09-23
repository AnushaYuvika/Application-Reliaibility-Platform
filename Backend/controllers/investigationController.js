// const Investigation = require("../models/Investigation");
// const Incident = require("../models/Incident");

// const createInvestigation = async (req, res) => {
//   try {
//     const {
//       incident,
//       evidence,
//       rootCause,
//       impact,
//       confidence,
//       status
//     } = req.body;

//     if (!incident || !evidence || !rootCause || !impact) {
//       return res.status(400).json({
//         message: "Incident, evidence, root cause and impact are required"
//       });
//     }

//     const existingIncident = await Incident.findById(incident);

//     if (!existingIncident) {
//       return res.status(404).json({
//         message: "Incident not found"
//       });
//     }

//     const existingInvestigation = await Investigation.findOne({
//       incident
//     });

//     if (existingInvestigation) {
//       return res.status(409).json({
//         message: "Investigation already exists for this incident"
//       });
//     }

//     const investigation = await Investigation.create({
//       incident,
//       evidence: evidence.trim(),
//       rootCause: rootCause.trim(),
//       impact: impact.trim(),
//       confidence,
//       status
//     });

//     res.status(201).json({
//       message: "Investigation created successfully",
//       investigation
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to create investigation",
//       error: error.message
//     });
//   }
// };

// const getInvestigations = async (req, res) => {
//   try {
//     const investigations = await Investigation.find()
//       .populate(
//         "incident",
//         "title severity status source"
//       )
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       investigations
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to fetch investigations",
//       error: error.message
//     });
//   }
// };

// const getInvestigationById = async (req, res) => {
//   try {
//     const investigation = await Investigation.findById(
//       req.params.id
//     ).populate(
//       "incident",
//       "title description severity status source startedAt resolvedAt"
//     );

//     if (!investigation) {
//       return res.status(404).json({
//         message: "Investigation not found"
//       });
//     }

//     res.status(200).json({
//       investigation
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to fetch investigation",
//       error: error.message
//     });
//   }
// };


// const updateInvestigation = async (req, res) => {
//   try {
//     const {
//       evidence,
//       rootCause,
//       impact,
//       confidence,
//       status
//     } = req.body;

//     const investigation = await Investigation.findById(
//       req.params.id
//     );

//     if (!investigation) {
//       return res.status(404).json({
//         message: "Investigation not found"
//       });
//     }

//     if (evidence !== undefined) {
//       investigation.evidence = evidence.trim();
//     }

//     if (rootCause !== undefined) {
//       investigation.rootCause = rootCause.trim();
//     }

//     if (impact !== undefined) {
//       investigation.impact = impact.trim();
//     }

//     if (confidence !== undefined) {
//       investigation.confidence = confidence;
//     }

//     if (status !== undefined) {
//       investigation.status = status;
//     }

//     await investigation.save();

//     res.status(200).json({
//       message: "Investigation updated successfully",
//       investigation
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to update investigation",
//       error: error.message
//     });
//   }
// };


// const deleteInvestigation = async (req, res) => {
//   try {
//     const investigation = await Investigation.findById(req.params.id);

//     if (!investigation) {
//       return res.status(404).json({
//         message: "Investigation not found"
//       });
//     }

//     await investigation.deleteOne();

//     res.status(200).json({
//       message: "Investigation deleted successfully"
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to delete investigation",
//       error: error.message
//     });
//   }
// };

// module.exports = {
//   createInvestigation,
//   getInvestigations,
//   getInvestigationById,
//   updateInvestigation,
//   deleteInvestigation
// };



const Investigation = require("../models/Investigation");
const Incident = require("../models/Incident");
const Log = require("../models/Log");

// Create investigation manually
const createInvestigation = async (req, res) => {
try {
const {
incident,
evidence,
rootCause,
impact,
confidence,
status
} = req.body;


if (!incident || !evidence || !rootCause || !impact) {
  return res.status(400).json({
    message:
      "Incident, evidence, root cause and impact are required"
  });
}

const existingIncident =
  await Incident.findById(incident);

if (!existingIncident) {
  return res.status(404).json({
    message: "Incident not found"
  });
}

const existingInvestigation =
  await Investigation.findOne({ incident });

if (existingInvestigation) {
  return res.status(409).json({
    message:
      "Investigation already exists for this incident"
  });
}

const investigation =
  await Investigation.create({
    incident,
    evidence: evidence.trim(),
    rootCause: rootCause.trim(),
    impact: impact.trim(),
    confidence,
    status: status || "completed"
  });

res.status(201).json({
  message: "Investigation created successfully",
  investigation
});


} catch (error) {
  res.status(500).json({
    message: "Failed to create investigation",
      error: error.message
    });
  }
};

// Autonomous incident analysis
const analyzeIncident = async (req, res) => {
try {
const { incidentId } = req.body;


if (!incidentId) {
  return res.status(400).json({
    message: "Incident ID is required"
  });
}

const incident =
  await Incident.findById(incidentId);

if (!incident) {
  return res.status(404).json({
    message: "Incident not found"
  });
}

const existingInvestigation =
  await Investigation.findOne({
    incident: incidentId
  });

if (existingInvestigation) {
  return res.status(409).json({
    message:
      "Investigation already exists for this incident",
    investigation: existingInvestigation
  });
}

// Fetch logs belonging to the incident's project
const logs = await Log.find({
  project: incident.project
})
  .sort({ timestamp: -1 })
  .limit(20);

  let evidence = "";
  let rootCause = "";
  let impact = "";
  let confidence = 60;

if (logs.length === 0) {
  evidence =
    `Incident "${incident.title}" was detected, but no recent application logs were available for analysis.`;

  rootCause =
    "The probable cause could not be confirmed because supporting application logs are unavailable.";

  impact =
    "The application may experience service disruption related to the reported incident.";

  confidence = 40;
} else {
  const errorLogs = logs.filter(
    (log) =>
      log.level === "error" ||
      log.level === "critical"
  );

  const databaseLogs = logs.filter((log) =>
    `${log.message} ${log.service}`
      .toLowerCase()
      .includes("database")
  );

  const connectionLogs = logs.filter((log) =>
    `${log.message} ${log.service}`
      .toLowerCase()
      .includes("connection")
  );

  const relevantLogs =
    errorLogs.length > 0
      ? errorLogs
      : logs;

  evidence =
    `Analysis reviewed ${logs.length} recent logs for the ${incident.title} incident. ` +
    `${errorLogs.length} error/critical logs were detected. ` +
    `${databaseLogs.length} logs were related to database activity and ` +
    `${connectionLogs.length} logs were related to connection activity.`;

  if (
    databaseLogs.length > 0 ||
    connectionLogs.length > 0 ||
    incident.title
      .toLowerCase()
      .includes("database")
  ) {
    rootCause =
      "The most probable root cause is database connection instability or insufficient connection pool capacity, based on the incident context and recent database/connection errors.";

    impact =
      "The application may fail to establish database connections, causing affected requests or services to become unavailable.";

    confidence = 88;
  } else if (errorLogs.length > 0) {
    const latestError =
      relevantLogs[0]?.message ||
      "Application error detected.";

    rootCause =
      `The incident is most likely related to an application error detected in recent logs: "${latestError}"`;

    impact =
      "Affected application requests may fail until the underlying error condition is resolved.";

    confidence = 78;
  } else {
    rootCause =
      "The incident appears to be related to an application or infrastructure condition, but the available logs do not provide enough evidence to confirm the exact cause.";

    impact =
      "The affected service may experience degraded availability or request failures.";

    confidence = 55;
  }
}

const investigation =
  await Investigation.create({
    incident: incidentId,
    evidence,
    rootCause,
    impact,
    confidence,
    status: "completed"
  });

res.status(201).json({
  message:
    "Incident analyzed successfully",
  investigation
});


} catch (error) {
res.status(500).json({
message:
"Failed to analyze incident",
error: error.message
});
}
};

// Get all investigations
const getInvestigations = async (req, res) => {
try {
const investigations =
await Investigation.find()
.populate(
"incident",
"title severity status source"
)
.sort({ createdAt: -1 });


res.status(200).json({
  investigations
});


} catch (error) {
res.status(500).json({
message:
"Failed to fetch investigations",
error: error.message
});
}
};

// Get investigation by ID
const getInvestigationById = async (req, res) => {
try {
const investigation =
await Investigation.findById(
req.params.id
).populate(
"incident",
"title description severity status source startedAt resolvedAt"
);


if (!investigation) {
  return res.status(404).json({
    message: "Investigation not found"
  });
}

res.status(200).json({
  investigation
});


} catch (error) {
res.status(500).json({
message:
"Failed to fetch investigation",
error: error.message
});
}
};

// Update investigation
const updateInvestigation = async (req, res) => {
try {
const {
evidence,
rootCause,
impact,
confidence,
status
} = req.body;


const investigation =
  await Investigation.findById(
    req.params.id
  );

if (!investigation) {
  return res.status(404).json({
    message: "Investigation not found"
  });
}

if (evidence !== undefined) {
  investigation.evidence =
    evidence.trim();
}

if (rootCause !== undefined) {
  investigation.rootCause =
    rootCause.trim();
}

if (impact !== undefined) {
  investigation.impact =
    impact.trim();
}

if (confidence !== undefined) {
  investigation.confidence =
    confidence;
}

if (status !== undefined) {
  investigation.status = status;
}

await investigation.save();

res.status(200).json({
  message:
    "Investigation updated successfully",
  investigation
});


} catch (error) {
res.status(500).json({
message:
"Failed to update investigation",
error: error.message
});
}
};

// Delete investigation
const deleteInvestigation = async (req, res) => {
try {
const investigation =
await Investigation.findById(
req.params.id
);


if (!investigation) {
  return res.status(404).json({
    message: "Investigation not found"
  });
}

await investigation.deleteOne();

res.status(200).json({
  message:
    "Investigation deleted successfully"
});


} catch (error) {
res.status(500).json({
message:
"Failed to delete investigation",
error: error.message
});
}
};

module.exports = {
createInvestigation,
analyzeIncident,
getInvestigations,
getInvestigationById,
updateInvestigation,
deleteInvestigation
};
