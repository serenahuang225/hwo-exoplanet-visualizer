// src/components/ExoplanetMarker.jsx
import React, { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { MeshStandardMaterial } from 'three';
import { convertToCartesian } from '../utils/coordinateConversion';
import { useTooltip } from './TooltipContext';


const ExoplanetMarker = ({ data, hwoParams }) => {
  const { showTooltip, hideTooltip, setSelectedExoplanet } = useTooltip()
  const meshRef = useRef();

  // console.log(data)
  const { ra, dec, distance, isObservable, name } = data;

  // Handle missing or invalid data
  if (!ra || !dec || !distance) {
    return null; // Skip rendering if essential data is missing
  }

  const [x, y, z] = convertToCartesian(ra, dec, distance);

  // Color based on observability
  const color = isObservable ? '#00ff00' : '#ff0000';

  const handlePointerOver = (e) => {
    e.stopPropagation();
    console.log("tooltip in")
    showTooltip(name, { x: e.clientX, y: e.clientY });
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    hideTooltip();
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setSelectedExoplanet(data);
  };

  return (
    <mesh
      position={[x, y, z]}
      // ref={meshRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default ExoplanetMarker;