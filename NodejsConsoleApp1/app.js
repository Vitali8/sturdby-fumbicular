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
    const EC = require('elliptic').ec;
    const ec = new EC('secp256k1');

    // create a chain
    let blockchain = new Chain();

    blockchain.makeNewTransaction('Elizabeth', 'Andew', Math.floor((Math.random() * 512) + 256), ec.genKeyPair());

    //mining & creating some transactions
    for (let i = 1; i < chainLength; i++) {

        let sender = 'Jake';

        let key = ec.genKeyPair();
        console.log('Private key created: ', key.getPrivate(true, 'hex'));
        console.log('Public  key created: ', key.getPublic(true, 'hex'));

        console.log("Mining Block " + i);
        blockchain.makeNewTransaction(sender, 'Finn', Math.floor((Math.random() * 300) + 1), key);
        blockchain.mineAndAddBlock();

        //console.log('Signature valid? -', blockchain.blocks..verifySignature(key.getPublic('hex'), sign));
        console.log("=====Block has been Mined=====");
    }

    console.log(blockchain);
    console.log("Is this chain valid? - " + blockchain.isValid());
    console.info("Pause for 15 seconds");
    setTimeout(function () {
        console.log("Program finished");
    }, 15000);
});