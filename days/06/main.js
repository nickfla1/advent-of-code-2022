import { hasDupicates } from "@nickfla1/utilities";
import { readFileSync } from "fs";

const INPUT_FILE = "input.txt";

function findPacketMarker(procedure, markerSize) {
  for (let i = 0; i < procedure.length - markerSize; i++) {
    const slice = procedure.substring(i, i + markerSize);
    if (!hasDupicates(slice)) {
      return i + markerSize;
    }
  }
}

function main() {
  const input = readFileSync(INPUT_FILE).toString();
  const packetMarker = findPacketMarker(input, 4);
  const messageMarker = findPacketMarker(input, 14);

  console.log("Part 1 >", packetMarker);
  console.log("Part 2 >", messageMarker);
}

main();
