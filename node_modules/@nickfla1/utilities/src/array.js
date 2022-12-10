/**
 * Splits an array into chunks of `size` length.
 *
 * @param {Array} array
 * @param {Number} size
 * @returns {Array}
 */
export function chunkArray(array, size) {
  const res = [];
  for (let i = 0; i < array.length; i += size) {
    res.push(array.slice(i, i + size));
  }

  return res;
}
