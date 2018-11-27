class Block {

    get key() {
        return JSON.stringify(this.transactions) + this.index + this.previousHash + this.nonce + this.date + this.difficulty;
    }

    constructor(index, timestamp, nonce, prevBlockHash, hash, transactions) {

        this.index = index;
        this.previousHash = prevBlockHash;
        this.hash = hash;
        this.nonce = nonce;
        this.difficulty = 0;
        this.transactions = transactions;
        this.date = timestamp;
    }

}

module.exports = Block;