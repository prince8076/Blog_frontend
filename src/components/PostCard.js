import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FeaturedPosts = ({ posts = [] }) => {
  if (!Array.isArray(posts)) {
    return <p>No posts available.</p>;
  }

  return (
    <FeaturedPostsWrapper>
      <h2>Featured Posts</h2>
      <PostsList>
        {posts.length > 0 ? (
          posts.map(post => (
            <PostCard key={post._id}>
              <Link to={`/post/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <PostImage src={post.image} alt={post.title} />
                <PostContent>
                  <PostTitle>{post.title}</PostTitle>
                  <PostExcerpt>{post.excerpt}</PostExcerpt>
                </PostContent>
              </Link>
            </PostCard>
          ))
        ) : (
          <p>No posts to display.</p>
        )}
      </PostsList>
    </FeaturedPostsWrapper>
  );
};

FeaturedPosts.propTypes = {
  posts: PropTypes.array.isRequired
};

const FeaturedPostsWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  padding: 2rem;
`;

const PostsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem; /* Increased gap for better spacing */
`;

const PostCard = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  width: 300px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.6);
  }
`;

const PostImage = styled.img`
  height: 200px;
  object-fit: cover;
  width: 100%;
`;

const PostContent = styled.div`
  padding: 1rem;
`;

const PostTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.font.size.medium};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin: 0;
`;

const PostExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: ${({ theme }) => theme.font.size.small};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limits to 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default FeaturedPosts;