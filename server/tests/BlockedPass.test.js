const BlockedPass = require('../solver/BlockedPass');
const GameMap = require('../solver/GameMap');
const Node = require('../solver/node/Node');

describe('Blocked pass', () => {
    let node;

    beforeEach(() => {
        GameMap.clearAll();
        const map = [    
            ['0', '0', '0', '0', 'R', '0', '0', '0'],
            ['0', '0', '0', '0', 'C', '0', 'G', 'Y'],
            ['0', '0', '0', '0', 'G', 'Y', '0', 'C'],
            ['0', '0', '0', 'O', 'B', '0', '0', '0'],
            ['0', '0', '0', '0', 'O', '0', '0', '0'],
            ['0', '0', '0', '0', 'B', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', 'R', '0', '0', '0', '0', '0', '0']
        ];
        GameMap.initializeMap(map);
        node = new Node();
    });

    test("Node blocked one point", () => {
        node.mapState.map = [    
            ['R', 'R', 'R', 'R', 'R', 'Y', 'Y', 'Y'],
            ['R', '0', '0', 'C', 'C', 'Y', 'G', 'Y'],
            ['R', 'R', '0', '0', 'G', 'Y', 'G', 'C'],
            ['0', 'R', '0', 'O', 'B', '0', '0', '0'],
            ['0', '0', '0', '0', 'O', '0', '0', '0'],
            ['0', '0', '0', '0', 'B', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', 'R', '0', '0', '0', '0', '0', '0']
        ];
        node.mapState.current[0] = {Y: 3, X: 1};
        node.mapState.current[1] = {Y: 1, X: 3};
        node.mapState.current[2] = {Y: 2, X: 6};
        node.mapState.current[3] = {Y: 2, X: 5};

        expect(BlockedPass.hasBlockedPass(node.mapState,0)).toBeTruthy();
    });

    test("Node blocked one point", () => {
        node.mapState.map = [
            ['R', 'R', 'R', 'R', 'R', 'Y', 'Y', 'Y'],
            ['R', '0', '0', 'C', 'C', 'Y', 'G', 'Y'],
            ['R', '0', '0', '0', 'G', 'Y', 'G', '?'],
            ['R', '0', '0', 'O', 'B', 'B', 'G', '0'],
            ['R', 'R', '0', '0', 'O', 'B', '0', '0'],
            ['0', '0', '0', '0', 'B', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', 'R', '0', '0', '0', '0', '0', '0']
        ];
        node.mapState.current[0] = {Y: 4, X: 1};
        node.mapState.current[1] = {Y: 1, X: 3};
        node.mapState.current[2] = {Y: 3, X: 6};
        node.mapState.current[3] = {Y: 2, X: 5};
        node.mapState.current[4] = {Y: 3, X: 3};
        node.mapState.current[5] = {Y: 4, X: 5};
        node.mapState.finishedPoints = [3];

        expect(BlockedPass.hasBlockedPass(node.mapState,0)).toBeTruthy();
    });

    test("Node haven't blocked any points", () => {
        node.mapState.map = [
            ['R','R','R','R','R','Y','Y','Y'],
            ['R','0','0','C','C','Y','G','Y'],
            ['R','0','0','0','?','Y','G','?'],
            ['R','0','0','O','B','B','G','0'],
            ['R','R','0','0','?','B','0','0'],
            ['0','R','0','0','?','0','0','0'],
            ['0','0','0','0','0','0','0','0'],
            ['0','R','0','0','0','0','0','0']
        ];
        node.mapState.current[0] = {Y: 5, X: 1};
        node.mapState.current[1] = {Y: 1, X: 3};
        node.mapState.current[2] = {Y: 3, X: 6};
        node.mapState.current[3] = {Y: 2, X: 5};
        node.mapState.current[4] = {Y: 3, X: 3};
        node.mapState.current[5] = {Y: 4, X: 5};
        node.mapState.finishedPoints = [3];

        expect(BlockedPass.hasBlockedPass(node.mapState,0)).not.toBeTruthy();
    });

    afterAll(() => {
        GameMap.clearAll();
    });
});
