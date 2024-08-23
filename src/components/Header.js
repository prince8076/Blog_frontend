import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LogoImage from '../aseets/images/new_logo.png';
import Login from './Login';
import Signup from './Signup';


const HeaderWrapper = styled.header`
  background: ${({ theme }) => theme.colors.primary};
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 80px;
  width: auto;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  a {
    margin-left: 1rem;
    color: ${({ theme }) => theme.colors.text};
    font-weight: bold;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }

  button {
    margin-left: 1rem;
    background: none;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  margin-left: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.mutedText};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background};
  }
`;

const Header = () => {
  const [query, setQuery] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
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

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/about') {
      setQuery('');
    }
  }, [location]);

  const toggleLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const toggleSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  return (
    <>
      <HeaderWrapper>
        <LogoLink to="/">
          <Logo src={LogoImage} alt="Logo" />
        </LogoLink>
        <Nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          {location.pathname === '/' ? (
            <Button onClick={toggleSignup}>Sign Up</Button>
          ) : (
            <>
              <Button onClick={toggleLogin}>Log In</Button>
              <Button onClick={toggleSignup}>Sign Up</Button>
            </>
          )}
        </Nav>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </HeaderWrapper>
      {showLogin && <Login onClose={() => setShowLogin(false)} toggleForm={toggleSignup} />}
      {showSignup && <Signup onClose={() => setShowSignup(false)} toggleForm={toggleLogin} />}
    </>
  );
};

export default Header;