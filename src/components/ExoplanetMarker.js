// src/components/ExoplanetMarker.jsx
import React, { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { MeshStandardMaterial } from 'three';

const degToRad = (degrees) => degrees * (Math.PI / 180);

const SCALE_FACTOR = 0.5; // Adjust based on visualization needs
const DISTANCE_UNIT = 3.262; // 1 pc ≈ 3.262 ly

const convertToCartesian = (raDeg, decDeg, distancePc) => {
  const raRad = degToRad(raDeg);
  const decRad = degToRad(decDeg);
  const distanceLy = distancePc * DISTANCE_UNIT; // Convert pc to ly
  const scaledDistance = distanceLy * SCALE_FACTOR;

  const x = scaledDistance * Math.cos(decRad) * Math.cos(raRad);
  const y = scaledDistance * Math.cos(decRad) * Math.sin(raRad);
  const z = scaledDistance * Math.sin(decRad);

  return [x, y, z];
};

const ExoplanetMarker = ({ data, hwoParams }) => {
  const meshRef = useRef();

  console.log(data)
  const { ra, dec, distance, isObservable, name } = data;

  // Handle missing or invalid data
  if (!ra || !dec || !distance) {
    return null; // Skip rendering if essential data is missing
  }

  const [x, y, z] = convertToCartesian(ra, dec, distance);

  // Color based on observability
  const color = isObservable ? 'green' : 'red';

  // const handlePointerOver = (e) => {
  //   e.stopPropagation();
  //   showTooltip(name, { x: e.clientX, y: e.clientY });
  // };

  // const handlePointerOut = (e) => {
  //   e.stopPropagation();
  //   hideTooltip();
  // };

  // const handleClick = (e) => {
  //   e.stopPropagation();
  //   setSelectedExoplanet(data);
  // };

  return (
    <mesh
      position={[x, y, z]}
      // ref={meshRef}
      // onPointerOver={handlePointerOver}
      // onPointerOut={handlePointerOut}
      // onClick={handleClick}
    >
      <sphereGeometry args={[isObservable ? 0.1 : 0.03, 16, 16]} /> {/* Adjust size as needed */}
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default ExoplanetMarker;