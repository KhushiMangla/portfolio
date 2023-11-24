import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Work from './components/Work';
import SingleWork from './components/SingleWork';
import Error from './components/Error';
import About from './components/About';
import Header from './components/Header';
import Footer from './components/Footer';
import Cursor from './components/Cursor'; // Import the Cursor component


function App() {
  const restBase = 'https://khushimangla.com/portfolio/wp-json/wp/v2/';

  return (
    <Router>
      <Header />
      <Cursor /> {/* Include the Cursor component */}
      <main id="main">
        <Routes>
          <Route path='/' element={<Home restBase={restBase} />} />
          <Route path='/about' element={<About restBase={restBase} />} />
          <Route path='/work' element={<Work restBase={restBase} />} />
          <Route path='/work/:slug' element={<SingleWork restBase={restBase} />} />
          <Route path="*" element={< Error restBase={restBase} />} />
        </Routes>
      </main>
      <Footer restBase={restBase} />
    </Router>
  );
}

export default App;
