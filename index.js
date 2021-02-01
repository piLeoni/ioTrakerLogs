require('dotenv').config();
const LORA = require("./LORA_interface");
const DB = require('./DB_interface');
const API = require('./API_interface');

const lora = new LORA({ endpoint: process.env.LORA_ENDPOINT, token: process.env.LORA_TOKEN });
const db = new DB({ dbPath: process.env.DB_PATH, dbTable: process.env.DB_TABLE });
const api = new API({ port: process.env.API_PORT, database: db });

api.listen();
lora.init({ frequency: 60000 });
lora.on('error', error => { throw error })
lora.on('data', data => {
    db.insert(data);
})