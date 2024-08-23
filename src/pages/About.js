import React from 'react';
import styled from 'styled-components';

const AboutSection = styled.section`
  padding: 2rem;
  text-align: center;
`;

const About = () => (
    <AboutSection>
        <h2>About Me</h2>
        <p>
            I’m a passionate developer and blogger. I write about technology,
            development tips, and personal experiences.
        </p>
    </AboutSection>
);

export default About;
