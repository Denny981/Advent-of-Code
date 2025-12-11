import run from "aocrunner";

const parseInput = (rawInput: string): string[] =>   rawInput.split(",").map(s => s.trim()).filter(Boolean);

function isInvalidId(value: number){
  const valueString = value.toString();
  // Part 2
  return /^(\d+)\1+$/.test(valueString);
  // Part 1
  // const left = valueString.slice(0, valueString.length / 2);
  // const right = valueString.slice(valueString.length / 2);
  // return left === right;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  // console.log(input);
  const numsInput = input.map(p => p.split("-").map(Number));
  // console.log(numsInput);
  const inValidIds: number[] = [];
  const [[start, end]] = numsInput;
  for (const [start, end] of numsInput){
    for (let x = start!; x <= end!; x++){
      if(isInvalidId(x)){
        inValidIds.push(x);
      }
    }
  }
  // console.log(inValidIds);
  return inValidIds.reduce((s, v) => s + v);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  // console.log(input);
  const numsInput = input.map(p => p.split("-").map(Number));
  // console.log(numsInput);
  const inValidIds: number[] = [];
  const [[start, end]] = numsInput;
  for (const [start, end] of numsInput){
    for (let x = start!; x <= end!; x++){
      if(isInvalidId(x)){
        inValidIds.push(x);
      }
    }
  }
  // console.log(inValidIds);
  return inValidIds.reduce((s, v) => s + v);
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
},"./src/day02/input.txt");
