'use strict';

console.log('Blockchain\'s start');
let Block = require('./Block');
let Chain = require('./Chain');
let Transaction = require('./Transaction');
let input = require("read");
//input();

// create a chain
let blockchain = new Chain(new Block());
let chainLength = 5;

// create a transaction
for (let i = 1; i < chainLength; i++) {
    let newBlock;
    let transaction = new Transaction('Jake', 'Finn', 153 % i);
    console.log("Mining Block " + i);
    if (i % 2 == 0) {
        let firstTransaction = new Transaction("Max", "Marceline", 294 % (i + 1));
        newBlock = blockchain.mineBlock([firstTransaction, transaction]);
    }
    else
        newBlock = blockchain.mineBlock([transaction]);
    console.log("Is order of blocks valid? - " + blockchain.isOrderValid(newBlock));
    blockchain.addBlock(newBlock);
}

console.log(blockchain);
console.log("Full chain hash validated - " + blockchain.validateFullChainHash());
console.info("Pause for 15 seconds");
let timerStart = new Date().getSeconds();
do {} while (timerStart + 15 > new Date().getSeconds() );
console.log("Program finished");