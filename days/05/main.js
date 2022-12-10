import { readFileSync } from "fs";

const INPUT_FILE = "input.txt";

class CrateStack {
  constructor(ids) {
    this.ids = ids;
    this.stacks = {};

    this.ids.forEach((id) => {
      this.stacks[id] = [];
    });
  }

  placeIn(id, what) {
    this.stacks[id].push(what);
  }

  takeFrom(id) {
    return this.stacks[id].pop();
  }

  moveFromTo(from, to) {
    const what = this.takeFrom(from);
    this.placeIn(to, what);
  }

  moveAmountFromTo(from, to, amount) {
    for (let i = 0; i < amount; i++) {
      this.moveFromTo(from, to);
    }
  }

  moveFromToKeepOrder(from, to, amount) {
    const items = this.stacks[from].splice(-amount);
    this.stacks[to] = this.stacks[to].concat(items);
  }

  getTops() {
    return this.ids.map((id) => {
      return this.stacks[id][this.stacks[id].length - 1];
    });
  }
}

function parseStack(stack) {
  const lines = stack.split("\n");
  const ids = lines
    .pop()
    .match(/\d+/g)
    .map((i) => parseInt(i, 10));

  const reversed = lines.reverse();

  const crateStack = new CrateStack(ids);

  reversed.forEach((line) => {
    for (let i = 0; i < line.length; i += 4) {
      const id = i / 4 + 1;
      const crate = line
        .substr(i, 3)
        .replace("[", "")
        .replace("]", "")
        .replace(/\s+/gm, "");

      if (crate.length > 0) {
        crateStack.placeIn(id, crate);
      }
    }
  });

  return crateStack;
}

function parseMoves(moves) {
  const lines = moves.split("\n");
  return lines.map((line) => {
    return line.match(/\d+/g);
  });
}

function partOne(stack, instructions) {
  const crateStack = parseStack(stack);

  instructions.forEach(([amount, from, to]) => {
    crateStack.moveAmountFromTo(from, to, amount);
  });

  return crateStack;
}

function partTwo(stack, instructions) {
  const crateStack = parseStack(stack);

  instructions.forEach(([amount, from, to]) => {
    crateStack.moveFromToKeepOrder(from, to, amount);
  });

  return crateStack;
}

function main() {
  const input = readFileSync(INPUT_FILE).toString();
  const [stack, moves] = input.split("\n\n");

  const instructions = parseMoves(moves);

  console.log("Part 1 >", partOne(stack, instructions).getTops().join(""));
  console.log("Part 2 >", partTwo(stack, instructions).getTops().join(""));
}

main();
