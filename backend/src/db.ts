import Database from "better-sqlite3";

const db = new Database('journal.db')
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

const usersTableQuery = `
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY,
		name TEXT NOT NULL,
		email TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL,
		created_at TEXT DEFAULT (datetime('now'))
);
`
const entriesTableQuery = `
    CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    feeling TEXT,
    content TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`
db.exec(usersTableQuery)
db.exec(entriesTableQuery)

console.log('Database READY!!!')
export default db
