import Queue from "./queue";
import Stack from "./stack";

class Graph {
    constructor() {

        this.vertiecs = [];
        this.vertiecArr = []

        this.edgeList = {};
        /*
            A:['B','C','D']
        */
    }
    addVerTex(v, option) {

        if (this.isAddVerTex(v)) {

            this.vertiecs.push({ [v]: option });

            this.edgeList[v] = [];
            this.vertiecArr.push(v)
        }
        
    }

    addEdge(a, b) {
        
        this.edgeList[a].push(b);
        this.edgeList[b].push(a);
        this.edgeList[a] = Array.from(new Set(this.edgeList[a]))
        this.edgeList[b] = Array.from(new Set(this.edgeList[b]))
    }
    
    isAddVerTex(v) {
        return this.vertiecArr.indexOf(v) == -1
    }
    
    toString() {
        let rst = '';
        for (let i = 0; i < this.vertiecs.length; i++) {
           
            let vertex = this.vertiecs[i];
            rst += `${vertex}=>`;
           
            let egde = this.edgeList[vertex];
            for (let j = 0; j < egde.length; j++) {
                rst += egde[j];
            }
            rst += '\n';
        }
        return rst;
    }
   
    initColor() {
        let colors = {};
        for (let i = 0; i < this.vertiecs.length; i++) {
        
            colors[this.vertiecs[i]] = 'white';
        }
        return colors;
    }

    bfs(v, callback) {
     
        let color = this.initColor();
        
        let queue = new Queue();
       
        queue.enqueue(v);
       
        let prev = {};
        for (let i = 0; i < this.vertiecs.length; i++) {
            prev[this.vertiecs[i]] = null;
        }

       
        while (!queue.isEmpty()) {
       
            const qVertex = queue.dequeue();
   
            const edge = this.edgeList[qVertex];
          
            for (let i = 0; i < edge.length; i++) {
            
                const e = edge[i];
                if (color[e] === 'white') {
                  
                    color[e] = 'gray';
            
                    prev[e] = qVertex;
    
                    queue.enqueue(e)
                }
            }
     
            color[qVertex] = 'black';
            if (callback) {
                callback(qVertex);
            }
        }
        return prev;
    }
   
    dfs(v, callback) {
        const color = this.initColor();
        this.dfsVisit(v, color, callback);
    }

    dfsVisit(v, color, callback) {
      
        color[v] = 'gray';

        if (callback) {
            callback(v);
        }
    
        let edge = this.edgeList[v];

        for (let i = 0; i < edge.length; i++) {

            let e = edge[i];
            if (color[e] === 'white') {
          
                this.dfsVisit(e, color, callback);
            }
        }
 
        color[v] = 'black';
    }
}

export default Graph