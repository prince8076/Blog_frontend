import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFoundSection = styled.section`
  max-width: 720px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  text-align: center;
`;

const Code = styled.p`
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 4rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: #b45309;
`;

const Title = styled.h1`
  font-family: Georgia, 'Times New Roman', serif;
  margin: 0 0 0.75rem;
`;

const Body = styled.p`
  color: #666666;
  margin: 0 0 2rem;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;

const PrimaryLink = styled(Link)`
  display: inline-block;
  padding: 12px 24px;
  background-color: #b45309;
  color: #ffffff;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 700;
`;

const SecondaryLink = styled(Link)`
  display: inline-block;
  padding: 12px 24px;
  border: 2px solid #1a1a1a;
  color: #1a1a1a;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 700;
`;

const NotFound = () => (
  <NotFoundSection>
    <Code>404</Code>
    <Title>Page not found</Title>
    <Body>The page you’re looking for doesn’t exist, or it moved.</Body>
    <ActionRow>
      <PrimaryLink to="/">Go home</PrimaryLink>
      <SecondaryLink to="/home">All articles</SecondaryLink>
    </ActionRow>
  </NotFoundSection>
);

export default NotFound;
