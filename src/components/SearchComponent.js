import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchComponent = ({ query }) => {
    const [posts, setPosts] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://blog-backend-fd7d.onrender.com/api/posts');
                setPosts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Failed to fetch posts. Please try again later.');
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        if (query.length > 0) {
            const filteredData = posts.filter((post) =>
                post.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(posts);
        }
    }, [query, posts]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {filteredResults.length > 0 ? (
                filteredResults.map((post, index) => (
                    <div key={index} style={{ margin: '20px 0', padding: '10px', border: '1px solid #ddd' }}>
                        <h3>{post.title}</h3>
                        <img src={post.image} alt={post.title} style={{ maxWidth: '100%' }} />
                        <p>{post.excerpt}</p>

                    </div>
                ))
            ) : (
                <div>No matching posts found.</div>
            )}
        </div>
    );
};

export default SearchComponent;
