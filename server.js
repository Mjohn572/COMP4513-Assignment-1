import { readFileSync } from 'fs';
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('./assign1/data/songs-2026.db');

const createTables = readFileSync('./assign1/sql/createTables.sql');
db.exec(createTables);

const stmt = db.prepare(sql);

console.log(rows);