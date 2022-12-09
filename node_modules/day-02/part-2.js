const { readFileSync } = require("fs");

const {
  T_ROCK,
  T_PAPER,
  T_SCISSORS,
  OUTCOME_LOST,
  OUTCOME_DRAW,
  OUTCOME_WON,
  DECODED_SCORE,
  OUTCOME_SCORE,
} = require("./utils");

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
 * X: Lose
 * Y: Draw
 * Z: Win
 */
const INPUT_FILE = "input.txt";

const DECODE_MAP = {
  A: T_ROCK,
  B: T_PAPER,
  C: T_SCISSORS,
  X: OUTCOME_LOST,
  Y: OUTCOME_DRAW,
  Z: OUTCOME_WON,
};

function calculateOutcome(a, b) {
  if (a === b) {
    return OUTCOME_DRAW;
  }

  if (
    (a === T_ROCK && b === T_SCISSORS) ||
    (a === T_PAPER && b === T_ROCK) ||
    (a === T_SCISSORS && b === T_PAPER)
  ) {
    return OUTCOME_WON;
  }

  return OUTCOME_LOST;
}

function calculateMove(opponent, outcome) {
  if (outcome === OUTCOME_DRAW) {
    return opponent;
  }

  if (outcome === OUTCOME_WON) {
    switch (opponent) {
      case T_ROCK:
        return T_PAPER;
      case T_PAPER:
        return T_SCISSORS;
      case T_SCISSORS:
        return T_ROCK;
    }
  }

  if (outcome === OUTCOME_LOST) {
    switch (opponent) {
      case T_ROCK:
        return T_SCISSORS;
      case T_PAPER:
        return T_ROCK;
      case T_SCISSORS:
        return T_PAPER;
    }
  }
}

function calculateRoundScore(outcome, opponent) {
  const playerMove = calculateMove(opponent, outcome);
  const baseScore = DECODED_SCORE[playerMove];
  const outcomeScore = OUTCOME_SCORE[calculateOutcome(playerMove, opponent)];

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

  const totalScore = scores.reduce((p, c) => {
    return p + c;
  }, 0);

  console.log(">", totalScore);
}

main();
