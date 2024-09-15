import  { useEffect,useState, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { useNavigate } from 'react-router-dom';

const ThreeScene = () => {
  const navigate = useNavigate();

  const [noteText, setNoteText] = useState('');
  const [showNote, setShowNote] = useState(false);

  const scene = useRef(null);
  const camera = useRef(null);
  const renderer = useRef(null);
  const cube = useRef(null);
  const controls = useRef(null);
  const notesDiv = useRef(null);
  
//Added checkpoints and constants
  const checkpoints = [0, 5, 8, 12, 30, 33];
  const notes = [
    "Checkpoint 1: Move the right arrow key!",
    "1", "2", "3",
    "Checkpoint 2: Done Schooling from kendriya vidyalaya Sangathan, with lots of happy memories and Friends!",
    "Click to Enter in the school!"
  ];

  let checkpointIndex = 0;
  let xMovement = 0;
  const xdistance = 3;
 
  const textMeshes = [];
  const schools = [];
  const logos = [];

  
  useEffect(() => {
    const initScene = () => {
      scene.current = new THREE.Scene();
      camera.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer.current = new THREE.WebGLRenderer();
      renderer.current.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.current.domElement);

      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      cube.current = new THREE.Mesh(geometry, material);
      scene.current.add(cube.current);
      
  //Control 3D and camera angle
      controls.current = new OrbitControls(camera.current, renderer.current.domElement);
      controls.current.enableDamping = true;
      controls.current.dampingFactor = 0.25;
      controls.current.screenSpacePanning = false;
      controls.current.maxPolarAngle = Math.PI / 2;

      camera.current.position.z = 5;

      document.addEventListener('mousedown', onDocumentMouseDown, false);
      document.addEventListener('keydown', onKeyDown);
    
      //define Animates 
      createText();
      createSchools();
      createSun();
    };

    const animate = () => {
      if (!scene.current || !camera.current || !renderer.current) {
        return;
      }

      const animationId = requestAnimationFrame(animate);

      if (controls.current) {
        controls.current.update();
      }

      if (cube.current) {
        cube.current.rotation.z += 0.0005;
        cube.current.rotation.y += 0.01;
      }

      renderer.current.render(scene.current, camera.current);

      return () => {
        cancelAnimationFrame(animationId);
      };
    };

    const onKeyDown = (event) => {
      if (event.code === 'ArrowRight') {
        xMovement += 3;
        handleArrowRight();
      } else if (event.code === 'ArrowLeft') {
        xMovement -= 3;
        handleArrowLeft();
      }
    };
    
    const displayNote = (text) => {
      setNoteText(text);
      setShowNote(true);
      setTimeout(() => setShowNote(false), 2000);
    };
//movement checks and updates
    const handleArrowRight = () => {
      if (cube.current) {
        cube.current.scale.x = 1 + Math.sin(xMovement) * 0.1;
        cube.current.scale.y = 1 + Math.cos(xMovement) * 0.1;
        cube.current.scale.z = 1 + Math.sin(xMovement) * 0.1;
      }

      moveBackgroundElements(-xdistance);


      if (checkpointIndex < checkpoints.length && xMovement >= checkpoints[checkpointIndex]) {
        displayNote(notes[checkpointIndex]);
        checkpointIndex++;
      }
    };

    const handleArrowLeft = () => {
      if (cube.current) {
        cube.current.scale.x = 1 + Math.sin(xMovement) * 0.1;
        cube.current.scale.y = 1 + Math.cos(xMovement) * 0.1;
        cube.current.scale.z = 1 + Math.sin(xMovement) * 0.1;
      }

      moveBackgroundElements(xdistance);


      if (checkpointIndex > 0 && xMovement < checkpoints[checkpointIndex - 1] && checkpointIndex > 4) {
        displayNote(notes[checkpointIndex]);
        checkpointIndex--;
      }
    };

    const moveBackgroundElements = (distance) => {
      textMeshes.forEach(textMesh => {
        textMesh.position.x += distance;
      });
      schools.forEach(school => {
        school.position.x += distance;
      });

      logos.forEach(logo=>{
        logo.position.x +=distance;
      })
    };
    
//Alert and orientation handler
    const onDocumentMouseDown = (event) => {
      event.preventDefault();

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera.current);

      const intersects = raycaster.intersectObjects(textMeshes);
      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        if (intersectedObject.userData.url) {
          navigate(intersectedObject.userData.url);
        }
        else{
          alert('Slide');
        }
      }
    };
//size handler
    const handleResize = () => {
      if (camera.current && renderer.current) {
        camera.current.aspect = window.innerWidth / window.innerHeight;
        camera.current.updateProjectionMatrix();
        renderer.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    initScene();
    const cleanupAnimation = animate();

    window.addEventListener('resize', handleResize);

    return () => {
      if (cleanupAnimation) {
        cleanupAnimation();
      }
      if (controls.current) {
        controls.current.dispose();
      }
      if (renderer.current) {
        renderer.current.dispose();
      }
      if (scene.current) {
        scene.current.clear();
      }
      if (renderer.current && renderer.current.domElement) {
        document.body.removeChild(renderer.current.domElement);
      }
      if (notesDiv.current) {
        document.body.removeChild(notesDiv.current);
      }
      document.removeEventListener('mousedown', onDocumentMouseDown);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to create text labels
  const createText = () => {
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
      const createTextMesh = (text, x, y, z, size, color,url) => {
        const textGeometry = new TextGeometry(text, {
          font: font,
          size: size,
          height: 0.1,
          curveSegments: 2,
          bevelEnabled: false
        });
        const textMaterial = new THREE.MeshBasicMaterial({ color: color });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(x, y, z);
        textMesh.userData.url = url;
        scene.current.add(textMesh);
        textMeshes.push(textMesh);
      };

      // Example text labels
      createTextMesh('Welcome to O-rang', -6, 5, -5, 1, 0xffffff);
      createTextMesh("Hello, I'm Swati", -4.3, 2, -5, 1, 0xffffff);
      createTextMesh('A passionate developer and tech enthusiast', -6.4, -3, -5, 0.5, 0xffffff);
      createTextMesh('Let\'s move forward . . .', -3, -4.2, -5, 0.5, 0xffffff);
      createTextMesh("Kendriya Vidyalaya Gorakhpur",  30, -3, -5,  .5, 0x7B0000, "/school");
    });
  };

  // Function to create schools/buildings
  const createSchools = () => {
    function createSchool(x, y, z) {
      // Function to create a building
      function createBuilding(xOffset, yOffset, zOffset) {
        const building = new THREE.Group();

        // Create the walls
        const wallGeometry = new THREE.BoxGeometry(5, 5, 1.5);
        const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White color
        const walls = new THREE.Mesh(wallGeometry, wallMaterial);
        walls.position.set(xOffset, yOffset, zOffset);

        // Create windows
        const windowGeometry = new THREE.BoxGeometry(0.5, 0.7, 0.1);
        const windowMaterial = new THREE.MeshBasicMaterial({ color: 0x444444 });
        const windows = [
          { x: -1, y: 0.8, z: 1.01 },
          { x: 0, y: 0.8, z: 1.01 },
          { x: 1, y: 0.8, z: 1.01 },
          { x: -1, y: -1, z: 1.01 },
          { x: 0, y: -1, z: 1.01 },
          { x: 1, y: -1, z: 1.01 },
          { x: -2, y: 0.8, z: 1.01 },
          { x: -2, y: -1, z: 1.01 },
          { x: 2, y: 0.8, z: 1.01 },
          { x: 2, y: -1, z: 1.01 },
        ];

        windows.forEach((pos) => {
          const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
          windowMesh.position.set(xOffset + pos.x, yOffset + pos.y, zOffset + pos.z);
          building.add(windowMesh);
        });

        // Create horizontal strips
        const stripGeometry = new THREE.BoxGeometry(5, 0.3, 1.8);
        const stripMaterial = new THREE.MeshBasicMaterial({ color: 0x04192 });

        const strip1 = new THREE.Mesh(stripGeometry, stripMaterial);
        strip1.position.set(xOffset, yOffset + 1.5, zOffset);

        const strip2 = new THREE.Mesh(stripGeometry, stripMaterial);
        strip2.position.set(xOffset, yOffset - 0.2, zOffset);

        // Add components to the building group
        building.add(walls);
        building.add(strip1);
        building.add(strip2);

        return building;
      }

      // Create two buildings
      const building1 = createBuilding(x, y, z);
      const building2 = createBuilding(x , y +1 , z*2);

      // Add the buildings to the scene
      scene.current.add(building1);
      scene.current.add(building2);

      schools.push(building1, building2);
    }

    // Example position
    createSchool(25, -3, -5);
  };

  // Function to create the sun
  const createSun = () => {
    function createSun(x,y,z){
      const sunGroup = new THREE.Group();

      // Create the sun (half circle)
      const sunGeometry = new THREE.CircleGeometry(1, 32, 0, Math.PI);
      const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 }); // Yellow color
      const sun = new THREE.Mesh(sunGeometry, sunMaterial);
      sun.position.set(x,y,z);
      sunGroup.add(sun);

      // Create rays
      const rayMaterial = new THREE.LineBasicMaterial({ color: 0xd34000 }); // Yellow color
      for (let i = 0; i <= Math.PI; i += Math.PI / 11) {
        const rayGeometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
          x+Math.cos(i) * 2, y+Math.sin(i) * 2, z,
          x+Math.cos(i) * 3, y+Math.sin(i) * 3, z
        ]);
        rayGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const ray = new THREE.Line(rayGeometry, rayMaterial);
        sunGroup.add(ray);
      }
      // Add the sunGroup to the scene
      scene.current.add(sunGroup);
      logos.push(sunGroup);
    }
    createSun(34,-2,-5);
  };

  return (
    <div>
      {showNote && (
        <div style={{
          position: 'absolute',
          top: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px',
          border: '2px solid white',
          backgroundColor: 'black',
          color: 'white',
          zIndex: 1000,
          textAlign: 'center'
        }}>
          {noteText}
        </div>
      )}
    </div>
  );
};

export default ThreeScene;

