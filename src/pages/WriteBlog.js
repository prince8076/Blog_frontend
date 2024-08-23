import React, { useState } from 'react';
import axios from 'axios';

const WriteBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            title,
            excerpt: content,
            image
        };

        try {
            const response = await axios.post('http://localhost:5000/api/posts', newPost);
            console.log('Response:', response);
            alert('Blog post created successfully!');
            setTitle('');
            setContent('');
            setImage('');
        } catch (error) {
            console.error('Error creating blog post:', error);
            alert('Failed to create blog post. Please try again.');
        }
    };

    return (
        <div className="write-blog-page">
            <h2>Write a New Blog Post</h2>
            <form className="write-blog-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input
                        type="text"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit-button">Post Blog</button>
            </form>

            <style jsx>{`
                .write-blog-page {
                    max-width: 600px;
                    margin: 2rem auto;
                    padding: 2rem;
                    background-color: #1e1e1e;
                    border-radius: 10px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
                    color: #e0e0e0;
                    font-family: 'Poppins', sans-serif;
                }

                h2 {
                    text-align: center;
                    margin-bottom: 2rem;
                    color: #ffffff;
                    font-size: 1.8rem;
                    font-weight: 500;
                }

                .write-blog-form {
                    display: flex;
                    flex-direction: column;
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    color: #9e9e9e;
                }

                .form-group input,
                .form-group textarea {
                    width: 100%;
                    padding: 0.9rem;
                    font-size: 1rem;
                    border-radius: 5px;
                    border: 1px solid #444;
                    background-color: #2a2a2a;
                    color: #e0e0e0;
                }

                .form-group textarea {
                    height: 180px;
                    resize: vertical;
                }

                .submit-button {
                    padding: 0.9rem 1.5rem;
                    background-color: #6200ea;
                    color: #ffffff;
                    border: none;
                    border-radius: 5px;
                    font-size: 1rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                }

                .submit-button:hover {
                    background-color: #3700b3;
                    transform: scale(1.05);
                }
            `}</style>
        </div>
    );
};

export default WriteBlog;
