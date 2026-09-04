import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './ScrollToTop.jsx';
import BlogList from './BlogList.jsx';
import BlogDetail from './BlogDetail.jsx';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
