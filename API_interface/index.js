const express = require('express');
const GeoJSON = require('geojson');
// const app = express()
// const port = 3000



// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })

class APIInterface {

    constructor(input) {
        this.app = express();
        this.database = input.database;
        this.port = input.port || 3000;
        this.app.get('/getall/', (req, res) => {
            const response = this.database.getAll();
            res.send(this.toGeoJSON(response))
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Api listening at http://localhost:${this.port}`)
        })
    }
    toGeoJSON(input) {
        return GeoJSON.parse(input, {
            Point: ['location_lat', 'location_lng'],
            include: [
                "id",
                "name",
                "description",
                "location_accuracy",
                "location_timestamp",
                "battery_level",
                "temperature",
                "signal_strength",
                "last_seen",
                "status"
            ]
        });

    }
}

module.exports = APIInterface;