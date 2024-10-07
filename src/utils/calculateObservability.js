// src/utils/calculateObservability.js

/**
 * Determines if an exoplanet is observable by HWO based on its properties and HWO parameters.
 * @param {Object} exoplanet - The exoplanet object.
 * @param {Object} hwoParams - HWO parameters (telescopeDiameter).
 * @returns {boolean} - True if observable, else false.
 */
export const isObservable = (exoplanet, hwoParams) => {
  const { stellarRadius, radius, distance, semiMajorAxis } = exoplanet;
  const { telescopeDiameter } = hwoParams;

  // Ensure all necessary data is present
  if (
    !stellarRadius ||
    !radius ||
    !distance ||
    !semiMajorAxis
  ) {
    return false;
  }

  // Constants
  const SNR0 = 100; // Baseline SNR for Earth-like planet at 10 pc with 6 m telescope

  // Calculate SNR
  const SNR =
    SNR0 *
    Math.pow(
      (stellarRadius * radius * (telescopeDiameter / 6)) /
        ((distance / 10) * semiMajorAxis),
      2
    );

  // Calculate ESmax
  const ESmax = (15 * (telescopeDiameter / 6)) / semiMajorAxis;

  // Exoplanet is characterizable if SNR > 5 and distance <= ESmax
  return SNR > 5 && distance <= ESmax;
};

// export const isObservable = (exoplanet, hwoParams) => {
//   const { semiMajorAxis, distance, radius, hostStar, st_teff, st_rad, vMag } = exoplanet;
//   const { telescopeDiameter, minAngularSeparation, contrastThreshold } = hwoParams;

//   if (!semiMajorAxis || !distance || !vMag) return false;

//   // Calculate angular separation in arcseconds
//   const angularSeparation = semiMajorAxis / distance; // Simplistic approximation

//   // Resolving power (arcseconds) = 1.22 * (wavelength / diameter)
//   // Assuming a central wavelength of 500 nm (visible light)
//   const wavelength = 500e-9; // meters
//   const resolvingPower = (1.22 * wavelength / telescopeDiameter) * 206265; // arcseconds

//   // Check if angular separation meets or exceeds the resolving power
//   const separationCriteria = angularSeparation >= resolvingPower;

//   // Simplistic contrast ratio calculation
//   const planetBrightness = radius ** 2; // Simplistic; real calculation would involve albedo, phase, etc.
//   const starBrightness = Math.pow(10, -0.4 * vMag); // Convert magnitude to brightness
//   const contrastRatio = starBrightness / planetBrightness;

//   // Check if contrast ratio meets or exceeds the threshold
//   const contrastCriteria = contrastRatio >= contrastThreshold;

//   // Determine observability
//   return separationCriteria && contrastCriteria;
// };
