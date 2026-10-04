import { Outlet } from 'react-router-dom';
import Navigation from './Navigation.jsx';

// Page layout shared by every route: navigation on top, page content in the middle, footer below.
export default function Layout() {
  return (
    <div className="app-shell">
      <Navigation />
      <main className="page" id="main-content">
        <Outlet />
      </main>
      <footer className="site-footer">
        &copy; {new Date().getFullYear()} TracePoint Investigations
      </footer>
    </div>
  );
}
