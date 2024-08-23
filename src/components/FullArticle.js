import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FullArticle = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/posts/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                const data = await response.json();
                setPost(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!post) {
        return <p>Post not found.</p>;
    }

    return (
        <div className="full-article">
            <h1>{post.title}</h1>
            <img src={post.image} alt={post.title} className="article-image" />
            <p>{post.excerpt}</p>

            <style jsx>{`
                .full-article {
                    background-color: #1a1a1a;
                    color: #e0e0e0;
                    padding: 2rem;
                    max-width: 800px;
                    margin: auto;
                }

                .article-image {
                    width: 100%;
                    height: auto;
                    margin: 1rem 0;
                }

                h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #ff0000; /* bright red */
}

                p {
                    font-size: 1.2rem;
                    line-height: 1.6;
                    color: #bbb;
                }
            `}</style>
        </div>
    );
};

export default FullArticle;
