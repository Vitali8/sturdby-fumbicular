let sha256 = require('js-sha256');
let Block = require('./Block');

class Chain {

    constructor(genesisBlock) {

        this.blocks = [];
        this.addBlock(genesisBlock);
        this.mineRate = 3;
        this.difficulty = 4;
    }

    addBlock(block) {

        if (this.blocks.length == 0) {
            block.previousHash = "0000000000000000";
            block.hash = this.generateHash(block);
            block.date = new Date();
        }
        if (this.blocks.length > 1) {
            this.addDynamicDifficulty();
        }
        this.validateBlockHash(block);
        this.blocks.push(block);
    }
    //geting next block
    mineBlock(transactions) {
        let block = new Block();

        transactions.forEach(function (transaction) {
            block.addTransaction(transaction);
        })

        let previousBlock = this.getPreviousBlock();
        block.index = this.blocks.length;
        block.previousHash = previousBlock.hash;
        block.hash = this.generateHash(block);
        block.difficulty = this.difficulty;
        block.date = new Date();
        return block;
    }

    generateHash(block) {
        let hash = sha256(block.key);
        
        while (!hash.startsWith("0".repeat(this.difficulty))) {
            block.nonce +=1;
            hash = sha256(block.key);
        }

        return hash;
    }

    isOrderValid(block) {
        return this.getPreviousBlock().hash == block.previousHash;
    }
    validateBlockHash(block) {
        return block.hash == sha256(block.key);
    }
    validateFullChainHash() {
        for (let i = 0; i < this.blocks.length; i++) {
            if (!this.validateBlockHash(this.blocks[i]))
                return false;
        }
        return true;
    }
    addDynamicDifficulty() {
        if (this.blocks[this.blocks.length - 2].date - this.getPreviousBlock().date < this.mineRate) {
            this.difficulty++;
        }
        else {
            this.difficulty--;
        }
    }
    getPreviousBlock() {
        return this.blocks[this.blocks.length - 1];
    }
}

module.exports = Chain;