const Check = require("../solver/Check");
const GameMap = require("../solver/GameMap");
const Node = require("../solver/node/Node");

describe("Missed tile map I", () => {
  let node;
  let check;

  beforeEach(() => {
    GameMap.clearAll();
    const map = [
      ["R", "0", "0", "0", "0", "0"],
      ["B", "0", "0", "0", "B", "R"],
      ["0", "0", "0", "0", "0", "Y"],
      ["0", "G", "A", "0", "0", "0"],
      ["0", "0", "0", "0", "G", "A"],
      ["Y", "O", "0", "0", "0", "O"],
    ];
    GameMap.initializeMap(map);
    node = new Node();
    check = new Check();
  });

  test("Node is not missing any tile", () => {
    node.mapState.map = [
      ["R", "R", "0", "R", "0", "0"],
      ["B", "R", "R", "R", "B", "R"],
      ["B", "0", "0", "0", "0", "Y"],
      ["0", "G", "A", "0", "0", "0"],
      ["0", "0", "0", "0", "G", "A"],
      ["Y", "O", "0", "0", "0", "O"],
    ];
    node.mapState.current[0] = { Y: 0, X: 3 };
    node.mapState.current[1] = { Y: 2, X: 0 };
    expect(check.hasMissedTile(node.mapState, 0)).not.toBeTruthy();
  });

  afterAll(() => {
    GameMap.clearAll();
  });
});

describe("Missed tile map II", () => {
  let node;
  let check;

  beforeEach(() => {
    GameMap.clearAll();
    const map = [
      ["0", "0", "0", "0", "R", "0", "0", "0"],
      ["0", "0", "0", "0", "C", "0", "G", "Y"],
      ["0", "0", "0", "0", "G", "Y", "0", "C"],
      ["0", "0", "0", "O", "B", "0", "0", "0"],
      ["0", "0", "0", "0", "O", "0", "0", "0"],
      ["0", "0", "0", "0", "B", "0", "0", "0"],
      ["0", "0", "0", "0", "0", "0", "0", "0"],
      ["0", "R", "0", "0", "0", "0", "0", "0"],
    ];
    GameMap.initializeMap(map);
    node = new Node();
    check = new Check();
  });

  test("Node is not missing any tile", () => {
    node.mapState.map = [
      ["0", "0", "0", "0", "R", "0", "0", "Y"],
      ["0", "0", "0", "0", "A", "0", "G", "Y"],
      ["0", "0", "0", "0", "G", "Y", "0", "A"],
      ["0", "0", "0", "O", "B", "0", "0", "0"],
      ["0", "0", "0", "0", "O", "0", "0", "0"],
      ["0", "0", "0", "0", "B", "0", "0", "0"],
      ["0", "0", "0", "0", "0", "0", "0", "0"],
      ["0", "R", "0", "0", "0", "0", "0", "0"],
    ];
    node.mapState.current[3] = { Y: 0, X: 7 };
    expect(check.hasMissedTile(node.mapState, 3)).not.toBeTruthy();
  });

  test("Node has missed a tile", () => {
    node.mapState.map = [
      ["R", "R", "R", "R", "R", "Y", "Y", "Y"],
      ["R", "0", "0", "C", "C", "Y", "G", "Y"],
      ["R", "0", "0", "0", "?", "Y", "G", "?"],
      ["R", "0", "0", "O", "B", "B", "G", "0"],
      ["R", "0", "0", "0", "?", "B", "0", "0"],
      ["R", "0", "0", "0", "?", "0", "0", "0"],
      ["R", "R", "0", "0", "0", "0", "0", "0"],
      ["0", "R", "0", "0", "0", "0", "0", "0"],
    ];
    node.mapState.current[0] = { Y: 7, X: 1 };
    node.mapState.current[1] = { Y: 1, X: 3 };
    node.mapState.current[2] = { Y: 3, X: 6 };
    node.mapState.current[3] = { Y: 2, X: 5 };
    node.mapState.current[4] = { Y: 3, X: 3 };
    node.mapState.current[5] = { Y: 4, X: 5 };
    node.mapState.finishedPoints = [3];
    expect(check.hasMissedTile(node.mapState, 0)).toBeTruthy();
  });

  test("Node is not missing any tile", () => {
    node.mapState.map = [
      ["R", "R", "R", "R", "R", "Y", "Y", "Y"],
      ["R", "0", "0", "C", "C", "Y", "G", "Y"],
      ["R", "0", "0", "0", "?", "Y", "G", "?"],
      ["R", "0", "0", "O", "B", "B", "G", "0"],
      ["R", "0", "0", "0", "?", "B", "0", "0"],
      ["R", "R", "0", "0", "?", "0", "0", "0"],
      ["0", "R", "0", "0", "0", "0", "0", "0"],
      ["0", "R", "0", "0", "0", "0", "0", "0"],
    ];
    node.mapState.current[0] = { Y: 7, X: 1 };
    node.mapState.current[1] = { Y: 1, X: 3 };
    node.mapState.current[2] = { Y: 3, X: 6 };
    node.mapState.current[3] = { Y: 2, X: 5 };
    node.mapState.current[4] = { Y: 3, X: 3 };
    node.mapState.current[5] = { Y: 4, X: 5 };
    node.mapState.finishedPoints = [3];
    expect(check.hasMissedTile(node.mapState, 0)).not.toBeTruthy();
  });

  afterAll(() => {
    GameMap.clearAll();
  });
});
