class Clients {
    clients = [];

    constructor(clients = []) {
        this.clients = clients;
    }

    all() {
        return this.clients;
    }

    getById(id) {
        return this.clients.filter(c => c.id === id)[0] || null;
    }

    getByIndex(index) {
        return this.clients[index] || null;
    }

    addClient(object, id = null) {
        if (id) {
            this.clients[id] = object;

        } else {
            this.clients.push(object);
        }
    }

    remove(id){
        delete this.clients[id]
    }
    count(){
        return this.clients.length;
    }
}

module.exports = new Clients([]);