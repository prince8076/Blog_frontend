import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Above from '../../pages/About';

const LandingPage = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleReadMore = () => {
        navigate('/home');
    };

    const handleWriteBlog = () => {
        navigate('/write-blog');
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://blog-backend-fd7d.onrender.com/api/posts');
                const fetchedPosts = response.data;
                const randomPosts = fetchedPosts.sort(() => 0.5 - Math.random()).slice(0, 2);
                setPosts(randomPosts);
            } catch (err) {
                setError('Failed to fetch posts');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);


    return (
        <div className="landing-page">
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Welcome to My Blog</h1>
                    <p className="hero-subtitle">Discover insights on Tech, Travel, and Lifestyle</p>
                    <button className="cta-button" onClick={handleReadMore}>Start Reading</button>
                    <button className="cta-button write-blog-button" onClick={handleWriteBlog}>Write a Blog</button>
                </div>
            </section>
            <Above />

            <section className="featured-posts">
                <h2>Featured Articles</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="posts-grid">
                        {posts.map((post) => (
                            <Link to={`/post/${post._id}`} key={post._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="post">
                                    <img src={post.image} alt={post.title} className="post-image" />
                                    <div className="post-content">
                                        <h3>{post.title}</h3>
                                        <p className="post-excerpt">
                                            {post.excerpt.length > 100 ? post.excerpt.substring(0, 100) + '...' : post.excerpt}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default LandingPage;
