const Check = require('../solver/Check');
const GameMap = require('../solver/GameMap');
const Node = require('../solver/node/Node');

describe('Missed tile', () => {
    let node;
    let check;

    beforeEach(() => {
        GameMap.clearAll();
        const map = [    
            ['R', '0', '0', '0', '0', '0'],
            ['B', '0', '0', '0', 'B', 'R'],
            ['0', '0', '0', '0', '0', 'Y'],
            ['0', 'G', 'A', '0', '0', '0'],
            ['0', '0', '0', '0', 'G', 'A'],
            ['Y', 'O', '0', '0', '0', 'O'],
        ];
        GameMap.initializeMap(map);
        node = new Node();
        check = new Check();;
    });

    test("Tile has missed a tile", () => {
        node.mapState.map = [    
            ['R', 'R', '0', 'R', '0', '0'],
            ['B', 'R', 'R', 'R', 'B', 'R'],
            ['B', '0', '0', '0', '0', 'Y'],
            ['0', 'G', 'A', '0', '0', '0'],
            ['0', '0', '0', '0', 'G', 'A'],
            ['Y', 'O', '0', '0', '0', 'O'],
        ]
        node.mapState.current[0] = {Y: 0, X: 3}
        node.mapState.current[1] = {Y: 2, X: 0}
        expect(check.missedTile(node.mapState, 0)).toBeTruthy();
    });

    afterAll(() => {
        GameMap.clearAll();
    });
});



