import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

function Earth() {
  // Load textures
  const earthTexture = useLoader(TextureLoader, '/textures/earth.jpg');

  return (
    <>
      {/* Earth Sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial map={earthTexture} />
      </mesh>
    </>
  );
}

export default Earth;