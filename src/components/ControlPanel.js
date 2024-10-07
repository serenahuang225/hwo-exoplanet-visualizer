import React from 'react';

const ControlPanel = ({ hwoParams, setHwoParams }) => {
  const handleDiameterChange = (e) => {
    setHwoParams({ ...hwoParams, telescopeDiameter: Number(e.target.value) });
  };

  return (
    <div className="control-panel">
      <h2>HWO Telescope Parameters</h2>
      <div>
        <label>
          Telescope Diameter (m):
          <input
            type="range"
            min="5"
            max="15"
            step="0.1"
            value={hwoParams.telescopeDiameter}
            onChange={handleDiameterChange}
          />
          <span>{hwoParams.telescopeDiameter} m</span>
        </label>
      </div>
      <div>(Green means observable, red means not)</div>
    </div>
  );
};

export default ControlPanel;