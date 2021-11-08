class Tests {
    //Performance test 

    static astarPerformance() {
    // Initializing map
    // Gathering informations (where is the start point,
    // endpoint and how many colors)
    // try {
        let start = performance.now();

        let astar = new Astar();

        console.log(`Game map is ${astar.search()} and it created ${Global.nodeNumber} nodes`);

        let end = performance.now();
        let time = `${(end - start) / 1000} seconds`;

        if(Global.nodeNumber == 3000) {
            console.log('%c WARNING 10000 NODES HAVE BEEN CREATED', 'color: yellow');
            console.log(`%c PERFORMANCE IS LOW - IT TOOK ${time} TO GENERATE`, 'color: yellow;' );
            console.log(`%c STOPPED A SEARCH ALGORITHM`, 'color: yellow;' );
        } else {
            console.log(`%c It took ${time}`, 'color: yellow;' );
        }

    // } catch (error) {
    //     console.log(`%c${error}`, 'color: red;');
    // }
    }
    

    static comonentLabelingPerformance() {
        let start = performance.now()

        let componentLabeling = new ComponentLabeling();
        componentLabeling.twoPass(gameMap);

        let end = performance.now();
        let time = `${(end - start) / 1000} seconds`;
        console.log(`%c It took ${time}`, 'color: yellow;' );
        }
}