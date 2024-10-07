import React from 'react';

const ControlPanel = ({ hwoParams, setHwoParams, filters, setFilters }) => {
  const handleDiameterChange = (e) => {
    setHwoParams({ ...hwoParams, telescopeDiameter: Number(e.target.value) });
  };

  const handleDiscoveryMethodChange = (e) => {
    setFilters({ ...filters, discoveryMethod: e.target.value });
  };

  return (
    <div className="control-panel">
      <h2>HWO Parameters</h2>
      <div>
        <label>
          Telescope Diameter (m):
          <input
            type="range"
            min="5"
            max="15"
            step="0.5"
            value={hwoParams.telescopeDiameter}
            onChange={handleDiameterChange}
          />
          <span>{hwoParams.telescopeDiameter} m</span>
        </label>
      </div>
      <div>
        <label>
          Discovery Method:
          <select value={filters.discoveryMethod} onChange={handleDiscoveryMethodChange}>
            <option value="">All</option>
            <option value="Transit">Transit</option>
            <option value="Radial Velocity">Radial Velocity</option>
            <option value="Imaging">Imaging</option>
            <option value="Microlensing">Microlensing</option>
          </select>
        </label>
      </div>
      {/* Add more controls as needed */}
    </div>
  );
};

export default ControlPanel;