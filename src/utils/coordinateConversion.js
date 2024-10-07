const degToRad = (degrees) => degrees * (Math.PI / 180);

const SCALE_FACTOR = 0.5; // So that everything isn't super spaced out
const DISTANCE_UNIT = 3.262; // 1 pc ≈ 3.262 ly (light year)

/**
 * Fetches and parses a CSV file.
 * @param {Number} raDeg - Right ascension.
 * @param {Number} decDeg - declination.
 * @param {Number} distancePc - distance (in parsec).
 * @returns {<Array<Number>>} - [x,y,z] Cartesian format of the exoplanet coordinates.
 */
export const convertToCartesian = (raDeg, decDeg, distancePc) => {
  const raRad = degToRad(raDeg);
  const decRad = degToRad(decDeg);
  const distanceLy = distancePc * DISTANCE_UNIT; // Convert pc to ly
  const scaledDistance = distanceLy * SCALE_FACTOR;

  const x = scaledDistance * Math.cos(decRad) * Math.cos(raRad);
  const y = scaledDistance * Math.cos(decRad) * Math.sin(raRad);
  const z = scaledDistance * Math.sin(decRad);

  return [x, y, z];
};