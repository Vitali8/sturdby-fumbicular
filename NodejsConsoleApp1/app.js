'use strict';

console.log('Blockchain\'s start');

const Chain = require('./Chain');
const Transaction = require('./Transaction');
let input = require('read');
//input();

// create a chain
let blockchain = new Chain();
let chainLength = 6;

//mining a block whose transaction does not have a signature
console.log("Mining Block 1");
blockchain.mineAndAddBlock(new Transaction('Elizabeth', 'Andew', Math.floor((Math.random() * 300) + 1)));

//mining & creating some transactions
for (let i = 2; i < chainLength; i++) {
    const EC = require('elliptic').ec;
    const ec = new EC('secp256k1');

    let sender = 'Jake';
    let transaction = new Transaction(sender, 'Finn', Math.floor((Math.random() * 300) + 1));

    let key = ec.genKeyPair();
    console.log('Private key created: ', key.getPrivate(true, 'hex'));
    console.log('Public  key created: ', key.getPublic(true, 'hex'));
    let sign = transaction.createSignature(key);
    console.log('Signature created: ', sign);

    console.log("Mining Block " + i);
    blockchain.mineAndAddBlock(transaction);

    console.log('Signature valid? -', transaction.verifySignature(key.getPublic('hex'), sign));
}

console.log(blockchain);
console.log("Is this chain valid? - " + blockchain.isValid());
console.info("Pause for 15 seconds");
let timerStart = new Date();
do { } while (15000 > new Date() - timerStart);
console.log("Program finished");