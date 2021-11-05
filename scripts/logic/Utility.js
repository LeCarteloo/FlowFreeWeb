class Utility {
    // Checking if string is uppercased
    static isUpper(string) {
        return /^[A-Z]*$/.test(string);
    }

    // Function returns sorted array
    static sortArray(array) {
        var temp = 0;
        for (let i = 0; i < array.length; i++) {
            for (let j = i; j > 0; j--) {
                if(array[j] < array[j - 1]) {
                    temp = array[j];
                    array[j] = array[j - 1];
                    array[j - 1] = temp;
                }
            }
        }
        console.log(array)
        return array;
    }

    // Function returns sorted nodes by F cost.
    static sortNodes(nodes) {
        var sortedNodes = [];
        var temp = 0;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i; j > 0; j--) {
                if(nodes[j].getFCost() < nodes[j - 1].getFCost()) {
                    temp = nodes[j];
                    nodes[j] = nodes[j - 1];
                    nodes[j - 1] = temp;
                }
            }
        }

        return sortedNodes;
    }

    // Function push node to the list and sort elem by FCost
    static pushSort(node, list) {
        let index = 0;
        if(list.length == 0) {
            list.splice(index, 0, node);
            return;
        }

        if(list[0].getFCost() == node.getFCost()) {
            index = 1;
        }  

        list.splice(index, 0, node);

        // for (let i = 0; i < list.length; i++) {
        //     Debug.printMapState(list[i].mapState, "splice");
        // }
    }

}