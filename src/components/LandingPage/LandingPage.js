import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import { usePosts } from '../../hooks/usePosts';
import { optimizeImage, readingTime } from '../../api';
import AdSlot from '../AdSlot';

// Magazine cover, not an empty hero: the featured article IS the hero,
// text on the left, its image on the right, so the first screen is never
// a lone headline floating over white space. The old page had a 68vh
// photo hero, then a second headline, then a featured block — three
// introductions before any article.
const LandingPage = () => {
    const { posts, isSnapshot, isRefreshing, error, refresh } = usePosts();
    const featured = posts[0];
    const latest = posts.slice(1);

    return (
        <div className="landing-page">
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

            {featured ? (
                <section className="cover" aria-label="Featured article">
                    <div className="cover-text">
                        <p className="cover-kicker">Featured</p>
                        <h1 className="cover-title">
                            <Link to={`/post/${featured._id}`}>{featured.title}</Link>
                        </h1>
                        <p className="cover-meta">{readingTime(featured.excerpt)}</p>
                        <p className="cover-excerpt">
                            {(featured.excerpt || '').length > 260 ? featured.excerpt.substring(0, 260) + '…' : (featured.excerpt || '')}
                        </p>
                        <div className="cover-actions">
                            <Link className="cta-button" to={`/post/${featured._id}`}>Read the article</Link>
                            <Link className="cta-button cta-secondary" to="/home">All articles</Link>
                        </div>
                    </div>
                    {featured.image && (
                        <Link to={`/post/${featured._id}`} className="cover-image-link" aria-label={featured.title}>
                            <img
                                src={optimizeImage(featured.image, 1200)}
                                alt=""
                                className="cover-image"
                                decoding="async"
                                width="1200"
                                height="750"
                            />
                        </Link>
                    )}
                </section>
            ) : (
                <section className="cover-empty">
                    <h1>No articles yet</h1>
                    <p>There is nothing to show here right now. Try again in a moment, or write the first one.</p>
                    <Link className="cta-button" to="/write-blog">Write a blog</Link>
                </section>
            )}

            <AdSlot />

            {latest.length > 0 && (
                <section className="latest">
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
                                            height="500"
                                            className="post-image"
                                        />
                                    )}
                                    <div className="post-content">
                                        <h3>{post.title}</h3>
                                        <p className="post-meta">{readingTime(post.excerpt)}</p>
                                        <p className="post-excerpt">
                                            {(post.excerpt || '').length > 140 ? post.excerpt.substring(0, 140) + '…' : (post.excerpt || '')}
                                        </p>
                                        <span className="post-read">Read article →</span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default LandingPage;
