// Saves the selected project. Clears the selected incident only if the
// project actually changed, so an incident from project A never shows up in project B.
export const selectProject = (projectId) => {
  const current = sessionStorage.getItem('selectedProjectId');

  if (String(current) !== String(projectId)) {
    sessionStorage.removeItem('selectedIncidentId');
  }

  sessionStorage.setItem('selectedProjectId', projectId);
};