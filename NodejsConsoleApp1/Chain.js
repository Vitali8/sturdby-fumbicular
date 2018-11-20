const sha256 = require('js-sha256');
const Block = require('./Block');

class Chain {

    constructor() {

        this.blocks = [];
        this.mineRate = 3;
        this.difficulty = 4;
    }
    //geting next block
    mineAndAddBlock(transaction) {
        let block = new Block();
        block.addTransaction(transaction);

        if (this.blocks.length === 0) {
            block.previousHash = "0000000000000000";
        }
        else {
            block.previousHash = this.getPreviousBlock().hash;
        }

        block.index = this.blocks.length;
        block.difficulty = this.difficulty;
        block.date = new Date();
        block.hash = this.generateHash(block);
        if (this.blocks.length > 1) {
            this.addDynamicDifficulty();
        }
        this.validateBlockHash(block);
        this.blocks.push(block);
    }

    generateHash(block) {
        let hash = sha256(block.key);
        
        while (!hash.startsWith("0".repeat(this.difficulty))) {
            block.nonce +=1;
            hash = sha256(block.key);
        }

        return hash;
    }

    validateBlockHash(block) {
        return block.hash === sha256(block.key);
    }
    isValid() {
        for (let i = 0; i < this.blocks.length - 1; i++) {
            if (!this.validateBlockHash(this.blocks[i])
                || this.blocks[i].hash === this.blocks[i+1].previousHash)
                return false;
        }
        return this.validateBlockHash(this.getPreviousBlock());
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