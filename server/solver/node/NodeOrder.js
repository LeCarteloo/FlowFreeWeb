module.exports = class NodeOrder {
  #array;
  constructor() {
    this.#array = [];
  }
  push(elem) {
    let index = 0;

    // TODO: Potentialy change to <=
    if (this.#array.length == 0 || elem.getFCost() < this.peek().getFCost()) {
      this.#array.splice(index, 0, elem);
      return this.#array.length;
    }

    index = 1;

    this.#array.splice(index, 0, elem);
    return this.#array.length;
  }
  peek() {
    return this.#array[0];
  }
  shift() {
    return this.#array.splice(0, 1)[0];
  }
  print() {
    console.log(this.#array);
  }
  printMapState() {
    for (let i = 0; i < this.#array.length; i++) {
      // Debug.printMapState(this.#array[i].mapState, `Node order ${i}`)
    }
  }
  length() {
    return this.#array.length;
  }
  includes(elem) {
    return this.#array.includes(elem);
  }
};
