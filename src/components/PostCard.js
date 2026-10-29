import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { optimizeImage, readingTime } from '../api';

// Editorial card: white surface on paper, serif title, one meta line
// (reading time, derived from the excerpt), lazy optimized image.
const FeaturedPosts = ({ posts = [], title = 'Latest articles' }) => {
  if (!Array.isArray(posts)) {
    return <p>No posts available.</p>;
  }

  return (
    <FeaturedPostsWrapper>
      <h2>{title}</h2>
      <PostsList>
        {posts.length > 0 ? (
          posts.map(post => (
            <PostCard key={post._id}>
              <Link to={`/post/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {post.image && (
                  <PostImage
                    src={optimizeImage(post.image, 800)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="450"
                  />
                )}
                <PostContent>
                  <PostTitle>{post.title}</PostTitle>
                  <PostMeta>{readingTime(post.excerpt)}</PostMeta>
                  <PostExcerpt>{post.excerpt}</PostExcerpt>
                  <ReadMore>Read article</ReadMore>
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
  posts: PropTypes.array.isRequired,
  title: PropTypes.string
};

const FeaturedPostsWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.paper};
  color: ${({ theme }) => theme.colors.text};
  padding: 2rem 1rem;
  max-width: 1120px;
  margin: 0 auto;
  min-width: 0;
`;

const PostsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
  gap: 1.5rem;
`;

const PostCard = styled.article`
  background-color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  min-width: 0;
  text-align: left;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.10);
  }
`;

const PostImage = styled.img`
  height: auto;
  aspect-ratio: 8 / 5;
  object-fit: cover;
  width: 100%;
  display: block;
`;

const PostContent = styled.div`
  padding: 1.2rem;
`;

const PostTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.35rem;
  line-height: 1.25;
  font-weight: 700;
  margin: 0 0 0.4rem;
  overflow-wrap: break-word;
  min-width: 0;
`;

const PostMeta = styled.p`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: ${({ theme }) => theme.font.size.small};
  margin: 0 0 0.6rem;
`;

const PostExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: ${({ theme }) => theme.font.size.small};
  margin: 0 0 0.8rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ReadMore = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
  font-size: ${({ theme }) => theme.font.size.small};
`;

export default FeaturedPosts;
