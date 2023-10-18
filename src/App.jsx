import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Home from './components/Home'
import Work from './components/Work'
import Contact from './components/Contact'
import About from './components/About'

function App() {
  
  const restBase = 'http://localhost:8888/portfolio/server/wp-json/wp/v2/'
  

  return (
    <Router>
      <header id="masthead" className="site-header">
        <div className="site-branding">
          <p className="site-title">Khushi's Portfolio App</p>
        </div>
        <nav className="site-navigation">
          <ul>
            <li><NavLink to='/' end>Home</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
            <li><NavLink to='/work'>Work</NavLink></li>
            <li><NavLink to='/contact'>Contact</NavLink></li>
          </ul>
        </nav>
      </header>
      <main id="main">
        <Routes>
          <Route path='/' element={<Home restBase={restBase} />} />
          <Route path='/about' element={<About restBase={restBase} />} />
          <Route path='/work' element={<Work restBase={restBase} />} />
          <Route path='/contact' element={<Contact restBase={restBase} />} />
        </Routes>
      </main>
      <footer>
        <p className="copyright">Created by <a href="https://Khushimangla.com/" target="_blank" rel="noopener noreferrer">Khushi</a>.</p>
      </footer>
    </Router>
  )
}

export default App
