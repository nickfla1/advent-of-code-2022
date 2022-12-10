import {
  OUTCOME_DRAW,
  OUTCOME_LOST,
  OUTCOME_WON,
  T_PAPER,
  T_ROCK,
  T_SCISSORS,
} from "./constants.js";

export function calculateOutcome(a, b) {
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
