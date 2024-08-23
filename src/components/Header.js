import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LogoImage from '../aseets/images/new_logo.png';

const HeaderWrapper = styled.header`
  background: ${({ theme }) => theme.colors.primary};
  padding: 1rem 2rem;
  display: flex;
  align-items: center; /* Center items vertically */
  justify-content: space-between;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 80px; /* Adjust height as needed */
  width: auto;  /* Keeps the aspect ratio */
`;

const Nav = styled.nav`
  display: flex;
  align-items: center; 
  
  a {
    margin-left: 2rem; 
    color: ${({ theme }) => theme.colors.text};
    font-weight: bold;
    text-decoration: none;
    
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  margin-left: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const Header = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?query=${query}`);
    }
  };

  // Reset search input when navigating to Home or About
  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/about') {
      setQuery('');
    }
  }, [location]);

  return (
    <HeaderWrapper>
      <LogoLink to="/">
        <Logo src={LogoImage} alt="Logo" />
      </LogoLink>
      <Nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </Nav>
      <SearchInput
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
    </HeaderWrapper>
  );
};

export default Header;
