module.exports = {
    gen: function() {
        let gameMap = [
            ['0', '0', '0', '0', '0', '0', '0'],
            ['R', '0', '0', '0', '0', 'Y', 'R'],
            ['O', '0', '0', 'B', 'A', '0', '0'],
            ['0', '0', '0', 'G', '0', 'G', '0'],
            ['0', '0', '0', '0', 'A', '0', '0'],
            ['0', '0', '0', '0', 'P', '0', '0'],
            ['0', 'O', 'Y', '0', '0', 'B', 'P']
        ];
        return gameMap;
    },
    placePoints: function() {
        let COLORSS = 5;
        testMap = [
            ['0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0']
        ];
        
        console.log(testMap)

        for (let index = 0; index < COLORSS; index++) {
            testMap[0][index] = Object.keys(Colors)[index];
        }
        console.log(testMap)
    }
}