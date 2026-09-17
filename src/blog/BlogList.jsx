import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getAllPosts } from './BlogLoader.js';
import BlogHeader from './BlogHeader.jsx';

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default function BlogList() {
  const posts = getAllPosts();

  return (
    <>
      <Helmet>
        <title>ブログ | YouWorld エグゼクティブのための英語コーチング</title>
        <meta name="description" content="コンテクスチュアル・ランゲージの視点から、英語コミュニケーションと実務コーチングについて発信するブログです。" />
        <link rel="canonical" href="https://www.youworldenglish.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.youworldenglish.com/blog" />
        <meta property="og:title" content="ブログ | YouWorld エグゼクティブのための英語コーチング" />
        <meta property="og:description" content="コンテクスチュアル・ランゲージの視点から、英語コミュニケーションと実務コーチングについて発信するブログです。" />
      </Helmet>

      <BlogHeader />

      <main className="max-w-3xl mx-auto px-5 md:px-0 py-16 md:py-24">
        <div className="mb-14">
          <span className="eyebrow">Blog</span>
          <h1 className="t-h2 mt-3" style={{ color: 'var(--navy)' }}>YouWorld ブログ</h1>
          <span className="gold-rule mt-4"></span>
          <p className="t-body mt-6" style={{ color: 'var(--mid)', maxWidth: '38rem' }}>
            コンテクスチュアル・ランゲージという視点から、英語でのビジネスコミュニケーションについて発信していきます。
          </p>
        </div>

        {posts.length === 0 && (
          <p className="t-body" style={{ color: 'var(--mid)' }}>まだ記事がありません。</p>
        )}

        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="card block overflow-hidden">
              <div className="p-7 md:p-8">
                {post.date && <div className="t-small" style={{ color: 'var(--light)' }}>{formatDate(post.date)}</div>}
                <h2 className="t-h3 mt-2" style={{ color: 'var(--ink)' }}>{post.title}</h2>
                {post.excerpt && (
                  <p className="t-small mt-3" style={{ color: 'var(--mid)' }}>{post.excerpt}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t py-10 text-center" style={{ borderColor: 'var(--border)' }}>
        <a href="/" className="nav-link">← YouWorld トップページへ戻る</a>
      </footer>
    </>
  );
}
