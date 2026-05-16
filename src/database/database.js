import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("financas.db");

export function createTable() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS gastos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT,
      valor REAL,
      categoria TEXT,
      data TEXT
    );
  `);
}

export function addExpense(descricao, valor, categoria, data) {
    db.runSync(
        `INSERT INTO gastos (descricao, valor, categoria, data) VALUES (?, ?, ?, ?)`,
        [descricao, valor, categoria, data]
    );
}

export function getExpenses() {
    return db.getAllSync(
        `SELECT * FROM gastos ORDER BY id DESC`
    );
}
export default db;