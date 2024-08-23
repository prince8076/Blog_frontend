import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled components
const HeaderWrapper = styled.header`
  background: ${({ theme }) => theme.colors.primary};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Nav = styled.nav`
  a {
    margin-left: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
    font-weight: bold;
    text-decoration: none; /* Ensure links are not underlined */
    
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

// Header component
const Header = () => (
    <HeaderWrapper>
        <Logo>My Blog</Logo>
        <Nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
        </Nav>
    </HeaderWrapper>
);

export default Header;
