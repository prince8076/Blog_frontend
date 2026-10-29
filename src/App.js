import React, { Suspense, lazy } from 'react';
import { LoadingState } from './components/LoadingState';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';

import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage/LandingPage';
import About from './pages/About';
import Privacy from './pages/Privacy';

import NotFound from './pages/NotFound';
import Home from './pages/Home';
import FullArticle from './components/FullArticle';
// import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

const WriteBlog = lazy(() => import('./pages/WriteBlog'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const SearchResults = lazy(() => import('./components/SearchResults'));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <GlobalStyles />
          <Header />
          <div className="App">
            <Suspense fallback={<LoadingState label="Loading page…" />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/post/:id" element={<FullArticle />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/write-blog" element={<WriteBlog />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </div>
          <Footer />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
