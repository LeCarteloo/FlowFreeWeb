class Astar {
    search(map, start, end) {
        var openList = [];
        var closedList = [];
        var result = [];
        openList.push(start);

        while(openList.length > 0) {
            var index = 0;
            for(var i = 0; i < openList.length; i++) {
                if(openList[i].getFCost() < openList[index].getFCost()) {
                    index = i;
                }
            }

            var currentNode = openList[index];

            if(currentNode.position == end.position) {
                console.log("Found end-point");
            }
            return 'test';
        }
    }
}