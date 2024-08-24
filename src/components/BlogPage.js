import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogPage = () => {
    const [posts, setPosts] = useState([]);
    const [query, setQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://backend-4ser4fvoo-princes-projects-f165a06c.vercel.app/api/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    // Filter posts based on the search query
    useEffect(() => {
        if (query.length > 0) {
            const results = posts.filter(post =>
                post.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPosts(results);
        } else {
            setFilteredPosts(posts);
        }
    }, [query, posts]);

    return (
        <div style={{ padding: '20px' }}>
            <input
                type="text"
                placeholder="Search by title..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                    padding: '10px',
                    width: '300px',
                    marginBottom: '20px',
                    fontSize: '16px',
                }}
            />
            <div>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => (
                        <div key={index} style={{ margin: '20px 0', padding: '10px', border: '1px solid #ddd' }}>
                            <h2>{post.title}</h2>
                            <p>{post.description}</p>
                            <article>{post.content}</article>
                        </div>
                    ))
                ) : (
                    <p>No matching articles found.</p>
                )}
            </div>
        </div>
    );
};

export default BlogPage;
