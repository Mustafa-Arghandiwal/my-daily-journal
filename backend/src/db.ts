import Database from "better-sqlite3";

const db = new Database('journal.db')
db.pragma('journal_mode = WAL');

const query = `
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY,
		name TEXT NOT NULL,
		email TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL,
		created_at TEXT DEFAULT (datetime('now'))
);
`
db.exec(query)

console.log('Database READY!!!')
export default db
