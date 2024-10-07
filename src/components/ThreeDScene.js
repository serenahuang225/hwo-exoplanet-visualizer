// src/components/ThreeDScene.jsx
import React, { useEffect, useMemo } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import ExoplanetMarker from './ExoplanetMarker';
import { isObservable } from '../utils/calculateObservability';
import * as THREE from 'three';
import Earth from './Earth';
import { TooltipProvider } from './TooltipContext';

function StarsBackground() {
  const starTexture = useLoader(THREE.TextureLoader, '/textures/stars.jpg');

  return (
    <mesh>
      <sphereGeometry args={[300, 128, 128]} />
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
    <Canvas style={{ background: 'white' }} camera={{ position: [0, 0, 5], fov: 70 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <StarsBackground />

      
      {processedExoplanets.map((planet) => (
        <ExoplanetMarker key={planet.name} data={planet} />
      ))}

      <Earth />
      <OrbitControls maxDistance={400} />
    </Canvas>
  );
};

export default ThreeDScene;
