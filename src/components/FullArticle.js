import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE, getCachedPosts, optimizeImage, readingTime } from '../api';
import { LoadingState, ErrorState } from './LoadingState';

const FullArticle = () => {
    const { id } = useParams();
    const [post, setPost] = useState(() => {
        const cached = getCachedPosts();
        return cached ? cached.find(p => p._id === id) || null : null;
    });
    const [loading, setLoading] = useState(!post);
    const [error, setError] = useState(null);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/posts/${id}`);
                if (!response.ok) throw new Error('Failed to fetch post');
                const data = await response.json();
                setPost(data);
                const cached = getCachedPosts();
                if (cached) setRelated(cached.filter(p => p._id !== id).slice(0, 3));
            } catch (err) {
                if (!post) setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (loading) return <LoadingState label="Loading article…" />;
    if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;
    if (!post) return <p>Post not found.</p>;

    return (
        <div className="full-article">
            <Link to="/" className="back-link">← Back to articles</Link>
            <h1>{post.title}</h1>
            <p className="article-meta">{readingTime(post.excerpt)}</p>
            {post.image && (
                <img
                    src={optimizeImage(post.image, 1200)}
                    alt=""
                    className="article-image"
                    decoding="async"
                    width="1200"
                    height="675"
                />
            )}
            <p className="article-body">{post.excerpt || ''}</p>

            {related.length > 0 && (
                <section className="related">
                    <h2>More to read</h2>
                    <ul>
                        {related.map(p => (
                            <li key={p._id}><Link to={`/post/${p._id}`}>{p.title}</Link></li>
                        ))}
                    </ul>
                </section>
            )}

            <style>{`
                .full-article {
                    background-color: #faf9f6;
                    color: #1a1a1a;
                    padding: 2rem 1rem;
                    max-width: 720px;
                    margin: auto;
                    min-width: 0;
                }
                .back-link {
                    color: #b45309;
                    font-weight: 600;
                    text-decoration: none;
                }
                .full-article h1 {
                    font-family: Georgia, 'Times New Roman', serif;
                    font-size: clamp(2rem, 4vw, 3rem);
                    line-height: 1.15;
                    margin: 1rem 0 0.5rem;
                    overflow-wrap: break-word;
                }
                .article-meta {
                    color: #666666;
                    margin: 0 0 1.5rem;
                }
                .article-image {
                    width: 100%;
                    height: auto;
                    margin: 1rem 0;
                    border-radius: 12px;
                    display: block;
                }
                .article-body {
                    font-size: 1.15rem;
                    line-height: 1.8;
                    color: #333333;
                    white-space: pre-line;
                    overflow-wrap: break-word;
                }
                .related {
                    border-top: 1px solid #e7e2d9;
                    margin-top: 3rem;
                    padding-top: 1.5rem;
                }
                .related h2 {
                    font-family: Georgia, 'Times New Roman', serif;
                }
                .related a {
                    color: #b45309;
                }
            `}</style>
        </div>
    );
};

export default FullArticle;
