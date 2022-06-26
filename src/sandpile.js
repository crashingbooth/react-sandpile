export const getToppledPiles = (grid) => {
  // param: [[grid]]
  let result = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] >= 4) {
        result.push({x, y});
      }
    }
  }
  return result;
}

export const getDifferenceGrid = (toppledPiles, dimensions) => {
  // param: [{x,y}], {width, height}
  // return: [[grid]] of changes to apply
  let result = emptyGrid(dimensions);
  toppledPiles.forEach(coord => {
    const neighbourChanges = toppledPileChanges(coord, dimensions)
    Object.values(neighbourChanges).forEach(neighbour => {
      result[neighbour.coords.y][neighbour.coords.x] += neighbour.change;
    })
  })
  return result;
}

export const applyDifferenceGrid = (grid, differenceGrid, dimensions) => {
  // param: [[originalGrid]], [[changes]], dimensions: {width, height}
  // return: [[newGrid]]
  let result = emptyGrid(dimensions);
  for (let y = 0; y < dimensions.height; y++) {
    for (let x = 0; x < dimensions.width; x++) {
      result[y][x] = grid[y][x] + differenceGrid[y][x];
    }
  }
  return result;
}

export const toppledPileChanges = (pileCoords, dimensions) => {
  // params: pileCoords: {x, y}, dimensions: {width, height}
  // return change Coords: {pos: {coords: {x,y}, change: number}}
  let result = {};
  result.centre = {coords: pileCoords, change: -4};
  let neighbours = ['north', 'east', 'south', 'west'];
  neighbours.forEach(pos => {
    result[pos] = {coords: getCoord(pileCoords, pos, dimensions), change: 1}
  });
  return result;
}

export const getCoord = (centre, pos, dimensions) => {
// params: centre: {x, y}, pos: 'north', dimensions: {width, height}
  if (pos === 'north') {
    return {x: centre.x, y: centre.y <= 0 ? dimensions.height - 1 : centre.y - 1};
  } else if (pos === 'south') {
    return {x: centre.x, y: centre.y >= dimensions.height - 1 ? 0 : centre.y + 1};
  } else if (pos === 'west') {
    return {x: centre.x <= 0 ? dimensions.width - 1 : centre.x - 1, y: centre.y};
  } else if (pos === 'east') {
    return {x: centre.x >= dimensions.width - 1 ? 0 : centre.x + 1, y: centre.y};
  }
}

const getCapacity = grid => {
  const capacity = grid.length * grid[0].length * 3;
  const gridTotal = grid.reduce((total, line) => {
    const lineTotal = line.reduce((lineSum, cell) => { return lineSum + cell },0);
    return lineTotal + total;
  },0)
  return {capacity, gridTotal};
}



// helper
export const emptyGrid = (dimensions) => {
  let grid = [];
  const line = Array(dimensions.width).fill(0);
  for (let i = 0; i < dimensions.height; i++) {
    grid.push([...line])
  }
  return grid;
}

const showGrid = (grid) => {
  grid.forEach(line => {
    console.log(line.join(" "));
  })
}
