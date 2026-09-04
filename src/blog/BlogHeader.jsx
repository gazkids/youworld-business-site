import { Link } from 'react-router-dom';

export default function BlogHeader() {
  return (
    <header className="blog-header">
      <div className="max-w-3xl mx-auto px-5 md:px-0 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src="/YouWorlodlogo.png" alt="YouWorld" className="h-6 w-auto" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </a>
        <div className="flex items-center gap-6">
          <Link to="/blog" className="nav-link">ブログ一覧</Link>
          <a href="/#contact" className="btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.875rem' }}>無料相談</a>
        </div>
      </div>
    </header>
  );
}
