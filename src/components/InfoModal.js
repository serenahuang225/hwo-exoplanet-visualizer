import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../store/actions';

const InfoModal = () => {
  const dispatch = useDispatch();
  const selectedExoplanet = useSelector(state => state.selectedExoplanet);

  if (!selectedExoplanet) return null;

  return (
    <div className="modal">
      <button onClick={() => dispatch(closeModal())}>Close</button>
      <h2>{selectedExoplanet.name}</h2>
      <p>Distance: {selectedExoplanet.distance} light-years</p>
      <p>Host Star: {selectedExoplanet.hostStar}</p>
      <p>Size: {selectedExoplanet.size} Earth radii</p>
      {/* Add more details */}
    </div>
  );
};

export default InfoModal;
