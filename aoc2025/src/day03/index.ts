import run from "aocrunner";

const parseInput = (rawInput: string): string[] => rawInput.split(/\r?\n/).map(s => s.trim()).filter(Boolean);


const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let sum = 0;
  // console.log(input);
  input.forEach((bank) => {
    const values = bank.split("").map(Number);
    let maxIndex = 0;
    for(let i = 0;i < values.length - 1; i++){
      if(values[i]! > values[maxIndex]!){
        maxIndex = i;
      }
    }
    let nextMaxIndex = maxIndex + 1;
    for(let i = nextMaxIndex; i < values.length; i++){
      if(values[i]! > values[nextMaxIndex]!){
        nextMaxIndex = i;
      }
    }
    const joltage = values[maxIndex]! * 10 + values[nextMaxIndex]!;
    // console.log(sum);
    sum += joltage;
    // console.log(sum);
  });
  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let sum = 0;
  // console.log(input);
  input.forEach((bank) => {
    const values = bank.split("").map(Number);
    let maxIndex = 0;
    const digits: number[] = [];
    for(let needed = 11; needed >= 0; needed--){
      for(let i = maxIndex; i< values.length - needed; i++){
        if(values[i]! > values[maxIndex]!){
          maxIndex = i;
        }
      }
      digits.push(values[maxIndex]);
      maxIndex = maxIndex + 1; 
    }
    sum += Number(digits.join(""));
  });
  return sum;
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
},"./src/day03/input.txt");
