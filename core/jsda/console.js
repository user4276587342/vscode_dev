function DirectedGraph() {
    this.edges = {}
}

DirectedGraph.prototype.addVertex = function(vertex){
    this.edges[vertex] = {}
}

DirectedGraph.prototype.addEdge = function(origVertex, destVertex, weight) {
    if (weight == undefined){
        weight = 0
    }

    this.edges[origVertex][destVertex] = weight
}

var diagraph1 = new DirectedGraph()
diagraph1.addVertex('A')
diagraph1.addVertex('B')
diagraph1.addVertex('C')
diagraph1.addEdge('A', 'B', 1)
diagraph1.addEdge('B', 'C', 2)
diagraph1.addEdge('C', 'A', 3)
// console.log('diagraph1')
// console.log(diagraph1)


DirectedGraph.prototype.topologicalSortUtil = function(v, visited, stack) {
    visited.add(v)

    for (var item in this.edges[v]) {
        if (visited.has(v) == false) {
            this.topologicalSortUtil(v, visited, stack)
        }
    }
    stack.unshift(v)
}


DirectedGraph.prototype.topologicalSort = function() {
    var visited = new Set(), 
        stack = []

    for (var item in this.edges) {
        if (visited.has(item) == false) {
            // create sorting utils
            this.topologicalSortUtil(item, visited, stack)
        }
    }
    return stack
}

var g = new DirectedGraph();
g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');

g.addEdge('B', 'A');
g.addEdge('D', 'C');
g.addEdge('D', 'B');
g.addEdge('B', 'A');
g.addEdge('A', 'F');
g.addEdge('E', 'C');
var topologicalOrder = g.topologicalSort();
console.log(g);
console.log(topologicalOrder);
