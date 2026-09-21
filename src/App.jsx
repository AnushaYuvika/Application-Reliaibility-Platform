import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Projects from './pages/Projects/Projects';
import CreateProject from './pages/Projects/CreateProject';
import Monitoring from './pages/Monitoring/Monitoring';
import Incidents from './pages/Incidents/Incidents';
import IncidentDetails from './components/incidents/IncidentDetails';
import Investigation from './pages/Investigation/Investigation';
import Response from './pages/Response/Response';
import Verification from './pages/Verification/Verification';
import Reports from './pages/Reports/Reports';
import Settings from './pages/Settings/Settings';
import ProjectDetails from './pages/Projects/ProjectDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/projects' element={
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        } />
        <Route path='/projects/create' element={
          <ProtectedRoute>
            <CreateProject />
          </ProtectedRoute>
        } />
        <Route path='/projects/:id' element={
          <ProtectedRoute>
            <ProjectDetails />
          </ProtectedRoute>
        } />
        <Route path='/monitoring' element={
          <ProtectedRoute>
            <Monitoring />
          </ProtectedRoute>
        } />
        <Route path='/incidents' element={
          <ProtectedRoute>
            <Incidents />
          </ProtectedRoute>
        } />
        <Route path='/incidents/:id' element={
          <ProtectedRoute>
            <IncidentDetails />
          </ProtectedRoute>
        } />
        <Route path='/investigation' element={
          <ProtectedRoute>
            <Investigation />
          </ProtectedRoute>
        } />
        <Route path='/response' element={
          <ProtectedRoute>
            <Response />
          </ProtectedRoute>
        } />
        <Route path='/verification' element={
          <ProtectedRoute>
            <Verification />
          </ProtectedRoute>
        } />
        <Route path='/reports' element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } />
        <Route path='/settings' element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App