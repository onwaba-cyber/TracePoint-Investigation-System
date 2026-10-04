import { NavLink } from 'react-router-dom';

// Top navigation bar: HOME | CASE | SUSPECTS | EVIDENCE | INVESTIGATION
// NOTE: Person 4 (React Components/UI) owns this component and may restyle it.
const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/case', label: 'Case' },
  { to: '/suspects', label: 'Suspects' },
  { to: '/evidence', label: 'Evidence' },
  { to: '/investigation', label: 'Investigation' },
];

export default function Navigation() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <span className="brand" aria-label="TracePoint Investigations">
          <span className="brand__mark" aria-hidden="true" />
          TracePoint
        </span>
        <nav aria-label="Main navigation">
          <ul className="nav-list">
            {links.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    isActive ? 'nav-link nav-link--active' : 'nav-link'
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
