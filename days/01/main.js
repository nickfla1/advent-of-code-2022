const { readFileSync } = require("fs");

const INPUT_FILE = "input.txt";

function partOne(caloriesPerElf) {
  return Math.max(...caloriesPerElf);
}

function partTwo(caloriesPerElf) {
  const copiedArray = [...caloriesPerElf];
  const sortedArray = copiedArray.sort((a, b) => (a > b ? -1 : 1));
  const topThree = sortedArray.slice(0, 3);

  return topThree.reduce((p, c) => {
    return p + c;
  }, 0);
}

function main() {
  const input = readFileSync(INPUT_FILE).toString();
  const elvesCalories = input.split("\n\n");

  const caloriesPerElf = elvesCalories.map((elf) => {
    return elf.split("\n").reduce((p, c) => {
      return p + parseInt(c, 10);
    }, 0);
  });

  console.log("Part 1 >", partOne(caloriesPerElf));
  console.log("Part 2 >", partTwo(caloriesPerElf));
}

main();
