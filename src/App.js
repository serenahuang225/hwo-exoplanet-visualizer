import React, { useEffect, useMemo, useState } from 'react';
import { parseCSV } from './utils/parseCSV';
import ThreeDScene from './components/ThreeDScene';
import ControlPanel from './components/ControlPanel';
import { TooltipProvider, useTooltip } from './components/TooltipContext';
import Tooltip from './components/Tooltip';
import InfoModal from './components/InfoModal';
import { isObservable } from './utils/calculateObservability';

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
        console.log("Exoplanets read:", data.length)
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

  const processedExoplanets = useMemo(() => {
    let cnt = 0;
    let res = exoplanets.map((planet) => {
      const isObs = isObservable(planet, hwoParams);
      if (isObs) { cnt++; }
      return { ...planet, isObservable: isObs, }
    });
    return [res, cnt]
  }, [exoplanets, hwoParams]);

  if (loading) return <div>Loading exoplanet data...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <div className="App">
      <header style={{padding: '0rem 2rem', position: 'absolute', zIndex: 5, color: 'white', backgroundColor: '#ffffff50', width: '100%'}}>
        <h2>Habitable Worlds Observatory (HWO) Exoplanet Visualizer</h2>
        <p>Drag the mouse to rotate and scroll to zoom in/out of the display. Click on any exoplanet to learn more!</p>
        <p>Learn more about the HWO <a target="_blank" rel="noopener noreferrer" href='https://habitableworldsobservatory.org/home'>here</a></p>
        <p>Exoplanets displayed: {exoplanets.length}, exoplanets characterizable by HWO: {processedExoplanets[1]}</p>
      </header>
      <ControlPanel hwoParams={hwoParams} setHwoParams={setHwoParams} />

      <TooltipProvider>
        <Tooltip />
        <InfoModal />
        <ThreeDScene processedExoplanets={processedExoplanets[0]} />
      </TooltipProvider>
    </div>
  );
}

export default App;
