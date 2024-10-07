import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useEffect } from 'react';

function Earth() {
  // Load textures
  const earthTexture = useLoader(TextureLoader, '/textures/earth.jpg');

  return (
    <>
      {/* Earth Sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial map={earthTexture} />
      </mesh>
    </>
  );
}

export default Earth;