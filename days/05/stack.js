export class CrateStack {
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
