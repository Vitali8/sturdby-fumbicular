'use strict';

console.log('Blockchain\'s start\nEnter length of chain:');

const Chain = require('./Chain');
const Transaction = require('./Transaction');

let input = require('read');
input({ default: '6' }, function (someError, result, isDefault) {
    if (someError || isDefault) {
        var chainLength = 6;
    }
    else {
        var chainLength = Number.parseInt(result);
    }

    // create a chain
    let blockchain = new Chain();

    //mining a block whose transaction does not have a signature
    console.log("Mining Block 1");
    blockchain.mineAndAddBlock(new Transaction('Elizabeth', 'Andew', Math.floor((Math.random() * 512) + 256)));

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
        console.log("=====Block has been Mined=====");
    }

    console.log(blockchain);
    console.log("Is this chain valid? - " + blockchain.isValid());
    console.info("Pause for 15 seconds");
    setTimeout(function () {
        console.log("Program finished");
    }, 15000);
});