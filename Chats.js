class Chats {
    chats = [];

    constructor(chats = []) {
        this.chats = chats;
    }

    all() {
        return this.chats;
    }

    addChat(object, id = null) {
        if (id) {
            this.chats[id] = object;

        } else {
            this.chats.push(object);
        }
    }

    getById(id) {
        return this.chats.filter(c => c.id === id)[0] || null;
    }
}

module.exports = new Chats([]);