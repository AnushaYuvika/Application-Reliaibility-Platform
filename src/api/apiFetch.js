import API_BASE_URL from './api';

const isDemoId = (id) => String(id || '').startsWith('demo-');

const reply = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const minutesAgo = (m) => new Date(Date.now() - m * 60000).toISOString();

const storeKey = (pid) => `demoStore:${pid}`;
const flagKey = (pid) => `demoFlag:${pid}`;

export const clearDemoData = (pid) => {
  sessionStorage.removeItem(storeKey(pid));
  sessionStorage.removeItem(flagKey(pid));
};

const brief = (i) => ({
  _id: i._id,
  title: i.title,
  severity: i.severity,
  status: i.status,
  source: i.source,
});

// ---------- Demo data ----------
const buildStore = (pid, name) => {
  const id = (label) => `demo-${label}-${pid}`;
  const project = { _id: pid, name, environment: 'production' };

  const activeIncident = {
    _id: id('incident-active'),
    project,
    title: 'Database connection pool exhausted',
    description: 'Requests are timing out while waiting for database connections.',
    severity: 'critical',
    status: 'active',
    source: 'demo',
    startedAt: minutesAgo(35),
    createdAt: minutesAgo(35),
    resolvedAt: null,
  };

  const resolvedIncident = {
    _id: id('incident-resolved'),
    project,
    title: 'High API latency after deployment',
    description: 'Response time increased after the latest release.',
    severity: 'high',
    status: 'resolved',
    source: 'demo',
    startedAt: minutesAgo(60 * 26),
    createdAt: minutesAgo(60 * 26),
    resolvedAt: minutesAgo(60 * 24),
  };

  const investigation = {
    _id: id('investigation-resolved'),
    incident: brief(resolvedIncident),
    evidence:
      'Analysis reviewed 8 recent logs for the High API latency incident. 3 error/warning logs were detected, mostly slow queries after release v2.4.1.',
    rootCause:
      'A new query introduced in release v2.4.1 was missing an index, which slowed down API responses under load.',
    impact:
      'API responses were slower than normal and some requests timed out during peak traffic.',
    confidence: 88,
    status: 'completed',
    createdAt: minutesAgo(60 * 25),
  };

  const response = {
    _id: id('response-resolved'),
    incident: brief(resolvedIncident),
    investigation: investigation._id,
    recommendation:
      'Address the identified root cause: add the missing database index and redeploy.',
    recommendationReason:
      'The recommendation was generated from the investigation findings. Evidence: slow queries after v2.4.1. Impact: slower API responses.',
    remediation: [
      'Add the missing index to the affected collection.',
      'Redeploy the service and clear the query cache.',
      'Monitor response time for 30 minutes to confirm recovery.',
    ].join('\n'),
    approvalStatus: 'approved',
    approvedBy: 'Developer',
    approvedAt: minutesAgo(60 * 24 + 20),
    status: 'completed',
    createdAt: minutesAgo(60 * 24 + 30),
  };

  const verification = {
    _id: id('verification-resolved'),
    incident: brief(resolvedIncident),
    response: response._id,
    testName: 'Remediation Validation',
    testDescription:
      'Validate that the proposed remediation resolves the incident condition.',
    result: 'passed',
    output:
      'Remediation validation completed successfully. Average response time returned to normal.',
    verifiedBy: 'Developer',
    verifiedAt: minutesAgo(60 * 24),
    status: 'completed',
    createdAt: minutesAgo(60 * 24),
  };

  const log = (n, level, message, service, mins) => ({
    _id: id(`log-${n}`),
    project,
    level,
    message,
    service,
    timestamp: minutesAgo(mins),
  });

  return {
    logs: [
      log(1, 'critical', 'Database connection pool exhausted (50/50 in use)', 'database', 3),
      log(2, 'error', 'Timeout while acquiring database connection', 'api', 5),
      log(3, 'error', 'Request failed: connection refused by database', 'api', 8),
      log(4, 'warning', 'Connection queue length above threshold', 'database', 12),
      log(5, 'warning', 'Response time above 500 ms for /orders', 'api', 18),
      log(6, 'info', 'Health check passed for worker service', 'worker', 22),
      log(7, 'info', 'Deployment v2.4.2 completed', 'deploy', 40),
      log(8, 'info', 'Scheduled backup completed', 'database', 90),
    ],
    metric: {
      _id: id('metric'),
      project,
      cpuUsage: 62,
      memoryUsage: 71,
      requestRate: 1240,
      responseTime: 184,
      timestamp: minutesAgo(1),
    },
    deployments: [
      { _id: id('dep-1'), project, version: 'v2.4.2', environment: 'production', status: 'success', deployedBy: 'Developer', timestamp: minutesAgo(40) },
      { _id: id('dep-2'), project, version: 'v2.4.1', environment: 'production', status: 'failed', deployedBy: 'Developer', timestamp: minutesAgo(60 * 27) },
      { _id: id('dep-3'), project, version: 'v2.4.0', environment: 'production', status: 'success', deployedBy: 'Developer', timestamp: minutesAgo(60 * 72) },
    ],
    incidents: [activeIncident, resolvedIncident],
    investigations: [investigation],
    responses: [response],
    verifications: [verification],
  };
};

const saveStore = (pid, store) =>
  sessionStorage.setItem(storeKey(pid), JSON.stringify(store));

const ensureStore = async (pid, headers) => {
  const saved = sessionStorage.getItem(storeKey(pid));
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      // rebuild below
    }
  }

  let name = 'Demo Project';
  try {
    const res = await fetch(`${API_BASE_URL}/projects/${pid}`, { headers });
    const data = await res.json();
    if (res.ok) name = data.project.name;
  } catch (e) {
    // keep default name
  }

  const store = buildStore(pid, name);
  saveStore(pid, store);
  return store;
};

// A project is "demo" when it has no real incidents in the database
const isDemoProject = async (pid, headers) => {
  if (!pid) return false;

  const cached = sessionStorage.getItem(flagKey(pid));
  if (cached !== null) return cached === '1';

  try {
    const res = await fetch(`${API_BASE_URL}/incidents`, { headers });
    const data = await res.json();
    if (!res.ok) return false;

    const hasReal = data.incidents.some(
      (item) => String(item.project?._id || item.project) === String(pid)
    );

    sessionStorage.setItem(flagKey(pid), hasReal ? '0' : '1');
    return !hasReal;
  } catch (e) {
    return false;
  }
};

// ---------- Main wrapper: use instead of fetch ----------
const apiFetch = async (url, options = {}) => {
  const path = String(url).replace(API_BASE_URL, '');
  const [route, query = ''] = path.split('?');
  const params = new URLSearchParams(query);
  const method = (options.method || 'GET').toUpperCase();
  const headers = options.headers || {};
  const body = options.body ? JSON.parse(options.body) : {};
  const pid = sessionStorage.getItem('selectedProjectId');
  const now = new Date().toISOString();

  // Monitoring data
  if (method === 'GET' && ['/logs', '/metrics/latest', '/deployments'].includes(route)) {
    const projectId = params.get('project');

    if (await isDemoProject(projectId, headers)) {
      const store = await ensureStore(projectId, headers);

      if (route === '/logs') {
        const level = params.get('level');
        const logs =
          level && level !== 'all'
            ? store.logs.filter((item) => item.level === level)
            : store.logs;
        return reply({ logs });
      }

      if (route === '/metrics/latest') return reply({ metric: store.metric });

      return reply({ deployments: store.deployments });
    }

    return fetch(url, options);
  }

  // Single demo incident (read / update)
  const incidentMatch = route.match(/^\/incidents\/(.+)$/);
  if (incidentMatch && isDemoId(incidentMatch[1])) {
    const store = await ensureStore(pid, headers);
    const incident = store.incidents.find((item) => item._id === incidentMatch[1]);

    if (!incident) return reply({ message: 'Incident not found' }, 404);

    if (method === 'PUT' && body.status) {
      incident.status = body.status;
      incident.resolvedAt = body.status === 'resolved' ? now : null;
      saveStore(pid, store);
    }

    return reply({ incident });
  }

  // Lists: real data + demo data when the project is a demo project
  if (
    method === 'GET' &&
    ['/incidents', '/investigations', '/responses', '/verifications'].includes(route)
  ) {
    const res = await fetch(url, options);

    if (!res.ok || !(await isDemoProject(pid, headers))) return res;

    const data = await res.clone().json();
    const store = await ensureStore(pid, headers);
    const key = route.slice(1);

    return reply({ ...data, [key]: [...store[key], ...(data[key] || [])] });
  }

  // Analyze a demo incident
  if (method === 'POST' && route === '/investigations/analyze' && isDemoId(body.incidentId)) {
    const store = await ensureStore(pid, headers);
    const incident = store.incidents.find((item) => item._id === body.incidentId);

    if (!incident) return reply({ message: 'Incident not found' }, 404);

    const existing = store.investigations.find(
      (item) => item.incident._id === incident._id
    );
    if (existing) {
      return reply(
        { message: 'Investigation already exists for this incident', investigation: existing },
        409
      );
    }

    const investigation = {
      _id: `demo-investigation-${Date.now()}`,
      incident: brief(incident),
      evidence: `Analysis reviewed 8 recent logs for the "${incident.title}" incident. 4 error/critical logs were detected, most of them related to database connection activity.`,
      rootCause:
        'The most probable root cause is database connection pool exhaustion after a traffic spike, leaving requests waiting for free connections.',
      impact:
        'Requests that need the database may time out, causing slow responses or failed requests for affected users.',
      confidence: 86,
      status: 'completed',
      createdAt: now,
    };

    store.investigations.unshift(investigation);
    saveStore(pid, store);
    return reply({ message: 'Incident analyzed successfully', investigation }, 201);
  }

  // Create response for a demo incident
  if (method === 'POST' && route === '/responses' && isDemoId(body.incident)) {
    const store = await ensureStore(pid, headers);
    const incident = store.incidents.find((item) => item._id === body.incident);

    const created = {
      _id: `demo-response-${Date.now()}`,
      incident: brief(incident),
      investigation: body.investigation,
      recommendation: body.recommendation,
      recommendationReason: body.recommendationReason || '',
      remediation: body.remediation,
      approvalStatus: 'pending',
      approvedBy: null,
      approvedAt: null,
      status: 'pending',
      createdAt: now,
    };

    store.responses.unshift(created);
    saveStore(pid, store);
    return reply({ message: 'Response created successfully', response: created }, 201);
  }

  // Update demo response (generate again / approve / reject)
  const responseMatch = route.match(/^\/responses\/(.+)$/);
  if (method === 'PUT' && responseMatch && isDemoId(responseMatch[1])) {
    const store = await ensureStore(pid, headers);
    const found = store.responses.find((item) => item._id === responseMatch[1]);

    if (!found) return reply({ message: 'Response not found' }, 404);

    ['recommendation', 'remediation', 'recommendationReason', 'approvedBy', 'status'].forEach(
      (field) => {
        if (body[field] !== undefined) found[field] = body[field];
      }
    );

    if (body.approvalStatus !== undefined) {
      found.approvalStatus = body.approvalStatus;
      found.approvedAt = body.approvalStatus === 'approved' ? now : null;
    }

    saveStore(pid, store);
    return reply({ message: 'Response updated successfully', response: found });
  }

  // Create verification for a demo incident
  if (method === 'POST' && route === '/verifications' && isDemoId(body.incident)) {
    const store = await ensureStore(pid, headers);
    const incident = store.incidents.find((item) => item._id === body.incident);

    const created = {
      _id: `demo-verification-${Date.now()}`,
      incident: brief(incident),
      response: body.response,
      testName: body.testName,
      testDescription: body.testDescription,
      result: body.result,
      output: body.output,
      verifiedBy: body.verifiedBy || null,
      verifiedAt: now,
      status: body.status || 'completed',
      createdAt: now,
    };

    store.verifications.unshift(created);
    saveStore(pid, store);
    return reply({ message: 'Verification created successfully', verification: created }, 201);
  }

  // Everything else goes to the real backend
  return fetch(url, options);
};

export default apiFetch;