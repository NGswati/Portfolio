import React, {useRef} from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    const nav = document.getElementById('nav');
    if (nav.classList.contains('nav-active')) {
      nav.classList.remove('nav-active');
    } else {
      nav.classList.add('nav-active');
    }
  }

  render() {
    return (
      <div className="navbar">
        <div className="nav-toggle" onClick={this.toggleNav}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
        <div className="nav-options" id="nav">
          <div className="overlay" onClick={this.toggleNav}></div>
          <div className="nav-content">
            <Link to="/" onClick={this.toggleNav}>Home</Link>
            <Link to="/about" onClick={this.toggleNav}>About</Link>
            <Link to="/projects" onClick={this.toggleNav}>Projects</Link>
            <Link to="/experience" onClick={this.toggleNav}>Experience</Link>
            <Link to="/research" onClick={this.toggleNav}>Research</Link>
            <Link to="/contact" onClick={this.toggleNav}>Contact</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
