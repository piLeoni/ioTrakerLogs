const axios = require("axios");
const EventEmitter = require('events');
const _ = require("lodash");

class API_Interface extends EventEmitter {
    constructor(input) {
        super();
        this.devices = [];
        this.config = { headers: { Authorization: `Bearer ${input.token}` } };
        this.endpoint = input.endpoint;
        this.frequency = 5000;
        this.interval = null;
    }
    init(input) {
        if (input && input.frequency) this.frequency = input.frequency;
        this.interval = setInterval(this.scanRoutine.bind(this), this.frequency);

    }

    async scanRoutine() {
        console.log("scanning")
        try {
            const devices = await this.scanDevices();
            devices.forEach((device, index) => {
                if (!_.isEqual(device, this.devices[index])) {

                    delete device["image_url"];
                    delete device["markers"];

                    this.emit('data', device)

                    this.devices[index] = device;
                }
            });

        } catch (error) {
            this.emit('error', error);
        }
    }
    scanDevices() {
        return new Promise((resolve, reject) => {
            axios.get(
                    `${ this.endpoint}/devices`,
                    this.config
                ).then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error);
                })
        });

    }

}

module.exports = API_Interface;