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

        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].getFCost() != 0) {
                sortedNodes.push(nodes[i]);
            }
        }
        return sortedNodes;
    }

}