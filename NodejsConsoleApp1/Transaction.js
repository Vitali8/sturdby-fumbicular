const sha256 = require('js-sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction {

    constructor(from, to, amount) {
        this.from = String(from);
        this.to = String(to);
        this.amount = Number(amount);
        this.signature = String();
    }
    createSignature(privateKey) {
        const messageHash = sha256(this.from + this.to + this.amount);
        const privateKeyPair = ec.keyFromPrivate(privateKey);
        this.signature = ec.sign(messageHash, privateKeyPair); // generate a signature on the hashed message with the private key
        return this.signature;
    }
    verifySignature(publicAddress, signature) {
        if (signature.Length === 0)
            return false;
        const messageHash = sha256(this.from + this.to + this.amount);
        const publicKeyPair = ec.keyFromPublic(publicAddress, 'hex');
        return publicKeyPair.verify(messageHash, signature);
    }
}

module.exports = Transaction;