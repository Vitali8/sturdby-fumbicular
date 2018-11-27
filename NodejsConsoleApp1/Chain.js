const sha256 = require('js-sha256');
const Block = require('./Block');
const Network = require('./Network');
const Transaction = require('./Transaction');

class Chain {

    constructor() {

        this.blocks = [];
        this.mineRate = 100;
        this.difficulty = 4;
        this.pendingTransactions = [];
    }
    //geting next block
    mineAndAddBlock() {
        let block = new Block(
            this.pendingTransactions
        );

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
        for (let transaction in block.transactions) {
            Network.changeState(transaction.from, 'Eth', -transaction.amount);
            Network.changeState(transaction.to, 'Eth', transaction.amount);
        }
        this.blocks.push(block);
    }

    makeNewTransaction(sender, recipient, amount, privateKey) {
        this.pendingTransactions.push(new Transaction(
            sender,
            recipient,
            amount)
            .createSignature(privateKey)
        );

        console.log(`>>> Transaction: ${amount} from ${sender} to ${recipient}`);
        //the number of the Block that this transaction will be added to
        return this.blocks.length;
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
                || this.blocks[i].hash !== this.blocks[i+1].previousHash)
                return false;
        }
        return this.validateBlockHash(this.getPreviousBlock());
    }

    addDynamicDifficulty() {
        let difference = this.getPreviousBlock().date - this.blocks[this.blocks.length - 2].date;
        if (difference > this.mineRate) {
            this.difficulty++;
        }
        else {
            this.difficulty--;
        }
    }

    getPreviousBlock() {
        return this.blocks[this.blocks.length - 1];
    }

    getBalance(user) {
        let index = Network.worldState.findIndex(item => item.address === user);
        let balance = 0;
        if (index > -1) {

            balance = Network.worldState[index];
        }

        return balance;
    }
}

module.exports = Chain;