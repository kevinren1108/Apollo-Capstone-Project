// 队列
class Queue {
    constructor() {
        this.items = [];
    }
    enqueue(ele) {
        this.items.push(ele);
    }
    dequeue() {
        return this.items.shift();
    }
    
    front() {
        return this.items[0];
    }

    rear() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    clear() {
        this.items = []
    }
}

export default Queue