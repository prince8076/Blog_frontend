import React from 'react';
import FeaturedPosts from '../components/PostCard';
import { usePosts } from '../hooks/usePosts';

const HomePage = () => {
    const { posts, isSnapshot, isRefreshing, error, refresh } = usePosts();

    return (
        <div>
            {isSnapshot && (
                <p style={{ maxWidth: 1120, margin: '1rem auto', padding: '0 1rem', color: '#666' }}>
                    Showing saved articles while the backend wakes up
                    {isRefreshing ? ' — checking for new articles…' : ''}
                    {!isRefreshing && error && (
                        <> · <button onClick={refresh} style={{ background: 'none', border: 'none', color: '#b45309', fontWeight: 600, cursor: 'pointer', padding: 0 }}>Try again</button></>
                    )}
                </p>
            )}
            <FeaturedPosts posts={posts} title="All articles" />
        </div>
    );
};

export default HomePage;
