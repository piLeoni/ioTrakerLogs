#!/usr/bin/env node

const Database = require('better-sqlite3');

const Writer = require('./DBWrite.js')
const Reader = require('./DBRead.js')



class DBInterface {

    constructor(input) {
        this.database = input.dbPath;
        this.table = input.dbTable;
        this.db = new Database(this.database)
        this.writer = new Writer(this.db, this.table)
        this.reader = new Reader(this.db, this.table);
    }

    insert(message) {
        const check = this.reader.selectWhere(`id='${message.id}' AND location_timestamp='${message.location_timestamp}'`, 1);
        if (check.length > 0) {
            console.log("log already exhisting")
        } else {
            console.log("log insert")

            this.writer.insert(message);

        }
    }
    update(message) {
        this.writer.update(message.payload)
    }

    getAll() {
        return this.reader.selectAll();
    }



}
module.exports = DBInterface;