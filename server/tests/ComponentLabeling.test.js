const ComponentLabeling = require("../solver/ComponentLabeling");
const GameMap = require("../solver/GameMap");
const Node = require("../solver/node/Node");

describe("Stranded sector/point", () => {
  let node;
  let componentLabeling;

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
    componentLabeling = new ComponentLabeling();
  });

  test("Node is not stranded", () => {
    node.mapState.map = [
      ["R", "R", "R", "R", "R", "R"],
      ["B", "0", "0", "0", "B", "R"],
      ["0", "0", "0", "0", "0", "Y"],
      ["0", "G", "A", "0", "0", "0"],
      ["0", "0", "0", "0", "G", "A"],
      ["Y", "O", "0", "0", "0", "O"],
    ];
    node.mapState.current[0] = { Y: 1, X: 5 };
    node.mapState.current[1] = { Y: 1, X: 0 };
    node.mapState.finishedPoints.push(0);
    expect(
      componentLabeling.isStranded(node.mapState, false).Is
    ).not.toBeTruthy();
  });

  test("Node is not stranded", () => {
    node.mapState.map = [
      ["R", "R", "R", "0", "0", "0"],
      ["B", "0", "R", "R", "B", "R"],
      ["B", "0", "0", "0", "0", "Y"],
      ["0", "G", "A", "0", "0", "0"],
      ["0", "0", "0", "0", "G", "A"],
      ["Y", "O", "0", "0", "0", "O"],
    ];
    node.mapState.current[0] = { Y: 1, X: 3 };
    node.mapState.current[1] = { Y: 2, X: 0 };
    expect(
      componentLabeling.isStranded(node.mapState, false).Is
    ).not.toBeTruthy();
  });

  test("Node created stranded sector", () => {
    node.mapState.map = [
      ["R", "R", "0", "0", "0", "0"],
      ["B", "R", "0", "0", "B", "R"],
      ["B", "R", "R", "R", "R", "Y"],
      ["0", "G", "A", "0", "0", "0"],
      ["0", "0", "0", "0", "G", "A"],
      ["Y", "O", "0", "0", "0", "O"],
    ];
    node.mapState.current[0] = { Y: 2, X: 4 };
    node.mapState.current[1] = { Y: 2, X: 0 };
    expect(componentLabeling.isStranded(node.mapState, false).Is).toBeTruthy();
  });

  test("Node created stranded sector", () => {
    node.mapState.map = [
      ["R", "R", "0", "0", "0", "0"],
      ["B", "R", "0", "0", "B", "R"],
      ["B", "R", "R", "0", "0", "Y"],
      ["B", "G", "A", "0", "0", "0"],
      ["B", "0", "0", "0", "G", "A"],
      ["Y", "O", "0", "0", "0", "O"],
    ];
    node.mapState.current[0] = { Y: 2, X: 2 };
    node.mapState.current[1] = { Y: 4, X: 0 };
    expect(componentLabeling.isStranded(node.mapState, false).Is).toBeTruthy();
  });

  afterAll(() => {
    GameMap.clearAll();
  });
});
