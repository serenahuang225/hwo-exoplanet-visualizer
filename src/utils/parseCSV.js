import Papa from 'papaparse';

/**
 * Fetches and parses a CSV file.
 * @param {string} url - The URL to the CSV file.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of objects.
 */
export const parseCSV = async (url) => {
  try {
    const response = await fetch(url);
    // console.log(response)
    const reader = response.body.getReader();
    const result = await reader.read(); // raw array
    const decoder = new TextDecoder('utf-8');
    const csv = decoder.decode(result.value); // the csv text
    const results = Papa.parse(csv, { header: true, dynamicTyping: true });
    // console.log(results)

    const mappedData = results.data.map(row => ({
      name: row.pl_name,
      hostStar: row.hostname,
      orbitalPeriod: row.pl_orbper,
      semiMajorAxis: row.pl_orbsmax,
      radius: row.pl_rade,
      mass: row.pl_bmasse,
      spectralType: row.st_spectype,
      stellarTeff: row.st_teff,
      stellarRadius: row.st_rad,
      distance: row.sy_dist,
      vMag: row.sy_vmag,
      kMag: row.sy_kmag,
      ra: row.ra,
      dec: row.dec,
      discoveryMethod: row.discoverymethod,
      discoveryYear: row.disc_year,
      // Add other mapped fields if necessary
    }));

    // console.log(mappedData)

    return mappedData;
  } catch (error) {
    console.error('Error parsing CSV:', error);
    throw error;
  }
};