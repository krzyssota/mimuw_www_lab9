import * as sqlite from 'sqlite3';

export class Meme {
    private id: number
    private name: string
    private url: string
    private priceListing: [number, string][]
    private currectPriceId: number

    constructor(id: number, name: string, url: string) {
        this.id = id
        this.name = name
        this.url = url
        this.priceListing = new Array<[number, string]>();
        this.currectPriceId = 1;
    }

    public addPrice(p: number, u: string):void {
        this.priceListing.push([p, u]);
    }

    public getPrice(): [number, string]{
        return [this.priceListing[this.priceListing.length-1][0], this.priceListing[this.priceListing.length-1][1]]
    }

    public changePrice(db: sqlite.Database ,newPrice: number, author: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const sqlQ = `BEGIN TRANSACTION;
                            INSERT OR ROLLBACK INTO memes_prices (price_id, meme_id, price, price_author)
                            VALUES ((
                                SELECT MAX(price_id)
                                FROM memes_prices AS p
                                WHERE p.meme_id = ${this.id}
                            ) + 1, ${this.id}, '${escape(newPrice.toString())}', '${escape(author)}');
                        COMMIT;`
            db.exec(sqlQ, async (err: NodeJS.ErrnoException) => {
                if(err) {
                    const sqliteBusyErrno: number = 5;
                    if(err.errno === sqliteBusyErrno) { // try for the second time
                        await new Promise(r => setTimeout(r, 100));
                        db.exec(sqlQ, async (err2) => {
                            if(err2) {
                                console.error('rejectuje change price 2. try')
                                reject(new Error('DB error while change price 2. try'));
                            }
                            this.addPrice(newPrice, author);
                            resolve();
                            return;
                        })
                    }
                    console.error('rejectuje change price')
                    reject( new Error('DB error while change price'));
                }
                this.addPrice(newPrice, author);
                resolve();
            })
        })
    }

    public getListing(): [number, string][] {
        return this.priceListing.slice(0);
    }

    public getListingFromNewest(): [number, string] [] {
        const res: [number, string] []  = this.priceListing.slice(0);
        return res.reverse();
    }

    public getId(): number {
        return this.id;
    }

    public save_to_db(db: sqlite.Database): Promise<void> {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT OR REPLACE INTO memes (id, name, url) VALUES (?, ?, ?);`, [this.id, this.name, this.url],
                (err) => {
                    if(err) {
                        reject(`DB Error while inserting into memes`);
                        return;
                    }
                }
            );
            db.run(
                `INSERT OR REPLACE INTO memes_prices (price_id, meme_id, price, price_author) VALUES (?, ?, ?, ?);`, [this.currectPriceId, this.id, this.priceListing[0][0], this.priceListing[0][1]],
                (err) => {
                    if(err) {
                        reject(`DB Error while inserting into memes_prices`);
                        return;
                    }
                    resolve();
                }
            );
        });
    }
}