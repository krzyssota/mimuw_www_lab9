import { Meme } from './Meme'
import * as sqlite from 'sqlite3';
import { rejects } from 'assert';
import { get_meme } from './DataHandler';

export class MemeList {
    private list: Meme[]

    constructor() {
        this.list = [];
    }

    public addMeme(db :sqlite.Database, meme: Meme): Promise<void> {
        return meme.save_to_db(db);
    }

    public getMostExpensive(db: sqlite.Database): Promise<Meme[]> {
        return new Promise((resolve, reject) => {
            const sqlQ = `SELECT meme_id, price FROM memes_prices WHERE price_id = (SELECT MAX(price_id) FROM memes_prices AS p WHERE p.meme_id = memes_prices.meme_id) ORDER BY price DESC LIMIT 3;`
            const best3: Meme[] = [];
            db.all(sqlQ, async (err, rows) => {
                if(err) {
                    console.error('rejectuje 3 best memes')
                    reject('DB error while 3 best memes');
                }
                for (const row of rows) {
                    try {
                        best3.push(await get_meme(db, row.meme_id));
                    } catch(err) {
                        console.error('getting one of top 3 memes');
                    }
                }
                resolve(best3);
            })
        })
    }

    public getMeme(db: sqlite.Database, id: number): Promise<Meme> {
        return new Promise(
            (resolve, reject) => {
                let meme: Meme;
                // no sql injection because id is a number
                db.all(`SELECT id, name, url FROM memes WHERE id == ?;`, [id],
                    (err, rows) => {
                        if(err) {
                            console.error('rejectuje selecting meme')
                            reject('DB error while selecting Meme');
                        }
                        for (const row of rows) {
                            meme = new Meme(row.id, row.name, row.url);
                        }
                        db.all(`SELECT price_id, meme_id, price, price_author FROM memes_prices WHERE meme_id = ? ORDER BY price_id;`, [id],
                            (err, rows) => {
                                if(err) {
                                    console.error('rejectuje select cena')
                                    reject('DB error while selecting prices');
                                }
                                for (const row of rows) {
                                    meme.addPrice(row.price, row.price_author);
                                }
                                resolve(meme);
                            }
                        )
                    }
                )
            }
        )
    }
}