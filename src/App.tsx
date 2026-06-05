import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout        from './components/Layout';
import Home          from './pages/Home';
import About         from './pages/About';
import Services      from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Process       from './pages/Process';
import Blog          from './pages/Blog';
import BlogPost      from './pages/BlogPost';
import Contact       from './pages/Contact';
import NotFound      from './pages/NotFound';
import './pages/pages.css';
import './components/Button.css';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/"             element={<Home />}          />
          <Route path="/about"        element={<About />}         />
          <Route path="/services"     element={<Services />}      />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/process"      element={<Process />}       />
          <Route path="/blog"         element={<Blog />}          />
          <Route path="/blog/:slug"   element={<BlogPost />}      />
          <Route path="/contact"      element={<Contact />}       />
          <Route path="*"             element={<NotFound />}      />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
