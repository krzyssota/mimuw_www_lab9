"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meme = void 0;
class Meme {
    constructor(id, name, url) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.priceListing = new Array();
        this.currectPriceId = 1;
    }
    addPrice(p, u) {
        console.log('before ' + this.priceListing.length);
        this.priceListing.push([p, u]);
        console.log('after ' + this.priceListing.length);
        for (const [x, y] of this.priceListing) {
            console.log('para ' + x + ' ' + y);
        }
    }
    getPrice() {
        return -1;
    }
    changePrice(newPrice) {
        // todo
    }
    getListing() {
        return this.priceListing.slice(0);
        // return this.priceListing
    }
    getListingFromNewest() {
        const res = this.priceListing.slice(0);
        return res.reverse();
    }
    getId() {
        return this.id;
    }
    save_to_db(db) {
        return new Promise((resolve, reject) => {
            db.run(`INSERT OR REPLACE INTO memes (id, name, url) VALUES ('${this.id}', '${this.name}', '${this.url}');`, (err) => {
                if (err) {
                    reject(`DB Error while inserting into memes`);
                    return;
                }
            });
            // console.log('probuje dodac cene ' + this.currectPriceId + ', ' + this.id + ', ' + this.priceListing[0][0] + ', ' + this.priceListing[0][1])
            db.run(`INSERT OR REPLACE INTO memes_prices (price_id, meme_id, price, price_author) VALUES ('${this.currectPriceId}', '${this.id}', '${this.priceListing[0][0]}', '${this.priceListing[0][1]}');`, (err) => {
                if (err) {
                    reject(`DB Error while inserting into memes_prices`);
                    return;
                }
                resolve();
            });
        });
    }
}
exports.Meme = Meme;
//# sourceMappingURL=Meme.js.map