import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'; 

function Box() {
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  )
}

export default function Home() {

  return (
    <>
      <Canvas className="hero">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        <OrbitControls />
      </Canvas>

      <div className="content">
        <h1>Swati's Portfolio</h1>
        <p>Computer Science Student | Developer | Creator</p>
      </div>
    </>
  );
}