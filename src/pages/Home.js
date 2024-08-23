import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeaturedPosts from '../components/PostCard';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/posts');
                setPosts(response.data);
            } catch (err) {
                setError('Failed to fetch posts');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <FeaturedPosts posts={posts} />
        </div>
    );
};

export default HomePage;
