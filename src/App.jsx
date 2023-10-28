import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Work from './components/Work';
import SingleWork from './components/SingleWork';
import Contact from './components/Contact';
import About from './components/About';
import Header from './components/Header';
import Cursor from './components/Cursor'; // Import the Cursor component

function App() {
  const restBase = 'http://localhost:8888/portfolio/server/wp-json/wp/v2/';

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
          <Route path='/contact' element={<Contact restBase={restBase} />} />
        </Routes>
      </main>
      <footer>
        <p className="copyright">
          Created by <a href="https://Khushimangla.com/" target="_blank" rel="noopener noreferrer">Khushi</a>.
        </p>
      </footer>
    </Router>
  );
}

export default App;
