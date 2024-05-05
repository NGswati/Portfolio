import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Intro from './components/intro';
import App from './components/app';
import School from './components/school';
// import Experience from './pages/Experience';
// import Research from './pages/Research';
// import Contact from './pages/Contact';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/Portfolio/" element={<Intro />} />
                <Route path="/app" element={<App />} />
                <Route path="/school" element={<School />} />
                {/* <Route path="/experience" element={<Experience />} />
                <Route path="/research" element={<Research />} />
                <Route path="/contact" element={<Contact />} /> */}
            </Routes>
        </Router>
    );
}

export default Main;
