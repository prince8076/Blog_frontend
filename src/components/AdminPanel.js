import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [editingPost, setEditingPost] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedExcerpt, setUpdatedExcerpt] = useState('');
    const [updatedImage, setUpdatedImage] = useState('');

    // Fetch posts when the component mounts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://blog-backend-fd7d.onrender.com/api/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Failed to load posts. Please try again later.');
            }
        };

        fetchPosts();
    }, []);

    // Handle post deletion
    const handleDelete = async (postId) => {
        try {
            await axios.delete(`https://blog-backend-fd7d.onrender.com/api/posts/${postId}`);
            setPosts(posts.filter(post => post._id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
            setError(`Failed to delete post. Server responded with: ${error.response?.data.message || error.message}`);
        }
    };

    // Handle post update
    const handleUpdate = async (postId) => {
        try {
            const updatedPost = {
                title: updatedTitle,
                excerpt: updatedExcerpt,
                image: updatedImage
            };
            await axios.put(`https://blog-backend-fd7d.onrender.com/api/posts/${postId}`, updatedPost);
            setPosts(posts.map(post => (post._id === postId ? { ...post, ...updatedPost } : post)));
            setEditingPost(null);
            setUpdatedTitle('');
            setUpdatedExcerpt('');
            setUpdatedImage('');
        } catch (error) {
            console.error('Error updating post:', error);
            setError(`Failed to update post. Server responded with: ${error.response?.data.message || error.message}`);
        }
    };

    return (
        <div className="admin-panel">
            <h2>Admin Panel</h2>
            {error && <p className="error-message">{error}</p>}
            <ul className="post-list">
                {posts.length ? (
                    posts.map(post => (
                        <li key={post._id} className="post-item">
                            <div className="post-info">
                                <img src={post.image} alt={post.title} className="post-image" />
                                <div className="post-details">
                                    <h3>{post.title}</h3>
                                    <p>{post.excerpt}</p>
                                </div>
                            </div>
                            <div className="post-actions">
                                <button onClick={() => handleDelete(post._id)} className="delete-button">
                                    Delete
                                </button>
                                <button onClick={() => setEditingPost(post)} className="edit-button">
                                    Edit
                                </button>
                            </div>
                            {editingPost && editingPost._id === post._id && (
                                <div className="update-form">
                                    <h4>Update Post</h4>
                                    <input
                                        type="text"
                                        value={updatedTitle}
                                        onChange={(e) => setUpdatedTitle(e.target.value)}
                                        placeholder="Title"
                                    />
                                    <textarea
                                        value={updatedExcerpt}
                                        onChange={(e) => setUpdatedExcerpt(e.target.value)}
                                        placeholder="Excerpt"
                                    ></textarea>
                                    <input
                                        type="text"
                                        value={updatedImage}
                                        onChange={(e) => setUpdatedImage(e.target.value)}
                                        placeholder="Image URL"
                                    />
                                    <button onClick={() => handleUpdate(post._id)} className="update-button">
                                        Update
                                    </button>
                                </div>
                            )}
                        </li>
                    ))
                ) : (
                    <p>No posts available.</p>
                )}
            </ul>

            <style jsx>{`
                .admin-panel {
                    background-color: #121212;
                    color: #e0e0e0;
                    padding: 2rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
                    max-width: 800px;
                    margin: 2rem auto;
                    font-family: 'Poppins', sans-serif;
                }

                h2 {
                    text-align: center;
                    margin-bottom: 2rem;
                    font-size: 2rem;
                    color: #ffffff;
                }

                .post-list {
                    list-style: none;
                    padding: 0;
                }

                .post-item {
                    background-color: #1f1f1f;
                    border: 1px solid #333;
                    border-radius: 8px;
                    margin-bottom: 1rem;
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
                }

                .post-info {
                    display: flex;
                    align-items: center;
                    flex-grow: 1;
                    gap: 1rem;
                }

                .post-image {
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                    border-radius: 4px;
                }

                .post-details {
                    flex-grow: 1;
                }

                .post-details h3 {
                    font-size: 1.2rem;
                    margin: 0;
                    color: #e0e0e0;
                }

                .post-details p {
                    font-size: 0.9rem;
                    color: #b0b0b0;
                    margin: 0.5rem 0 0;
                }

                .post-actions {
                    display: flex;
                    gap: 0.5rem;
                }

                .edit-button {
                    background-color: #00aaff;
                    color: #ffffff;
                    border: none;
                    border-radius: 5px;
                    padding: 0.5rem 1rem;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                }

                .edit-button:hover {
                    background-color: #007bb5;
                    transform: scale(1.05);
                }

                .update-form {
                    margin-top: 1rem;
                    background-color: #2a2a2a;
                    padding: 1rem;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
                }

                .update-form h4 {
                    margin-bottom: 1rem;
                    color: #ffffff;
                    font-size: 1.2rem;
                }

                .update-form input,
                .update-form textarea {
                    width: 100%;
                    padding: 0.9rem;
                    margin-bottom: 1rem;
                    border-radius: 5px;
                    border: 1px solid #444;
                    background-color: #1e1e1e;
                    color: #e0e0e0;
                }

                .update-form textarea {
                    height: 120px;
                    resize: vertical;
                }

                .update-button {
                    background-color: #6200ea;
                    color: #ffffff;
                    border: none;
                    border-radius: 5px;
                    padding: 0.5rem 1rem;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                }

                .update-button:hover {
                    background-color: #3700b3;
                    transform: scale(1.05);
                }

                .delete-button {
                    background-color: #ff4d4d;
                    color: #ffffff;
                    border: none;
                    border-radius: 5px;
                    padding: 0.5rem 1rem;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                }

                .delete-button:hover {
                    background-color: #cc0000;
                    transform: scale(1.05);
                }

                .error-message {
                    color: #ff4d4d;
                    margin-bottom: 1rem;
                    text-align: center;
                }
            `}</style>
        </div>
    );
};

export default AdminPanel;
