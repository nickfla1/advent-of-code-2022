/**
 * Calculates and returns the sum of an array of numbers.
 *
 * @param {Array} array
 * @returns {Nunber}
 */
export function sumOf(array) {
  return array.reduce((p, c) => {
    return p + c;
  }, 0);
}
