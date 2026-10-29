import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import Login from './Login';
import Signup from './Signup';
import { useAuth } from '../context/AuthContext';

// Header, fixed for every page: one row on desktop, search below on mobile.
// Previously: the cat logo was illegible at 56px, home showed Sign Up but
// no Log In, the search box was a loose flex item, and the search focus
// style wrongly set position: sticky.
const HeaderWrapper = styled.header`
  background: ${({ theme }) => theme.colors.headerBg};
  border-bottom: 1px solid #2a2a2a;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.8rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  min-width: 0;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-wrap: wrap;

  a {
    color: ${({ theme }) => theme.colors.headerText};
    font-weight: 600;
    text-decoration: none;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    transition: color 0.2s ease, background-color 0.2s ease;

    &:hover {
      color: #fbbf24;
      background-color: #222222;
    }
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
  flex-wrap: wrap;

  @media (max-width: 700px) {
    margin-left: 0;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  padding: 0.55rem 0.9rem;
  font-size: 0.95rem;
  border: 1px solid #444444;
  border-radius: 999px;
  background: #222222;
  color: ${({ theme }) => theme.colors.headerText};
  outline: none;
  width: 180px;
  transition: border-color 0.2s ease, width 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    width: 220px;
  }

  @media (max-width: 700px) {
    width: 100%;
    &:focus { width: 100%; }
  }
`;

const TextButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.headerText};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: color 0.2s ease, background-color 0.2s ease;

  &:hover {
    color: #fbbf24;
    background-color: #222222;
  }
`;

const AccentButton = styled.button`
  background-color: ${({ theme }) => theme.colors.accent};
  color: #ffffff;
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: 999px;
  padding: 0.5rem 1.1rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background-color: #92400e;
    border-color: #92400e;
  }
`;

const Header = () => {
  const [query, setQuery] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/about') {
      setQuery('');
    }
  }, [location]);

  const toggleLogin = () => { setShowLogin(true); setShowSignup(false); };
  const toggleSignup = () => { setShowSignup(true); setShowLogin(false); };
  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <>
      <HeaderWrapper>
        <HeaderInner>
          <LogoLink to="/" aria-label="InkWave home">
            <Logo height={38} />
          </LogoLink>
          <Nav aria-label="Main">
            <Link to="/">Home</Link>
            <Link to="/home">All articles</Link>
            <Link to="/about">About</Link>
            <Link to="/write-blog">Write</Link>
          </Nav>
          <HeaderActions>
            <SearchInput
              type="search"
              aria-label="Search posts"
              placeholder="Search articles…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            {isAuthenticated ? (
              <AccentButton onClick={handleLogout}>Log Out</AccentButton>
            ) : (
              <>
                <TextButton onClick={toggleLogin}>Log In</TextButton>
                <AccentButton onClick={toggleSignup}>Sign Up</AccentButton>
              </>
            )}
          </HeaderActions>
        </HeaderInner>
      </HeaderWrapper>
      {showLogin && <Login onClose={() => setShowLogin(false)} toggleForm={toggleSignup} />}
      {showSignup && <Signup onClose={() => setShowSignup(false)} toggleForm={toggleLogin} />}
    </>
  );
};

export default Header;
