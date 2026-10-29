import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Privacy policy, kept to what the site actually does. No analytics
// service is currently used, so none is claimed. AdSense wording applies
// only once an AdSense publisher ID is configured (see AdSlot.js); until
// then no third-party ad cookies are set by this site.
const Section = styled.section`
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

const Heading = styled.h2`
  font-family: Georgia, 'Times New Roman', serif;
  margin: 2rem 0 0.5rem;
`;

const Body = styled.p`
  color: #444444;
  line-height: 1.8;
  margin: 0 0 1rem;
`;

const Privacy = () => (
  <Section>
    <Title>Privacy Policy</Title>
    <Body>
      InkWave Blog is a reading and publishing site for technology, travel,
      and lifestyle articles. This policy describes what the site stores in
      your browser and what it does not collect.
    </Body>
    <Heading>What the site stores</Heading>
    <Body>
      When you log in, the site stores a login token in your browser's
      local storage so you stay signed in. When you read articles, it
      stores a copy of recently fetched articles in local storage so the
      next visit paints instantly while the backend wakes up. You can
      clear both at any time from your browser's site-data settings;
      clearing the token signs you out.
    </Body>
    <Heading>What the site does not collect</Heading>
    <Body>
      The site does not run its own analytics, does not sell personal
      data, and does not ask for payment details. Articles you publish
      through the Write page are stored on the site's backend and shown
      publicly, as a blog post is meant to be.
    </Body>
    <Heading>Advertising</Heading>
    <Body>
      The site may show Google AdSense advertisements once an AdSense
      account is approved and configured. When ads are active, Google
      and its partners may use cookies to serve ads based on your visits
      to this and other sites. You can opt out of personalised
      advertising from Google in your Google Ads Settings. Until ads are
      configured, no third-party advertising cookies are set by this site.
    </Body>
    <Heading>Changes</Heading>
    <Body>
      If this policy changes, the updated version will be published on
      this page. The footer of every page links here.
    </Body>
    <p>
      <Link to="/">← Back to articles</Link>
    </p>
  </Section>
);

export default Privacy;
