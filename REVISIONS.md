# Revisions

## Are there any sections that you would have done differently with hindsight?

- The "per-cell" object values of `getCellNeighbors()` ended up to be mostly unnecessary in the end. I wasn't sure what I'd need at the time, so I kitchen-sinked it. :)
- I'm sure there are more things, but the "refactor" section below probably covers them in more depth.

## Anything that you'd like to refactor given more time?
- The `runSimulation` could be cleaner, and it would be nice to not have to handle the first generation differently.
- I'm usually not a huge fan of nested `for` loops and would have preferred to handle those better.
- Add tests! I used the example 5x5 grid for initial testing, but didn't get a chance to add legit tests.
- Double check (fix?) docblock param/return values. I feel like they may be incorrect, even if the linter says otherwise.
- I didn't get a chance to add an `nvmrc` file or declare/lock down the engines values in package.json.  Since I'm using features from Node 14+, this would be good to do.