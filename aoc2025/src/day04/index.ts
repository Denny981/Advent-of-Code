import run from "aocrunner";

type Pos = `${number},${number}`;

const parseInput = (rawInput: string): Set<Pos> => {
  const rolls = new Set<Pos>();
  rawInput
    .trim()
    .split(/\r?\n/)
    .forEach((row, r) => {
      for (let c = 0; c < row.length; c++) {
        if (row[c] === "@") {
          rolls.add(`${r},${c}`);
        }
      }
    }); 
  return rolls;
};

const dirs = [
  [-1, -1], [-1, 0], [-1, 1],
  [ 0, -1],          [ 0, 1],
  [ 1, -1], [ 1, 0], [ 1, 1],
] as const;

const part1 = (rawInput: string) => {
  const rolls = parseInput(rawInput);
  let count = 0;

  for (const pos of rolls) {
    const [r, c] = pos.split(",").map(Number);

    let neighbors = 0;
    for (const [dr, dc] of dirs) {
      if (rolls.has(`${r + dr},${c + dc}`)) {
        neighbors++;
      }
    }

    if (neighbors < 4) {
      count++;
    }
  }

  return count;
};

const part2 = (rawInput: string) => {
  const rolls = parseInput(rawInput);

  // Precompute neighbor counts
  const neighbors = new Map<Pos, number>();

  for (const pos of rolls) {
    const [r, c] = pos.split(",").map(Number);
    let count = 0;

    for (const [dr, dc] of dirs) {
      if (rolls.has(`${r + dr},${c + dc}`)) {
        count++;
      }
    }

    neighbors.set(pos, count);
  }

  let removed = 0;

  while (true) {
    const toRemove: Pos[] = [];

    // Find all currently removable rolls
    for (const [pos, count] of neighbors) {
      if (count < 4) {
        toRemove.push(pos);
      }
    }

    if (toRemove.length === 0) break;

    // Remove them and update neighbors
    for (const pos of toRemove) {
      rolls.delete(pos);
      neighbors.delete(pos);
      removed++;

      const [r, c] = pos.split(",").map(Number);
      for (const [dr, dc] of dirs) {
        const n = `${r + dr},${c + dc}` as Pos;
        if (neighbors.has(n)) {
          neighbors.set(n, neighbors.get(n)! - 1);
        }
      }
    }
  }

  return removed;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
},"./src/day04/input.txt");
