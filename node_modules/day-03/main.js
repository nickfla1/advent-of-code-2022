const { readFileSync } = require("fs");

const INPUT_FILE = "input.txt";

function getPriorityScore(value) {
  const code = value.charCodeAt();
  if (code >= 97) {
    return code - 96; // 1 to 2
  }

  return code - 64 + 26;
}

function findDuplicatedItem(a, b) {
  for (const x of a) {
    for (const y of b) {
      if (x === y) {
        return x;
      }
    }
  }
}

function findDuplicateInGroup(a, b, c) {
  for (const x of a) {
    for (const y of b) {
      for (const z of c) {
        if (x === y && x === z) {
          return x;
        }
      }
    }
  }
}

function sumScores(scores) {
  return scores.reduce((p, c) => {
    return p + c;
  }, 0);
}

function chunkArray(array, size) {
  const res = [];
  for (let i = 0; i < array.length; i += size) {
    res.push(array.slice(i, i + size));
  }

  return res;
}

function partOne(rucksacks) {
  const compartments = rucksacks.map((rucksack) => {
    const half = rucksack.length / 2;
    const first = rucksack.slice(0, half);
    const second = rucksack.slice(half);

    return [first, second];
  });

  const duplicateScores = compartments.map(([first, second]) => {
    return getPriorityScore(findDuplicatedItem(first, second));
  });

  return sumScores(duplicateScores);
}

function partTwo(rucksacks) {
  const scores = chunkArray(rucksacks, 3).map(([a, b, c]) => {
    const badge = findDuplicateInGroup(a, b, c);
    return getPriorityScore(badge);
  });

  return sumScores(scores);
}

function main() {
  const input = readFileSync(INPUT_FILE).toString();
  const rucksacks = input.split("\n");

  console.log("Part 1 >", partOne(rucksacks));
  console.log("Part 2 >", partTwo(rucksacks));
}

main();
