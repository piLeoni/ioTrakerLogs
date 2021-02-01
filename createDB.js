#!/usr/bin/env node

require('dotenv').config()

const Database = require('better-sqlite3');

const db = new Database(process.env.DB_PATH, { verbose: console.log });

db.prepare(`DROP TABLE IF EXISTS ${process.env.DB_TABLE}`).run();

const stmt = db.prepare(`CREATE TABLE logs(
        id TEXT,
        name TEXT,
        description TEXT,
        location_lat REAL,
        location_lng REAL,
        location_accuracy REAL,
        location_timestamp TEXT,
        battery_level REAL,
        temperature REAL,
        signal_strength REAL,
        last_seen TEXT,
        status TEXT
        )`);
stmt.run();