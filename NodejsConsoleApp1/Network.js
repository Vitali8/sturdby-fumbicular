
const Chain = require('./Chain');

class Network {
    static get worldState() {
        if (!this._worldState)
            this._worldState = [];

        return this._worldState;
    }
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
            this._worldState.push(newRow);
        }
        else
            this._worldState[index] += value;
    }
}

module.exports = Network;