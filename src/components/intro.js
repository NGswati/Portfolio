import React, { useEffect } from 'react';
import '../styles/intro.css';
import { useNavigate } from 'react-router-dom';



const Intro = () => {
    
    const navigate = useNavigate();

    // Define collapsePage outside of useEffect
    const collapsePage = () => {
        const showcase = document.getElementById('display');
        

        if (showcase) {
            showcase.classList.add('collapse');

            setTimeout(() => {
                showcase.classList.add('expand');
            }, 4000);

            setTimeout(() => {
                navigate('/app');
            }, 5500);
        }
        
        const boxes = document.querySelectorAll('.box');
        const footer = document.querySelector('footer');

        boxes.forEach(box => {
            box.classList.add('fadeout');
        });

        if (footer) {
            footer.classList.add('fadeout');
        }
    };

    useEffect(() => {
        // Trigger collapsePage after 8000 milliseconds (8 seconds)
        setTimeout(() => {
            collapsePage();
        }, 40000);
    }, []);

    function showError() {
        alert("Error! Item confidential.");
    }

    function showdir() {
        alert("Not here! Click somewhere else.");
    }

    return (
        <div id="display">
            <section id="showcase">
                <div className="container">
                    <h1 onClick={collapsePage} id="h">Welcome to O-rang</h1>
                    <h1>Hello, I'm Swati</h1>
                    <h2><strong>A passionate developer and tech enthusiast</strong></h2>
                    <h2><i>Let's dive deep into ..</i></h2>
                </div>
            </section>
            <div className="container content">
                <div className="box" onClick={showError}>
                    <h2>About Me</h2>
                    <img src="https://source.unsplash.com/random/200x200" alt="About Me" />
                    <p>Student at Indian Institute of Information Technology Guwahati pursuing Bachelor of Technology in CSE Department</p>
                </div>
                <div className="box" onClick={showError}>
                    <h2>My Projects</h2>
                    <img src="https://source.unsplash.com/random/200x200?tech" alt="Projects" />
                    <p>Curabitur ac lacus arcu. Sed vehicula varius lectus auctor viverra. Nulla vehicula nibh vel ante commodo feugiat.</p>
                </div>
                <div className="box" onClick={showdir}>
                    <h2>Contact Me</h2>
                    <img src="https://source.unsplash.com/random/200x200?contact" alt="Contact" />
                    <p>Feel free to reach out to me via email at stswatiar@example.com or follow me on social media.</p>
                </div>
            </div>
            <footer>
                <p>Copyright &copy; 2023 swati_iiitg</p>
            </footer>
        </div>
    );
}

export default Intro;
