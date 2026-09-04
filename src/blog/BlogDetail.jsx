import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug } from './BlogLoader.js';
import BlogHeader from './BlogHeader.jsx';

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default function BlogDetail() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <>
        <BlogHeader />
        <main className="max-w-3xl mx-auto px-5 md:px-0 py-24 text-center">
          <h1 className="t-h3">記事が見つかりませんでした</h1>
          <Link to="/blog" className="nav-link mt-4 inline-block">← ブログ一覧へ戻る</Link>
        </main>
      </>
    );
  }

  const pageTitle = `${post.title} | YouWorld ブログ`;
  const description = post.excerpt || post.title;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        {post.image && <meta property="og:image" content={post.image} />}
      </Helmet>

      <BlogHeader />

      <main className="max-w-3xl mx-auto px-5 md:px-0 py-16 md:py-24">
        <Link to="/blog" className="nav-link">← ブログ一覧へ戻る</Link>

        <div className="mt-8">
          {post.date && <div className="t-small" style={{ color: 'var(--light)' }}>{formatDate(post.date)}</div>}
          <h1 className="t-h2 mt-3" style={{ color: 'var(--navy)' }}>{post.title}</h1>
          <span className="gold-rule mt-5"></span>
        </div>

        <article className="prose-blog mt-10">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </article>

        {post.youworldView && (
          <div className="youworld-view-box">
            <div className="eyebrow">YouWorldの視点</div>
            <p className="t-body whitespace-pre-line mt-3">{post.youworldView}</p>
          </div>
        )}

        {post.source && (
          <p className="t-small mt-8" style={{ color: 'var(--light)' }}>
            出典:{' '}
            {post.sourceUrl ? (
              <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)', textDecoration: 'underline' }}>
                {post.source}
              </a>
            ) : (
              post.source
            )}
          </p>
        )}

        <div className="mt-14 p-8 rounded-2xl text-center" style={{ background: 'var(--navy)' }}>
          <p className="t-h3" style={{ color: '#fff' }}>英語の仕事で感じているストレスを、一緒に整理しませんか。</p>
          <a href="/#contact" className="btn-primary mt-5" style={{ background: 'var(--gold)', color: 'var(--navy)' }}>無料相談を予約する</a>
        </div>
      </main>

      <footer className="border-t py-10 text-center" style={{ borderColor: 'var(--border)' }}>
        <a href="/" className="nav-link">← YouWorld トップページへ戻る</a>
      </footer>
    </>
  );
}
