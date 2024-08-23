import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';

import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage/LandingPage';
import About from './pages/About';

import NotFound from './pages/NotFound';
import Home from './pages/Home';
import WriteBlog from './pages/WriteBlog';
import FullArticle from './components/FullArticle';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyles />
        <Header />
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/write-blog" element={<WriteBlog />} />
            <Route path="/post/:id" element={<FullArticle />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
