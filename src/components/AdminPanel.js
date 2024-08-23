import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    // Fetch posts when the component mounts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/posts');
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
            await axios.delete(`http://localhost:5000/api/posts/${postId}`);
            setPosts(posts.filter(post => post._id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
            setError(`Failed to delete post. Server responded with: ${error.response?.data.message || error.message}`);
        }
    };

    return (
        <div className="admin-panel">
            <h2>Admin Panel</h2>
            {error && <p className="error-message">{error}</p>}
            <ul>
                {posts.length ? (
                    posts.map(post => (
                        <li key={post._id} className="post-item">
                            <div className="post-info">
                                <h3>{post.title}</h3>
                                <img src={post.image} alt={post.title} className="post-image" />
                                <p>{post.excerpt}</p>
                            </div>
                            <button onClick={() => handleDelete(post._id)} className="delete-button">
                                Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No posts available.</p>
                )}
            </ul>

            <style jsx>{`
                .admin-panel {
                    background-color: #000; /* Black background */
                    color: #fff; /* White text color */
                    padding: 2rem;
                }

                .post-item {
                    border: 1px solid #444; /* Dark gray border */
                    border-radius: 8px;
                    margin-bottom: 1rem;
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background-color: #1a1a1a; /* Slightly lighter black */
                }

                .post-info {
                    flex-grow: 1;
                }

                .post-image {
                    max-width: 100px;
                    max-height: 100px;
                    object-fit: cover;
                    border-radius: 4px;
                }

                .delete-button {
                    background-color: #d9534f;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    padding: 0.5rem 1rem;
                    cursor: pointer;
                }

                .delete-button:hover {
                    background-color: #c9302c;
                }

                .error-message {
                    color: #d9534f;
                    margin-bottom: 1rem;
                }
            `}</style>
        </div>
    );
};

export default AdminPanel;
