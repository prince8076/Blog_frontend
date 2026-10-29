import React, { useState, useEffect, useCallback } from 'react';
import FeaturedPosts from '../components/PostCard';
import { LoadingState, ErrorState } from '../components/LoadingState';
import { getPosts } from '../api';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            setPosts(await getPosts());
        } catch (err) {
            setError('Failed to fetch posts. The backend may still be waking up — please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchPosts(); }, [fetchPosts]);

    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} onRetry={fetchPosts} />;

    return (
        <div>
            <FeaturedPosts posts={posts} />
        </div>
    );
};

export default HomePage;
