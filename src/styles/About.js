import ProfileImg from './assets/profile.jpg';

export default function About() {
  return (
    <>
      <div className="content">
        <h1>About Me</h1>

        <img src={ProfileImg} className="profile"/>

        <p>
          I'm a B.Tech student at IIIT Guwahati class of 2025. I have experience building web apps with React, Node.js, and other tools.
        </p>

        <h3>Skills</h3>
        <p>
          JavaScript (React, Node.js) / Python (NumPy, Pandas) / C++ / MySQL
        </p>   
      </div>
    </>
  );
}
