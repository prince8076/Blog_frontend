import React, { useState } from 'react';
import { API_BASE, clearPostsCache, optimizeImage } from '../api';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// Write page, fixed: the old heading was white text on a white card, so
// it was invisible; labels were pale grey; errors used alert(). Now the
// heading, labels and error are all readable, the image URL shows a
// preview, and the button shows a publishing state.
const WriteBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [imageBroken, setImageBroken] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            await axios.post(`${API_BASE}/api/posts`, { title, excerpt: content, image });
            clearPostsCache();
            navigate("/");
        } catch (err) {
            setError('Failed to create the blog post. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const showPreview = image.trim().startsWith('http') && !imageBroken;

    return (
        <div className="write-blog-page">
            <Link className="back-link" to="/">← Back to articles</Link>
            <h2>Write a blog post</h2>
            <p className="write-intro">Share a story, a guide, or an idea. It will appear on the home page once it is published.</p>
            {error && <p className="write-error" role="alert">{error}</p>}
            <form className="write-blog-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="A title readers will remember" />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required placeholder="Write your article here…" />
                    <p className="field-hint">{content.length} characters</p>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image URL <span className="optional">(optional)</span></label>
                    <input type="url" id="image" value={image} onChange={(e) => { setImage(e.target.value); setImageBroken(false); }} placeholder="https://…" />
                    {showPreview && (
                        <img src={optimizeImage(image, 800)} alt="" className="image-preview" loading="lazy" decoding="async" onError={() => setImageBroken(true)} />
                    )}
                    {image.trim() && imageBroken && <p className="field-hint">That image could not be loaded, but the post can still be published.</p>}
                </div>
                <button type="submit" className="submit-button" disabled={submitting}>{submitting ? 'Publishing…' : 'Publish post'}</button>
            </form>

            <style>{`
                .write-blog-page {
                    max-width: 720px;
                    margin: 2.5rem auto;
                    padding: 2rem;
                    background-color: #ffffff;
                    border: 1px solid #e7e2d9;
                    border-radius: 16px;
                    color: #1a1a1a;
                    font-family: system-ui, Arial, sans-serif;
                    min-width: 0;
                }
                .back-link {
                    color: #b45309;
                    font-weight: 600;
                    text-decoration: none;
                }
                .write-blog-page h2 {
                    font-family: Georgia, 'Times New Roman', serif;
                    font-size: 2rem;
                    line-height: 1.2;
                    margin: 1rem 0 0.5rem;
                    color: #1a1a1a;
                    overflow-wrap: break-word;
                }
                .write-intro {
                    color: #666666;
                    margin: 0 0 1.5rem;
                    line-height: 1.6;
                }
                .write-error {
                    background-color: #fef2f2;
                    border: 1px solid #fecaca;
                    color: #b91c1c;
                    border-radius: 8px;
                    padding: 0.75rem 1rem;
                    margin: 0 0 1.5rem;
                }
                .write-blog-form { display: flex; flex-direction: column; }
                .form-group { margin-bottom: 1.5rem; }
                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 700;
                    color: #1a1a1a;
                }
                .optional { font-weight: 400; color: #666666; }
                .form-group input, .form-group textarea {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 0.9rem;
                    font-size: 1rem;
                    border-radius: 8px;
                    border: 1px solid #e7e2d9;
                    background-color: #faf9f6;
                    color: #1a1a1a;
                }
                .form-group input:focus, .form-group textarea:focus {
                    outline: 2px solid #b45309;
                    outline-offset: 1px;
                    border-color: #b45309;
                }
                .form-group textarea { height: 220px; resize: vertical; }
                .field-hint { color: #666666; font-size: 0.9rem; margin: 0.4rem 0 0; }
                .image-preview {
                    width: 100%;
                    height: auto;
                    aspect-ratio: 8 / 5;
                    object-fit: cover;
                    border-radius: 12px;
                    margin-top: 0.75rem;
                    display: block;
                }
                .submit-button {
                    padding: 0.9rem 1.5rem;
                    background-color: #b45309;
                    color: #ffffff;
                    border: none;
                    border-radius: 999px;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                }
                .submit-button:hover:not(:disabled) { background-color: #92400e; }
                .submit-button:disabled { opacity: 0.6; cursor: wait; }
            `}</style>
        </div>
    );
};

export default WriteBlog;
