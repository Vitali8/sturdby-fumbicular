class Block {

    get key() {
        return JSON.stringify(this.transactions) + this.index + this.previousHash + this.nonce + this.date + this.difficulty;
    }

    constructor(transaction) {

        this.index = 0;
        this.previousHash = "";
        this.hash = "";
        this.nonce = 0;
        this.difficulty = 0;
        this.transactions = [];
        this.addTransaction(transaction);
        this.date = Date.prototype;
    }
    addTransaction(transaction) {
        this.transactions.push(transaction);
    }
}

module.exports = Block;