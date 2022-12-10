import { readFileSync } from "fs";

const INPUT_FILE = "input.txt";

function parseRange(raw) {
  const sides = raw.split(",");

  return sides.map((side) => {
    return side.split("-").map((i) => parseInt(i, 10));
  });
}

function rangeInRange(a, b) {
  const [aStart, aEnd] = a;
  const [bStart, bEnd] = b;

  return (
    (aStart <= bStart && aEnd >= bEnd) || (bStart <= aStart && bEnd >= aEnd)
  );
}

function rangeOverlapsRange(a, b) {
  const [aStart, aEnd] = a;
  const [bStart, bEnd] = b;

  return aStart <= bEnd && aEnd >= bStart;
}

function main() {
  const input = readFileSync(INPUT_FILE).toString();
  const ranges = input.split("\n");
  const parsedRanges = ranges.map(parseRange);

  const rangesWithFullInclusions = parsedRanges.filter(([a, b]) => {
    return rangeInRange(a, b);
  });

  const rangesOverlapping = parsedRanges.filter(([a, b]) => {
    return rangeOverlapsRange(a, b);
  });

  console.log("Part 1 >", rangesWithFullInclusions.length);
  console.log("Part 2 >", rangesOverlapping.length);
}

main();
