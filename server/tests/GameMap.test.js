const GameMap = require("../solver/GameMap");

describe("Map initializations", () => {
  beforeEach(() => {
    GameMap.clearAll();
  });

  test("Start points equals found color", () => {
    const map = [
      ["R", "0", "0", "0", "0", "0"],
      ["B", "0", "0", "0", "B", "R"],
      ["0", "0", "0", "0", "0", "Y"],
      ["0", "G", "A", "0", "0", "0"],
      ["0", "0", "0", "0", "G", "A"],
      ["Y", "O", "0", "0", "0", "O"],
    ];
    GameMap.initializeMap(map);
    expect(GameMap.startPoint.length).toEqual(GameMap.foundColors.length);
  });

  test("Start points equals end points", () => {
    const map = [
      ["R", "0", "G", "0", "O"],
      ["0", "0", "B", "0", "Y"],
      ["0", "0", "0", "0", "0"],
      ["0", "G", "0", "O", "0"],
      ["0", "R", "B", "Y", "0"],
    ];
    GameMap.initializeMap(map);
    expect(GameMap.startPoint.length).toEqual(GameMap.endPoint.length);
  });

  test("Missing point", () => {
    const map = [
      ["R", "0", "G", "0", "O"],
      ["0", "0", "B", "0", "Y"],
      ["0", "0", "0", "0", "0"],
      ["0", "G", "0", "O", "0"],
      ["0", "R", "B", "0", "0"],
    ];
    GameMap.initializeMap(map);
    expect(GameMap.missingPoint()).toBeTruthy();
  });

  test("Not missing point", () => {
    const map = [
      ["R", "0", "G", "0", "O"],
      ["0", "0", "B", "0", "Y"],
      ["0", "0", "0", "0", "0"],
      ["0", "G", "0", "O", "0"],
      ["0", "R", "B", "Y", "0"],
    ];
    GameMap.initializeMap(map);
    expect(GameMap.missingPoint()).not.toBeTruthy();
  });

  afterAll(() => {
    GameMap.clearAll();
  });
});
