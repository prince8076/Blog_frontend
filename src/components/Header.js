import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

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

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <HeaderWrapper>
      <Logo>My Blog</Logo>
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
