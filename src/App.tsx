import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import CustomKits from './pages/CustomKits';
import Support from './pages/Support';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/custom-kits" element={<CustomKits />} />
            <Route path="/support" element={<Support />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
