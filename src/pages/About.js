import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AboutSection = styled.section`
  max-width: 720px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  min-width: 0;
`;

const Title = styled.h1`
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.15;
  margin: 0 0 1rem;
  overflow-wrap: break-word;
`;

const Body = styled.p`
  color: #444444;
  font-size: 1.1rem;
  line-height: 1.8;
  margin: 0 0 1rem;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 2rem;
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

const About = () => (
  <AboutSection>
    <Title>About InkWave</Title>
    <Body>
      InkWave is a blog about technology, travel, and lifestyle — practical
      development notes, travel stories, and ideas worth reading.
    </Body>
    <Body>
      You can read the latest articles on the home page, search for a topic
      from the header, open any article for the full read, or publish one
      of your own from the Write page.
    </Body>
    <ActionRow>
      <PrimaryLink to="/">Start reading</PrimaryLink>
      <SecondaryLink to="/write-blog">Write a blog</SecondaryLink>
    </ActionRow>
  </AboutSection>
);

export default About;
