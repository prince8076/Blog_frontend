import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FeaturedPosts = ({ posts = [] }) => {
  if (!Array.isArray(posts)) {
    return <p>No posts available.</p>;
  }

  return (
    <div className="featured-posts">
      <h2>Featured Posts</h2>
      <div className="posts-list">
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post._id} className="post-card">
              <Link to={`/post/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={post.image} alt={post.title} className="post-image" />
                <div className="post-content">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>


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
          background-color: #1a1a1a;
          color: #e0e0e0;
          padding: 2rem;
        }

        .posts-list {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .post-card {
          background-color: #2a2a2a;
          border: 1px solid #333;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          width: 300px;
          text-align: center; /* Center text within the post card */
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
          color: #e0e0e0;
          font-size: 1.2rem;
          margin: 0;
        }

        .post-card p {
          color: #bbb;
          font-size: 1rem;
          margin: 0; /* Remove default margin */
        }
      `}</style>
    </div>
  );
};


FeaturedPosts.propTypes = {
  posts: PropTypes.array.isRequired
};

export default FeaturedPosts;
