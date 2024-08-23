import React from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleReadMore = () => {
        navigate('/home');
    };

    const handleWriteBlog = () => {
        navigate('/write-blog');
    };

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

            {/* About Section */}
            <section className="about-section">
                <h2>About Me</h2>
                <p>Hello! I'm a passionate writer sharing my thoughts and experiences on various topics.</p>
                <img src="your-image-url.jpg" alt="About Me" className="about-image" />
            </section>

            {/* Featured Posts Section */}
            <section className="featured-posts">
                <h2>Featured Articles</h2>
                <div className="posts-grid">
                    {/* Post 1 */}
                    <div className="post">
                        <img src="post1-image-url.jpg" alt="Post 1" className="post-image" />
                        <h3 className="post-title">Post Title 1</h3>
                        <p className="post-excerpt">A brief description of the post...</p>
                    </div>
                    {/* Post 2 */}
                    <div className="post">
                        <img src="post2-image-url.jpg" alt="Post 2" className="post-image" />
                        <h3 className="post-title">Post Title 2</h3>
                        <p className="post-excerpt">A brief description of the post...</p>
                    </div>
                    {/* Add more posts as needed */}
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
