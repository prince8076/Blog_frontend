import React from 'react';
import { API_BASE } from '../api';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchComponent = ({ query }) => {
    const [posts, setPosts] = React.useState([]);
    const [filteredResults, setFilteredResults] = React.useState([]);

    React.useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${API_BASE}/api/posts`);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    React.useEffect(() => {
        if (query.length > 0) {
            const filteredData = posts.filter((post) =>
                post.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(posts);
        }
    }, [query, posts]);

    return (
        <div className="featured-posts">
            <div className="posts-list">
                {filteredResults.length > 0 ? (
                    filteredResults.map(post => (
                        <div key={post._id} className="post-card">
                            <Link to={`/post/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <img src={post.image} alt={post.title} className="post-image" />
                                <div className="post-content">
                                    <h3>{post.title}</h3>
                                    <p className="post-excerpt">{post.excerpt}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No posts to display.</p>
                )}
            </div>

            <style jsx>{`
                .featured-posts {
                    background-color: #faf9f6;
                    color: #1a1a1a;
                    padding: 2rem;
                }

                .posts-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .post-card {
                    background-color: #ffffff;
                    border: 1px solid #e7e2d9;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
                    overflow: hidden;
                    width: 300px;
                    text-align: center;
                }

                .post-image {
                    height: 200px;
                    object-fit: cover;
                    width: 100%;
                }

                .post-content {
                    padding: 1rem;
                }

                .post-card h3 {
                    color: #1a1a1a;
                    font-size: 1.2rem;
                    margin: 1rem;
                }

                .post-excerpt {
                    color: #666666;
                    font-size: 1rem;
                    margin: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            `}</style>
        </div>
    );
};

SearchComponent.propTypes = {
    query: PropTypes.string.isRequired,
};

const SearchResults = () => {
    const query = useQuery().get('query') || '';

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ color: '#1a1a1a' }}>Search Results for: "{query}"</h1>
            <SearchComponent query={query} />
        </div>
    );
};

export default SearchResults;
