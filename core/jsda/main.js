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

graph1.removeVertex(5)
console.log(graph1.edges)



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
console.log(diagraph1)



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
        visited = {}

    queue.push(vertex)

    while (queue.lenght) {
        vertex = queue.shift()
        if (!visited[vertex]) {
            visited[vertex] = true
            fn(vertex)
            for (var adjacentVertex in this.edges[vertex]) {
                queue.push(adjacentVertex)
            }
        }

    }

}
console.log('traversing')
diagraph1.traverseBFS('A', (vertex)=>console.log(vertex))
console.log(diagraph1)

