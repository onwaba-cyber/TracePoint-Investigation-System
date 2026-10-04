import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <section className="hero">
      <p className="hero__eyebrow">TracePoint Investigations</p>
      <h1 className="hero__title">The Missing Prototype</h1>
      <p className="hero__text">A prototype has disappeared from a secure research laboratory.</p>
      <p className="hero__text">
        Your task is to investigate the evidence and identify the most likely suspect.
      </p>
      <Link to="/case" className="btn btn--primary btn--large">
        Start Investigation
      </Link>
    </section>
  );
}
