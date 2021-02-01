const Database = require('better-sqlite3');

class DBWrite {
    constructor(db, table) {
        this.table = table;
        this.db = db;
    }

    insert(message) {
        try {
            console.log("inserting", message)
            const insert = this.db.prepare(`INSERT INTO ${this.table} (${Object.keys(message).join(',')}) VALUES (${Object.keys(message).map(el => ' @' + el).join(',')})`);
            const insertOne = this.db.transaction((row) => {
                insert.run(row);
            });
            insertOne(message);
            return message;
        } catch (error) {
            throw error
        }

    }


}


module.exports = DBWrite;