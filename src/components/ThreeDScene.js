// src/components/ThreeDScene.jsx
import React, { useEffect, useMemo } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import ExoplanetMarker from './ExoplanetMarker';
import { isObservable } from '../utils/calculateObservability';
import * as THREE from 'three';
import Earth from './Earth';

function StarsBackground() {
  const starTexture = useLoader(THREE.TextureLoader, '/textures/stars.jpg');

  return (
    <mesh>
      <sphereGeometry args={[1000, 64, 64]} />
      <meshBasicMaterial map={starTexture} side={THREE.BackSide} />
    </mesh>
  );
}

const ThreeDScene = ({ exoplanets, hwoParams }) => {
  const processedExoplanets = useMemo(() => {
    return exoplanets.map((planet) => ({
      ...planet,
      isObservable: isObservable(planet, hwoParams),
    }));
  }, [exoplanets, hwoParams]);

  return (
    <Canvas style={{ background: 'black' }} camera={{ position: [0, 0, 100], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <StarsBackground />
      <Stars />

      {processedExoplanets.map((planet) => (
        <ExoplanetMarker key={planet.name} data={planet} />
      ))}

      <Earth />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default ThreeDScene;
