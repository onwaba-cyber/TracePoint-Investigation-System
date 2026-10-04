import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="hero">
      <h1 className="hero__title">Page not found</h1>
      <p className="hero__text">The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn--primary">
        Back to Home
      </Link>
    </section>
  );
}
