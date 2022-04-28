import { firstGeneration } from './lib/data/grids.js';
import { TARGET_GENERATION } from './lib/config/config.js';
import { printGeneration, validateGrid, evolveNextGeneration } from './lib/utils/utils.js';

/**
 * Executes the Game of Life Simulation
 * @returns {Array<number>}
 */
function runSimulation() {
  validateGrid(firstGeneration); // Ensure we are starting with a valid grid
  let currentGeneration = 1;
  let currentGrid = firstGeneration;

  printGeneration(currentGrid, currentGeneration);

  do {
    currentGeneration += 1;
    currentGrid = evolveNextGeneration(currentGrid, currentGeneration);
  } while (currentGeneration < TARGET_GENERATION);

  console.log('\nEND OF SIMULATION\n');

  return currentGrid;
}

runSimulation();
