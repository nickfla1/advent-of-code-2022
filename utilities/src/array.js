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

/**
 * Returns if the input array contains any duplicates
 *
 * @param {Array} array
 * @returns {Boolean}
 */
export function hasDupicates(array) {
  const set = new Set(array);

  return set.size !== array.length;
}
