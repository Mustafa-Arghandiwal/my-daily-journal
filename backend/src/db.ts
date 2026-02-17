import Database from "better-sqlite3";

const db = new Database('journal.db')
db.pragma('journal_mode = WAL');

const query = `
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY,
		username STRING NOT NULL UNIQUE,
		email TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL
);
`

db.exec(query)

console.log('Database READY!!!')
export default db
