'use strict';

console.log('Blockchain\'s start');
let Chain = require('./Chain');
let Transaction = require('./Transaction');
let input = require('read');
//input();

// create a chain
let blockchain = new Chain();
let chainLength = 5;

// create a transaction
for (let i = 1; i < chainLength; i++) {
    let transaction = new Transaction('Jake', 'Finn', 153 % i);
    console.log("Mining Block " + i);
    blockchain.mineAndAddBlock(transaction);
}

console.log(blockchain);
console.log("Is this chain valid? - " + blockchain.isValid());
console.info("Pause for 15 seconds");
let timerStart = new Date().getSeconds();
do {} while (timerStart + 15 > new Date().getSeconds() );
console.log("Program finished");