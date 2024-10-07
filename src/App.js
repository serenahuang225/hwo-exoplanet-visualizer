import React, { useEffect, useState } from 'react';
import { parseCSV } from './utils/parseCSV';
import ThreeDScene from './components/ThreeDScene';
import ControlPanel from './components/ControlPanel';

function App() {
  const [exoplanets, setExoplanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [hwoParams, setHwoParams] = useState({
    telescopeDiameter: 6, // in meters
    minAngularSeparation: 0.1, // in arcseconds, adjust as needed
    contrastThreshold: 1e9, // adjust based on HWO capabilities
    instrumentSensitivity: 1.0, // arbitrary units
    // Add more parameters as needed
  });

  useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await parseCSV('/exoplanets_all.csv');
        setExoplanets(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  console.log(exoplanets)

  if (loading) return <div>Loading exoplanet data...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <div className="App">
      <header style={{padding: '0rem 2rem'}}>
        <h1>Habitable Worlds Observatory (HWO) Exoplanet Visualizer</h1>
      </header>
      {/* <ControlPanel hwoParams={hwoParams} setHwoParams={setHwoParams} /> */}

      <ThreeDScene hwoParams={hwoParams} exoplanets={exoplanets} />
    </div>
  );
}

export default App;
