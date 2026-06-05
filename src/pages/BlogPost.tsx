import { useParams, Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import AnimatedSection from '../components/AnimatedSection';
import Button from '../components/Button';
import type { BlogPost } from '../content/types';
import _postsData from '../content/blog_posts.json';
const postsData = _postsData as BlogPost[];
import './BlogPost.css';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = postsData.find(p => p.slug === slug && p.published?.toLowerCase() === 'true');

  if (!post) {
    return (
      <div className="not-found">
        <div className="container">
          <h1>Article not found</h1>
          <Link to="/blog">← Back to Resources</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <PageMeta
        title={post.title}
        description={post.excerpt}
        image={post.image || undefined}
        path={`/blog/${post.slug}`}
      />

      <section className="blog-post-hero">
        <div className="container">
          <AnimatedSection>
            <div className="blog-post-meta">
              <Link to="/blog" className="blog-post-back">← Resources</Link>
              <span className="blog-category">{post.category}</span>
            </div>
            <h1 className="blog-post-title">{post.title}</h1>
            <div className="blog-post-byline">
              <span>{post.author}</span>
              <span>·</span>
              <span>{formatDate(post.date)}</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section">
        <div className="container blog-post-layout">
          <AnimatedSection className="blog-post-content">
            {post.body.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </AnimatedSection>

          <aside className="blog-post-sidebar">
            <AnimatedSection delay={0.2}>
              <div className="blog-sidebar-card">
                <h3>Is your claim underpaid?</h3>
                <p>A free review costs nothing. We'll tell you honestly whether we can recover more — before you commit to anything.</p>
                <Button to="/contact" fullWidth size="md">Get a Free Review</Button>
              </div>
            </AnimatedSection>
          </aside>
        </div>
      </section>

    </div>
  );
}
