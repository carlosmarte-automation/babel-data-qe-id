class Store {
  constructor() {
    this.data = new Map();
  }
  add(tagName, qeId) {
    this.data.set(tagName, {
      qeId,
    });
  }
  toJSON() {
    return Array.from(this.data.entries());
  }
}

export default Store;
