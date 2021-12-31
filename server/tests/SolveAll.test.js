const LobbySettings = require('../LobbySettings');
const GameMap = require('../solver/GameMap');
const Solver = require('../Solver/Solver');

describe('Try to solve map (Cannot touch)', () => {
    let solver;
    beforeEach(() => {
        GameMap.clearAll();
    });
    
    test("Map is solvable", () => {
        
        const map = [
            ['B', '0', '0', '0', 'G'],
            ['0', '0', 'R', '0', '0'],
            ['0', '0', 'Y', '0', '0'],
            ['0', '0', '0', '0', '0'],
            ['R', 'Y', 'B', 'G', '0']
        ];
        solver = new Solver(map);

        expect(solver.init().isSolved).toBeTruthy();
    });

    test("Map is solvable", () => {
        const map = [
            ['R', '0', 'G', '0', 'O'],
            ['0', '0', 'B', '0', 'Y'],
            ['0', '0', '0', '0', '0'],
            ['0', 'G', '0', 'O', '0'],
            ['0', 'R', 'B', 'Y', '0'],
        ];
        solver = new Solver(map);

        expect(solver.init().isSolved).toBeTruthy();
    });

    test("Map is solvable", () => {
        const map = [
            ['R', '0', '0', '0', '0', '0'],
            ['B', '0', '0', '0', 'B', 'R'],
            ['0', '0', '0', '0', '0', 'Y'],
            ['0', 'G', 'A', '0', '0', '0'],
            ['0', '0', '0', '0', 'G', 'A'],
            ['Y', 'O', '0', '0', '0', 'O'],
        ];
        solver = new Solver(map);

        expect(solver.init().isSolved).toBeTruthy();
    });

    test("Map is solvable", () => {
        const map = [
            ['0', '0', '0', '0', '0', '0', '0'],
            ['R', '0', '0', '0', '0', 'Y', 'R'],
            ['O', '0', '0', 'B', 'A', '0', '0'],
            ['0', '0', '0', 'G', '0', 'G', '0'],
            ['0', '0', '0', '0', 'A', '0', '0'],
            ['0', '0', '0', '0', 'P', '0', '0'],
            ['0', 'O', 'Y', '0', '0', 'B', 'P'],
        ];
        solver = new Solver(map);

        expect(solver.init().isSolved).toBeTruthy();
    });

    test("Map is solvable", () => {
        const map = [
            ['Y','0','0','Y','0','0','0','0','0','0','0','0','B'],
            ['P','0','0','g','0','0','0','0','0','0','T','0','0'],
            ['W','0','0','T','0','0','0','0','0','0','0','0','B'],
            ['M','0','0','C','R','g','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0','0','0','0','Z','0','0'],
            ['0','0','0','0','0','0','0','0','G','0','G','0','0'],
            ['0','0','0','0','0','0','0','0','C','0','0','0','0'],
            ['0','0','0','0','M','0','0','0','P','A','0','0','0'],
            ['O','0','0','0','0','0','0','0','0','0','0','0','0'],
            ['0','0','W','0','0','0','0','0','0','0','0','Z','0'],
            ['0','0','0','0','0','0','0','R','0','0','0','A','0'],
            ['0','O','0','0','0','0','0','0','0','0','0','0','0']
        ];
        solver = new Solver(map);

        expect(solver.init().isSolved).toBeTruthy();
    });

    test("Map is solvable", () => {
        const map = [
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', 'O', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', 'R', '0', '0'],
            ['0', '0', '0', 'Y', '0', '0', '0', 'G'],
            ['0', 'R', '0', '0', 'B', '0', '0', 'O'],
            ['0', '0', '0', '0', '0', '0', '0', 'G'],
            ['Y', '0', '0', '0', '0', '0', '0', 'B'],
        ];
        solver = new Solver(map);

        expect(solver.init().isSolved).toBeTruthy();
    });

    test("Map is solvable", () => {
        const map = [
            ['0','0','0','0','0','G',],
            ['0','0','0','0','0','Y',],
            ['0','0','0','B','0','0',],
            ['0','R','0','R','0','0',],
            ['0','B','0','0','G','0',],
            ['0','0','0','0','Y','0',],
        ];
        solver = new Solver(map);

        expect(solver.init().isSolved).toBeTruthy();
    });

    test("Map is solvable", () => {
        const map = [
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'O'],
            ['0', 'M', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', 'R', '0', '0', '0', '0', 'C', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
            ['B', 'Z', '0', '0', '0', '0', 'Y', 'B', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', 'M', 'G', '0', '0', '0', '0'],
            ['0', '0', '0', 'O', '0', 'R', '0', '0', 'Y', '0', '0'],
            ['0', '0', '0', '0', '0', 'Z', '0', 'C', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', 'G', '0', '0', '0']
        ];
        solver = new Solver(map);

        expect(solver.init().isSolved).toBeTruthy();
    });

    test("Map is unsolvable when pipes cannot touch", () => {
        const map = [
            ['0', '0', 'R'],
            ['R', '0', '0'],
            ['O', '0', 'O'],
        ];
        solver = new Solver(map);

        // Should give error
        expect(solver.init().isSolved).not.toBeTruthy();
    });

    afterAll(() => {
        GameMap.clearAll();
    });
});

describe('Try to solve map (Can touch)', () => {
    let solver;
    beforeEach(() => {
        GameMap.clearAll();
    });
    
    test("Map is solvable", () => {
        LobbySettings.canTouch = true;
        const map = [
            ['0','R','G','0','0',],
            ['0','0','0','0','G',],
            ['0','0','0','0','A',],
            ['0','0','0','0','0',],
            ['R','0','A','0','0',],
        ];
        solver = new Solver(map);

        expect(solver.init().isSolved).toBeTruthy();
    });

    test("Map is solvable", () => {
        LobbySettings.canTouch = true;
        const map = [
         ['R', '0', '0'],
         ['0', '0', 'R'],
         ['O', '0', 'O'],
        ];
        solver = new Solver(map);

        expect(solver.init().isSolved).toBeTruthy();
    });

    test("Map is solvable", () => {
        LobbySettings.canTouch = true;
        const map = [
            ['R', '0', '0', '0', '0', '0'],
            ['B', '0', '0', '0', 'B', 'R'],
            ['0', '0', '0', '0', '0', 'Y'],
            ['0', 'G', 'A', '0', '0', '0'],
            ['0', '0', '0', '0', 'G', 'A'],
            ['Y', 'O', '0', '0', '0', 'O'],
        ];
        solver = new Solver(map);

        expect(solver.init().isSolved).toBeTruthy();
    });

    afterAll(() => {
        GameMap.clearAll();
    });
});