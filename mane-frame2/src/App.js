import logo from './logo.png';
import './App.scss';
import Homepage from './pages/Homepage';
import { Link, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <header>
      <nav className="navbar navbar-expand-sm navbar-toggleable-sm mb-3" id="top">
            <div className="container-fluid">
                <Link className="navbar-brand" to={"/"} ><img src={logo} alt='text' /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul className="navbar-nav flex-grow-1">
                        <li className="nav-item">
                            <a className="nav-link">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" >About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" >Services</a>
                        </li>
                    </ul>
                </div>
                <a className="nav-link" >Sign Up</a>
                <a className="nav-link" >Login</a>
            </div>
        </nav>
    </header>
    <Routes>
        {/* <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route> */}
        <Route path="/" element={<Homepage />} />
      </Routes>
      
    </div>
  );
}

export default App;
