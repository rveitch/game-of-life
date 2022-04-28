import { EMPTY, NEWBORN, ADULT, SENIOR } from '../config/constants.js';

/**
 * Logs the number and grid of a generation
 * @param {Array.<Array.<number>>} grid
 * @param {number} generationNumber
 */
export function printGeneration(grid, generationNumber) {
  console.log('\n', `Generation ${generationNumber}`);
  console.table(grid);
}

/**
 * Checks if a given grid is valid
 * @param {Array.<Array.<number>>} grid
 * @returns {boolean}
 */
export function isValidGrid(grid) {
  return (
    Array.isArray(grid) &&
    grid.every((row) => {
      const hasValidRowLength = row.length === grid.length;
      const hasValidRowValues = row.every((cell) => [EMPTY, NEWBORN, ADULT, SENIOR].includes(cell));
      return hasValidRowLength && hasValidRowValues;
    })
  );
}

/**
 * Throws an error if the evaluated grid is invalid
 * @param {Array.<Array.<number>>} grid
 */
export function validateGrid(grid) {
  if (!isValidGrid(grid)) {
    throw new Error(`Invalid Grid: ${JSON.stringify(grid)}`);
  }
}
