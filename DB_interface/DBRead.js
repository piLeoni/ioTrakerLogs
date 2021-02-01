class DBRead {
    constructor(db, table) {
        this.table = table;
        this.db = db;
    }

    // select entries based on a WHERE that we receive, as well as the limit
    selectAll() {
        try {
            const stmt = this.db.prepare(`SELECT * FROM ${this.table}`);
            const result = stmt.all();
            return result;
        } catch (error) {
            throw error;
        }
    }

    // select entries based on a WHERE that we receive, as well as the limit
    selectWhere(where, limit) {
        try {
            const stmt = this.db.prepare(`SELECT * FROM ${this.table} WHERE ${where} LIMIT ${limit}`);
            const result = stmt.all();
            return result;
        } catch (error) {
            throw error;
        }
    }


    // needed from getStats, it get the count instead of the objects
    countWhere(where) {
        try {
            const stmt = this.db.prepare(`SELECT COUNT(*) as amount FROM ${this.table} WHERE ${where}`);
            const result = stmt.get();
            return result;
        } catch (error) {
            throw error;
        }

    }

}

module.exports = DBRead;