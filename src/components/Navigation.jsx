import { NavLink } from 'react-router-dom';
function Navigation() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/cats/new">Create a Cat</NavLink>
      <NavLink to="/photo">Photo</NavLink>
      <NavLink to="/toggle-photo-type">Set Photo Type</NavLink>
    </nav>
  );
}

export default Navigation;
