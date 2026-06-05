import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import type { BlogPost } from '../content/types';
import _postsData from '../content/blog_posts.json';
const postsData = _postsData as BlogPost[];
import './Blog.css';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function Blog() {
  const posts = postsData.filter(p => p.published?.toLowerCase() === 'true');

  return (
    <div className="blog-page">
      <PageMeta
        title="Resources"
        description="Insurance tactics, homeowner rights, and claim tips from the adjusters at Trust Guard. Know what your insurer knows."
        path="/blog"
      />

      <section className="page-hero">
        <div className="container">
          <AnimatedSection>
            <span className="page-eyebrow">Resources</span>
            <h1 className="page-title">Know your rights. Know your claim.</h1>
            <p className="page-sub">
              We write about what we see on the job — the tactics insurers use,
              the mistakes homeowners make, and the things you can do right now to
              protect yourself.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {posts.length === 0 ? (
            <div className="blog-empty">
              <p>Articles coming soon. Check back shortly.</p>
            </div>
          ) : (
            <div className="blog-grid">
              {posts.map((post, i) => (
                <AnimatedSection key={post.slug} delay={i * 0.08}>
                  <article className="blog-card">
                    {post.image && (
                      <div className="blog-card-img">
                        <img src={post.image} alt={post.title} loading="lazy" />
                      </div>
                    )}
                    <div className="blog-card-body">
                      <div className="blog-card-meta">
                        <span className="blog-category">{post.category}</span>
                        <span className="blog-date">{formatDate(post.date)}</span>
                      </div>
                      <h2 className="blog-card-title">{post.title}</h2>
                      <p className="blog-card-excerpt">{post.excerpt}</p>
                      <Link to={`/blog/${post.slug}`} className="blog-read-more">
                        Read article →
                      </Link>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section blog-cta">
        <div className="container">
          <SectionHeading
            eyebrow="Don't wait"
            heading="Have a claim right now?"
            sub="Reading is great. Acting is better. Get a free review today."
            light
          />
          <div style={{ textAlign: 'center' }}>
            <Button to="/contact" size="lg">Get a Free Claim Review</Button>
          </div>
        </div>
      </section>

    </div>
  );
}
