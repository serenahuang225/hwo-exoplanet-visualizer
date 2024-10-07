import React from 'react';
import { useTooltip } from './TooltipContext';

const InfoModal = () => {
  const {selectedExoplanet, setSelectedExoplanet} = useTooltip()
  if (!selectedExoplanet) return null;

  return (
    <div className="modal">
      <button onClick={() => setSelectedExoplanet(null)}>Close</button>
      <h2>{selectedExoplanet.name}</h2>
      <p>Distance: {selectedExoplanet.distance} light-years</p>
      <p>Host Star: {selectedExoplanet.hostStar}</p>
      <p>Size: {selectedExoplanet.size} Earth radii</p>
      {/* Add more details */}
    </div>
  );
};

export default InfoModal;
