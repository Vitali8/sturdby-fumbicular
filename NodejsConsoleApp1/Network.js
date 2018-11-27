
const Chain = require('./Chain');

class Network {
    static worldState = [{
        address: String.prototype,
        key: String.prototype,
        value: Number.prototype
    }];

    //constructor(blockChain) {

    //    this.chain = (Chain)blockChain;
    //}

    static changeState(address, key, value) {
        //  address: String.prototype,
        //  key: String.prototype,
        //  value: Number.prototype
        let index = this.worldState.findIndex(Element => Element.address === address);
        if (index == -1) {

            let newRow = {
                address,
                key,
                value
            };
            this.worldState.push(newRow);
        }
        else
            this.worldState[index] += value;
    }
}

module.exports = Network;