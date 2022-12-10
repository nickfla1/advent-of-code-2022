import { sumOf } from "@nickfla1/utilities";
import { readFileSync } from "fs";

import {
  T_ROCK,
  T_PAPER,
  T_SCISSORS,
  OUTCOME_SCORE,
  DECODED_SCORE,
} from "./constants.js";
import { calculateOutcome } from "./shared.js";

/**
 * Input contents.
 *
 *
 * First column:
 * A: Rock
 * B: Paper
 * C: Scissors
 *
 * Second column:
 * X: Rock
 * Y: Paper
 * Z: Scissors
 */
const INPUT_FILE = "input.txt";

const DECODE_MAP = {
  A: T_ROCK,
  B: T_PAPER,
  C: T_SCISSORS,
  X: T_ROCK,
  Y: T_PAPER,
  Z: T_SCISSORS,
};

function calculateRoundScore(player, opponent) {
  const baseScore = DECODED_SCORE[player];
  const outcomeScore = OUTCOME_SCORE[calculateOutcome(player, opponent)];

  return baseScore + outcomeScore;
}

function main() {
  const input = readFileSync(INPUT_FILE).toString();
  const rounds = input.split("\n");

  const scores = rounds.map((round) => {
    const [opponent, player] = round
      .split(" ")
      .map((encoded) => DECODE_MAP[encoded]);

    return calculateRoundScore(player, opponent);
  });

  const totalScore = sumOf(scores);

  console.log(">", totalScore);
}

main();
