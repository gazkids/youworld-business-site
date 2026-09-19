import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './blog/ScrollToTop.jsx';
import Home from './Home.jsx';
import BlogList from './blog/BlogList.jsx';
import BlogDetail from './blog/BlogDetail.jsx';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
