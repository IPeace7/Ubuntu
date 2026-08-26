export default function NotFoundPage({ onGoHome }) {
  return (
    <div className="nf-page">
      <div className="nf-content">
        <h1 className="nf-code">404</h1>
        <h2 className="nf-title">Page not found</h2>
        <p className="nf-desc">Oops! The page you're looking for doesn't exist or has been moved.</p>
        <button className="nf-btn" onClick={onGoHome}>Go Back Home</button>
      </div>
      <div className="nf-illustration">
        <div className="nf-person" />
        <div className="nf-leaves">
          <div className="nf-leaf nf-leaf-1" />
          <div className="nf-leaf nf-leaf-2" />
          <div className="nf-leaf nf-leaf-3" />
        </div>
      </div>
    </div>
  );
}
