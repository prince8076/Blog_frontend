import React from 'react';
import './LandingPage.css';
import { useNavigate, Link } from 'react-router-dom';
import { usePosts } from '../../hooks/usePosts';
import { optimizeImage, readingTime } from '../../api';

const LandingPage = () => {
    const navigate = useNavigate();
    const { posts, isSnapshot, isRefreshing, error, refresh } = usePosts();
    const featured = posts[0];
    const latest = posts.slice(1);

    return (
        <div className="landing-page">
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Stories worth slowing down for</h1>
                    <p className="hero-subtitle">Tech, travel, and lifestyle writing, without the noise.</p>
                    <div className="hero-actions">
                        <button className="cta-button" onClick={() => navigate('/home')}>Start reading</button>
                        <button className="cta-button write-blog-button" onClick={() => navigate('/write-blog')}>Write a blog</button>
                    </div>
                </div>
            </section>

            {isSnapshot && (
                <p className="saved-note">
                    Showing saved articles while the backend wakes up
                    {isRefreshing ? ' — checking for new articles…' : ''}
                    {!isRefreshing && error && (
                        <> · <button className="text-button" onClick={refresh}>Try again</button></>
                    )}
                </p>
            )}
            {error && !isSnapshot && (
                <p className="saved-note">{error} <button className="text-button" onClick={refresh}>Try again</button></p>
            )}

            {featured && (
                <section className="featured-article" aria-label="Featured article">
                    <Link to={`/post/${featured._id}`} className="featured-link">
                        {featured.image && (
                            <img
                                src={optimizeImage(featured.image, 1200)}
                                alt=""
                                className="featured-image"
                                decoding="async"
                                width="1200"
                                height="675"
                            />
                        )}
                        <div className="featured-text">
                            <p className="featured-label">Featured</p>
                            <h2>{featured.title}</h2>
                            <p className="featured-meta">{readingTime(featured.excerpt)}</p>
                            <p className="featured-excerpt">
                                {(featured.excerpt || '').length > 220 ? featured.excerpt.substring(0, 220) + '…' : (featured.excerpt || '')}
                            </p>
                            <span className="featured-cta">Read the article</span>
                        </div>
                    </Link>
                </section>
            )}

            <section className="featured-posts">
                <h2>Latest articles</h2>
                <div className="posts-grid">
                    {latest.map((post) => (
                        <Link to={`/post/${post._id}`} key={post._id} className="post-link">
                            <article className="post">
                                {post.image && (
                                    <img
                                        src={optimizeImage(post.image, 800)}
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                        width="800"
                                        height="450"
                                        className="post-image"
                                    />
                                )}
                                <div className="post-content">
                                    <h3>{post.title}</h3>
                                    <p className="post-meta">{readingTime(post.excerpt)}</p>
                                    <p className="post-excerpt">
                                        {(post.excerpt || '').length > 120 ? post.excerpt.substring(0, 120) + '…' : (post.excerpt || '')}
                                    </p>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
