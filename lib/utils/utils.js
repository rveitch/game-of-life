/**
 * Logs the number and grid of a generation
 * @param {Array.<Array.<number>>} grid
 * @param {number} generationNumber
 */
export function printGeneration(grid, generationNumber) {
  console.log('\n', `Generation ${generationNumber}`);
  console.table(grid);
}
