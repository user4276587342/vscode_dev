console.log('----- Graphs -----')
console.log('----- UndirectedGraphs -----')

function UndirectedGraph(){
    this.edges = {}
}

UndirectedGraph.prototype.addVertex = function(vertex){
    this.edges[vertex] = {}
}

UndirectedGraph.prototype.addEdge = function(vertex1, vertex2, weight) {
    if (weight == undefined){
        weight = 0
    }

    this.edges[vertex1][vertex2] = weight
    this.edges[vertex2][vertex1] = weight
}

var graph1 = new UndirectedGraph()
graph1.addVertex(1)
graph1.addVertex(2)
graph1.addEdge(1, 2, 1)

graph1.addVertex(3)
graph1.addVertex(4)
graph1.addVertex(5)

graph1.addEdge(2, 3, 8)
graph1.addEdge(3, 4, 10)
graph1.addEdge(4, 5, 100)
graph1.addEdge(1, 5, 88)
console.log(graph1.edges)


UndirectedGraph.prototype.removeEdge = function(vertex1, vertex2) {
    if (this.edges[vertex1] && this.edges[vertex1][vertex2] != undefined) {
        delete this.edges[vertex1][vertex2]
    }
    if (this.edges[vertex2] && this.edges[vertex2][vertex1] != undefined) {
        delete this.edges[vertex2][vertex1]
    }
}

UndirectedGraph.prototype.removeVertex = function(vertex) {
    for (var adjacentVertex in this.edges[vertex]) {
        this.removeEdge(adjacentVertex, vertex)
    }
}

UndirectedGraph.prototype.traverseBFS = function(vertex, fn) {
    var queue = [],
        visited = {};

    queue.push(vertex);

    while (queue.length) {
        vertex = queue.shift();
        if (!visited[vertex]) {
            visited[vertex] = true;
            fn(vertex);
            for (var adjacentVertex in this.edges[vertex]) {
                console.log(this.edges[vertex])
                queue.push(adjacentVertex);
            }
        }
    }
}

UndirectedGraph.prototype.traverseDFS = function(vertex, fn) {
    var visited = {}
    this._traverseDFS(vertex, visited, fn)
}

UndirectedGraph.prototype._traverseDFS = function(vertex, visited, fn) {
    visited[vertex] = true
    fn(vertex)
    for(var adjacentVertex in this.edges[vertex]) {
        if (!visited[adjacentVertex]) {
            this._traverseDFS(adjacentVertex, visited, fn)
        }
    }
}

//graph1.removeVertex(5)
//console.log(graph1.edges)
console.log('-----Traverse Undirected Graphs -----')
console.log('traverse bfs')

graph1.traverseBFS("4", (vertex) => {
    console.log(vertex)
});

console.log('traverse dfs')
graph1.traverseDFS("4", (vertex) => {
    console.log(vertex)
});


console.log('----- DirectedGraphs -----')
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
console.log('diagraph1')
console.log(diagraph1)

var diagraph2 = new DirectedGraph()
diagraph2.addVertex(1)
diagraph2.addVertex(2)
diagraph2.addEdge(1, 2, 1)

diagraph2.addVertex(3)
diagraph2.addVertex(4)
diagraph2.addVertex(5)

diagraph2.addEdge(2, 3, 8)
diagraph2.addEdge(3, 4, 10)
diagraph2.addEdge(4, 5, 100)
diagraph2.addEdge(1, 5, 88)

console.log('diagraph2')
console.log(diagraph2)




DirectedGraph.prototype.removeEdge = function(origVertex, destVertex) {
    if (this.edges[origVertex] && this.edges[origVertex][destVertex] != undefined) {
        delete this.edges[origVertex][destVertex]
    }
}

DirectedGraph.prototype.removeVertex = function(vertex) {
    for (var adjacentVertex in this.edges[vertex]) {
        this.removeEdge(adjacentVertex, vertex)
    }
}

console.log('----- Breadth-First Search -----')
DirectedGraph.prototype.traverseBFS = function(vertex, fn) {
    var queue = [],
        visited = {};

    queue.push(vertex);

    while (queue.length) {
        vertex = queue.shift();
        if (!visited[vertex]) {
            visited[vertex] = true;
            fn(vertex);
            for (var adjacentVertex in this.edges[vertex]) {
                // console.log(this.edges[vertex])
                queue.push(adjacentVertex);
            }
        }
    }
}
console.log('traversing bfs')
diagraph1.traverseBFS("C", (vertex) => {
    console.log(vertex)
});
// diagraph1.traverseBFS('B', (vertex)=>console.log(vertex))


DirectedGraph.prototype.traverseDFS = function(vertex, fn) {
    var visited = {}
    this._traverseDFS(vertex, visited, fn)
}

DirectedGraph.prototype._traverseDFS = function(vertex, visited, fn) {
    visited[vertex] = true
    fn(vertex)
    for(var adjacentVertex in this.edges[vertex]) {
        if (!visited[adjacentVertex]) {
            this._traverseDFS(adjacentVertex, visited, fn)
        }
    }
}
console.log('traversing dfs')
diagraph1.traverseDFS("C", (vertex) => {
    console.log(vertex)
})



console.log('----- Dijkstras Algorithm: Shortest Path -----')
function _isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function _extractMin(Q, dist) {
    var minimumDistance = Infinity,
        nodeWithMinimumDistance = null;
    for (var node in Q) {
        if (dist[node] <= minimumDistance) {
            minimumDistance = dist[node];
            nodeWithMinimumDistance = node;
        }
    }
    return nodeWithMinimumDistance;
}

DirectedGraph.prototype.Dijkstra = function(source) {
    // create vertex set Q
    var Q = {},
        dist = {};
    for (var vertex in this.edges) {
        // unknown distances set to Infinity
        dist[vertex] = Infinity;
        // add v to Q
        Q[vertex] = this.edges[vertex];
    }
    // Distance from source to source init to 0
    dist[source] = 0;

    while (!_isEmpty(Q)) {
        var u = _extractMin(Q, dist); // get the min distance

        // remove u from Q
        delete Q[u];

        // for each neighbor, v, of u:
        // where v is still in Q.
        for (var neighbor in this.edges[u]) {
            // current distance
            var alt = dist[u] + this.edges[u][neighbor];
            // a shorter path has been found
            if (alt < dist[neighbor]) {
                dist[neighbor] = alt;
            }
        }
    }
    return dist;
}

var digraph1 = new DirectedGraph();
digraph1.addVertex("A");
digraph1.addVertex("B");
digraph1.addVertex("C");
digraph1.addVertex("D");
digraph1.addEdge("A", "B", 1);
digraph1.addEdge("B", "C", 1);
digraph1.addEdge("C", "A", 1);
digraph1.addEdge("A", "D", 1);
console.log('digraph1');
console.log(digraph1);

// DirectedGraph {
// V: 4,
// E: 4,
// edges: { A: { B: 1, D: 1 }, B: { C: 1 }, C: { A: 1 }, D: {} }}
console.log('shortest path');
var path = digraph1.Dijkstra("A"); // { A: 0, B: 1, C: 2, D: 1 }
console.log(path)

var digraph2 = new DirectedGraph()
digraph2.addVertex("A");
digraph2.addVertex("B");
digraph2.addVertex("C");
digraph2.addVertex("D");
digraph2.addVertex("E");
digraph2.addVertex("Z");

digraph2.addEdge("A", "B", 4);
digraph2.addEdge("A", "C", 2);
digraph2.addEdge("B", "C", 1);
digraph2.addEdge("B", "D", 5);
digraph2.addEdge("C", "D", 8);
digraph2.addEdge("C", "E", 10);
digraph2.addEdge("D", "Z", 6);
digraph2.addEdge("E", "Z", 3);
digraph2.addEdge("E", "D", 2);

console.log('digraph2');
console.log(digraph2)
console.log('shortest path');


console.log('----- Topological Sort -----')

DirectedGraph.prototype.topologicalSortUtil = function(v, visited, stack) {
    visited.add(v);

    for (var item in this.edges[v]) {
        if (visited.has(item) == false) {
            this.topologicalSortUtil(item, visited, stack)
        }
    }
    stack.unshift(v);
};

DirectedGraph.prototype.topologicalSort = function() {
    var visited = new Set(),
        stack = [];


    for (var item in this.edges) {
        if (visited.has(item) == false) {
            this.topologicalSortUtil(item, visited, stack);
        }
    }
    return stack;
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
