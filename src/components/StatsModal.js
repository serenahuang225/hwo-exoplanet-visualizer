import React, { useState } from 'react';

const StatsModal = ({ processedExoplanets }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const getStatistics = () => {
    const totalExoplanets = processedExoplanets.length;

    const observableExoplanets = processedExoplanets.filter(
      planet => planet.isObservable
    )

    const unobservableExoplanets = processedExoplanets.filter(
      (planet) => !observableExoplanets.includes(planet)
    )

    const calculateAverage = (data, field) => {
      const values = data.map(item => item[field]).filter(Boolean);
      const sum = values.reduce((a, b) => a + b, 0);
      return values.length ? (sum / values.length).toFixed(2) : 'N/A';
    };

    const countSpectralTypes = (data) => {
      const typeCounts = data.reduce((counts, planet) => {
        const type = planet.spectralType;
        if (type) {
          counts[type] = (counts[type] || 0) + 1;
        }
        return counts;
      }, {});

      // Convert to an array of [type, count], sort by count, and take top 10
      return Object.entries(typeCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([type, count]) => `${type}: ${count}`)
        .join(', ');
    };

    return {
      totalExoplanets: totalExoplanets,
      observableCount: observableExoplanets.length,
      avgDistanceObservable: calculateAverage(observableExoplanets, 'distance'),
      avgDistanceUnobservable: calculateAverage(unobservableExoplanets, 'distance'),
      avgGaiaMagObservable: calculateAverage(observableExoplanets, 'gaiamag'),
      avgGaiaMagUnobservable: calculateAverage(unobservableExoplanets, 'gaiamag'),
      avgOrbitalSemiMajorObservable: calculateAverage(observableExoplanets, 'semiMajorAxis'),
      avgOrbitalSemiMajorUnobservable: calculateAverage(unobservableExoplanets, 'semiMajorAxis'),
      topSpectralTypesObservable: countSpectralTypes(observableExoplanets).toString(),
      topSpectralTypesUnobservable: countSpectralTypes(unobservableExoplanets).toString()
    };
  };

  const stats = getStatistics();

  console.log(stats)

  return (
    <div className='modal2'>
      {!isModalOpen && <button onClick={() => setModalOpen(true)}>Show Summary</button> }

      {isModalOpen && (
        <div>
          <div>
            <button onClick={() => setModalOpen(false)}>
              Close
            </button>
            
            <h2>Exoplanet Observability Summary</h2>
            
            <div>
              <p><strong>Total Exoplanets:</strong> {stats.totalExoplanets}</p>
              <p><strong>Exoplanets Observable by Telescope:</strong> {stats.observableCount}</p>
              
              <h3>Average Parameters (Observable vs. Unobservable)</h3>
              <p><strong>Distance (pc):</strong> {stats.avgDistanceObservable} (Observable) / {stats.avgDistanceUnobservable} (Unobservable)</p>
              <p><strong>Gaia Magnitude:</strong> {stats.avgGaiaMagObservable} (Observable) / {stats.avgGaiaMagUnobservable} (Unobservable)</p>
              <p><strong>Orbit Semi-Major Axis (AU):</strong> {stats.avgOrbitalSemiMajorObservable} (Observable) / {stats.avgOrbitalSemiMajorUnobservable} (Unobservable)</p>
              
              <h3>Spectral Types Comparison</h3>
              <p><strong>Observable Spectral Types:</strong> {stats.topSpectralTypesObservable}</p>
              <p><strong>Unobservable Spectral Types:</strong> {stats.topSpectralTypesUnobservable}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsModal;