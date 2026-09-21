import { NavLink, useNavigate } from 'react-router-dom'
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    navigate('/login');
  };


  return (
    <aside className='sidebar'>

      <div className='sidebar-brand'>
        <span className='sidebar-logo'>◉</span>
        <span>Reliability</span>
      </div>

      <nav className='sidebar-nav'>

        <NavLink to='/dashboard'>
          <span>▣</span>
          Dashboard
        </NavLink>

        <NavLink to="/projects">
          <span>◆</span>
          Projects
        </NavLink>

        <NavLink to="/monitoring">
          <span>◌</span>
          Monitoring
        </NavLink>

        <NavLink to="/incidents">
          <span>!</span>
          Incidents
        </NavLink>

        <NavLink to="/investigation">
          <span>⌕</span>
          Investigation
        </NavLink>

        <NavLink to="/response">
          <span>↗</span>
          Response
        </NavLink>

        <NavLink to="/verification">
          <span>✓</span>
          Verification
        </NavLink>

        <NavLink to="/reports">
          <span>▤</span>
          Reports
        </NavLink>

      </nav>

      <div className='sidebar-bottom'>

        <NavLink to='/settings'>
          <span>⚙</span>
          Settings
        </NavLink>

        <button className='sidebar-logout'
          onClick={handleLogout}
        >
          <span>↪</span>
          Logout
        </button>
      </div>

    </aside>
  )
}

export default Sidebar