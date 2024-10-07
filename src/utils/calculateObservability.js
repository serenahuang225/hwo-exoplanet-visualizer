/**
 * Determines if an exoplanet is observable by HWO based on its properties and HWO parameters.
 * @param {Object} exoplanet - The exoplanet object.
 * @param {Object} hwoParams - HWO parameters (telescopeDiameter, distance).
 * @returns {boolean} - True if observable, else false.
 */
export const isObservable = (exoplanet, hwoParams) => {
  const { stellarRadius, radius, distance, semiMajorAxis } = exoplanet;
  const { telescopeDiameter } = hwoParams;

  // Ensure all necessary data is present
  if ( !stellarRadius || !radius || !distance || !semiMajorAxis ) {
    return false;
  }

  // Baseline SNR for Earth-like planet at 10 pc with 6 m telescope
  const SNR0 = 100; // From Resources Page

  // Calculate SNR
  const SNR =
    SNR0 * Math.pow(
      (stellarRadius * radius * (telescopeDiameter / 6)) /
        ((distance / 10) * semiMajorAxis),
      2
    );

  // Calculate ESmax
  const ESmax = (15 * (telescopeDiameter / 6)) / semiMajorAxis;

  // Exoplanet is characterizable if SNR > 5 and distance <= ESmax
  return SNR > 5 && distance <= ESmax;
};
