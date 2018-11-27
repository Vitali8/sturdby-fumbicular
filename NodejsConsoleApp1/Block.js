class Block {

    get key() {
        return JSON.stringify(this.transactions) + this.index + this.previousHash + this.nonce + this.date + this.difficulty;
    }

    constructor(transactions) {

        this.index = 0;
        this.previousHash = "";
        this.hash = "";
        this.nonce = 0;
        this.difficulty = 0;
        this.transactions = transactions;
        this.date = Date.prototype;
    }

}

module.exports = Block;