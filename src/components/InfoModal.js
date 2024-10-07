import React from 'react';
import { useTooltip } from './TooltipContext';

const InfoModal = () => {
  const {selectedExoplanet, setSelectedExoplanet} = useTooltip()
  if (selectedExoplanet===null) return null;

  return (
    <div className="modal">
      <button onClick={() => setSelectedExoplanet(null)}>Close</button>
      <h2>{selectedExoplanet.name}</h2>
      <p>Discovery Method: {selectedExoplanet.discoveryMethod}, {selectedExoplanet.discoveryFac} {selectedExoplanet.discoveryYear}</p>
      <p>Distance: {selectedExoplanet.distance} light-years</p>
      <p>Host Star: {selectedExoplanet.hostStar}</p>
      <p>Size: {selectedExoplanet.radius} Earth radii</p>
      <p>Equilibrium Temperature: {selectedExoplanet.eqlTemp ? selectedExoplanet.eqlTemp : "--"} K</p>
      <p>Planet-Star Separation: {selectedExoplanet.semiMajorAxis} AU</p>
      <p>Star Spectral Type: {selectedExoplanet.spectralType}</p>
      {/* Add more details */}
    </div>
  );
};

export default InfoModal;
