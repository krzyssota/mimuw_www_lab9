import * as sqlite from 'sqlite3';
import { init } from './db_init';
sqlite.verbose();

export async function createMemeTable(db: sqlite.Database): Promise<void> {
    return new Promise((resolve, reject) => {
        db.all(`SELECT COUNT(*) AS cnt FROM sqlite_master WHERE type='table' and name='memes';`, (err, rows) => {
            if (err) {
                reject('DB Error1');
                return;
            }

            if (rows[0].cnt === 1) {
                console.log('Database tables already exist.');
                resolve();
                return;
            }

            console.log('Creating database tables...');
            db.run(`CREATE TABLE memes (
              id INTEGER PRIMARY KEY,
              name TEXT NOT NULL,
              url TEXT NOT NULL);`,
              [], (err: any) => {
                if (err) {
                    reject('DB Error2');
                    return;
                }
                console.log('Done 1.');
                resolve();
            });
        });
    })
}
export async function createMemePricesTable(db: sqlite.Database): Promise<void> {
    return new Promise((resolve, reject) => {
        db.all(`SELECT COUNT(*) AS cnt FROM sqlite_master WHERE type='table' and name='memes_prices';`, (err, rows) => {
            if (err) {
                reject('DB Error1');
                return;
            }

            if (rows[0].cnt === 1) {
                console.log('Database tables already exist.');
                resolve();
                return;
            }

            console.log('Creating database tables...');
            db.run(
              `CREATE TABLE memes_prices (
                price_id INTEGER NOT NULL,
                meme_id INTEGER NOT NULL,
                price INTEGER NOT NULL,
                price_author TEXT NOT NULL,
                PRIMARY KEY(price_id, meme_id));`, // todo not null
              [],
              (err: any) => {
                if (err) {
                    reject('DB Error2');
                    return;
                }
                console.log('Done 2.');
                resolve();
            });
        });
    })
}
export async function createUsersTable(db: sqlite.Database): Promise<void> {
    return new Promise((resolve, reject) => {
        db.all(`SELECT COUNT(*) AS cnt FROM sqlite_master WHERE type='table' and name='users';`, (err, rows) => {
            if (err) {
                reject('DB Error 3.1');
                return;
            }

            if (rows[0].cnt === 1) {
                console.log('Database tables already exist.');
                resolve();
                return;
            }

            console.log('Creating database tables...');
            db.run(`CREATE TABLE users (
              login TEXT NOT NULL,
              password TEXT NOT NULL,
              PRIMARY KEY(login));`,
              [],
              (err2: any) => {
                if (err2) {
                    console.error(err2);
                    reject('DB Error 3.2');
                    return;
                }
                console.log('Done 3');
                resolve();
            });
        });
    })
}


export function make_db() {
    sqlite.verbose();
    const db = new sqlite.Database('memes.db', (err) => {
        if (err) return console.error(err.message);
    });
    return db;
}