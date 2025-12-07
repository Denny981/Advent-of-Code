import run from "aocrunner";

const parseInput = (rawInput: string): string[] => rawInput.split("\n").map(line => line.trim()).filter(Boolean);

const START = 50;
const TOTAL = 100;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let password = 0;
  let current = START;
  input.forEach((rotation) => {
    const dir = rotation[0];
    let value = Number(rotation.slice(1));
    if(dir === "L"){ 
      value = value * -1; 
    }
    let change = current + value; 
    if(change < 0){ 
      change = TOTAL + change; 
    } 
    current = change % TOTAL;
    if(current === 0){ 
       password += 1; 
    }
  })
  return password;
};

function modulus(value: number, divisor: number){
  return value - (divisor * Math.floor(value/divisor));
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let password = 0;
  let current = START;
  input.forEach((rotation) => {
    const dir = rotation[0];
    let value = Number(rotation.slice(1));
    if(dir === "L"){ 
      value *= -1;
      const divisons = Math.floor(value / (TOTAL * -1));
      password += divisons;
      const mod = modulus(value, (TOTAL * -1));
      if(current !== 0 && current + mod <= 0){
        password += 1;
      }
    } else {
      const divisons = Math.floor(value / TOTAL);
      password += divisons;
      const mod = modulus(value, TOTAL);
      if(current + mod >= 100){
        password += 1;
      }
    }
    current = modulus(current + value, TOTAL);
  })
  return password;
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
},"./src/day01/input.txt");
