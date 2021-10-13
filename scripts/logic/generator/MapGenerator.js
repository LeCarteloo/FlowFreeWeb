class MapGenerator {
    // 5x5
    static #COLORS = 5;

    static placePoints() {
        testMap = [
            ['0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0']
        ];
        
        console.log(testMap)

        for (let index = 0; index < this.#COLORS; index++) {
            testMap[0][index] = Object.keys(Colors)[index];
        }
        console.log(testMap)
    }
}