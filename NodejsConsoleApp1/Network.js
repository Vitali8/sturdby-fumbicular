///some magic for peerJS
window = global;
location = { protocol: 'http' };
XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

net = require('net');
wrtc = require('wrtc');
RTCPeerConnection = wrtc.RTCPeerConnection;
RTCSessionDescription = wrtc.RTCSessionDescription;
RTCIceCandidate = wrtc.RTCIceCandidate;

WebSocket = require('ws');
require('./node_modules/peerjs/lib/exports.js');
///
const Peer = require('peerjs');
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
    initializeP2P() {
        var peer = null; // Own peer object
        var peerId = null;
        var conn = null;
        var oppositePeer = { // Opposite peer object
            peerId: null
        };

        peer = new Peer(null);
        /*//receive
        peer.on('open', function (id) {
            peerId = id;
            console.log('ID: ' + id);
        });*/
        // Handle close or error
        conn.on('close', function () {
            console.info("Connection closed");
        });
        peer.on('disconnected', function () {
            alert("Connection has been lost.");
            peer.reconnect();
        });
        peer.on('error', function (err) {
            if (err.type === 'unavailable-id') {
                alert('' + err);
                peer.reconnect();
            }
            else
                alert('' + err);
        });
        peer.on('open', function () {
            if (conn) {
                conn.close();
            }
            if (peer) {
                peer.destroy();
            }

            destId = recvIdInput.value;
            // Create connection to shared PeerJS server
            conn = peer.connect(destId, {
                reliable: true
            });
            conn.on('open', function () {
                oppositePeer.peerId = destId;
                console.info("Connected to: " + destId);
                ready();
            });
        });
    }
}

module.exports = Network;