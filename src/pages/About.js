import React from 'react';
import styled from 'styled-components';

const AboutSection = styled.section`
  padding: 2rem;
  text-align: center;
`;

const About = () => (
    <AboutSection>
        <h2>About InkWave</h2>
        <p>
            InkWave is a blog about technology, travel, and lifestyle —
            practical development notes, travel stories, and ideas worth reading.
        </p>
    </AboutSection>
);

export default About;
