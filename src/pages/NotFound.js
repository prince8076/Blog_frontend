import React from 'react';
import styled from 'styled-components';

const NotFoundSection = styled.section`
  padding: 2rem;
  text-align: center;
`;

const NotFound = () => (
    <NotFoundSection>
        <h2>404 - Page Not Found</h2>
        <p>The page you’re looking for doesn’t exist.</p>
    </NotFoundSection>
);

export default NotFound;
