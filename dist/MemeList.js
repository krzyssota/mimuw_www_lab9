"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemeList = void 0;
const Meme_1 = require("./Meme");
const DataHandler_1 = require("./DataHandler");
class MemeList {
    constructor() {
        this.list = [];
    }
    addMeme(db, meme) {
        return meme.save_to_db(db);
    }
    getMostExpensive(db) {
        return new Promise((resolve, reject) => {
            const sqlQ = `SELECT meme_id, price FROM memes_prices WHERE price_id = (SELECT MAX(price_id) FROM memes_prices AS p WHERE p.meme_id = memes_prices.meme_id) ORDER BY price DESC LIMIT 3;`;
            // const sqlA = `SELECT meme_id, price FROM memes_prices WHERE price_id = (SELECT MAX(price_id) FROM memes_prices AS p WHERE p.meme_id = memes_prices.meme_id) ORDER BY price DESC LIMIT 3;`
            const best3 = [];
            db.all(sqlQ, (err, rows) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.error('rejectuje 3 best memes');
                    reject('DB error while 3 best memes');
                }
                for (const row of rows) {
                    try {
                        best3.push(yield DataHandler_1.get_meme(db, row.meme_id));
                    }
                    catch (err) {
                        console.error('getting one of top 3 memes');
                    }
                }
                // console.log('zwracam tablice rozmiary ' +best3.length);
                resolve(best3);
            }));
        });
    }
    getMeme(db, id) {
        return new Promise((resolve, reject) => {
            let meme;
            db.all(`SELECT id, name, url FROM memes WHERE id == '${id}';`, (err, rows) => {
                if (err) {
                    console.error('rejectuje selecting meme');
                    reject('DB error while selecting Meme');
                }
                for (const row of rows) {
                    meme = new Meme_1.Meme(row.id, row.name, row.url);
                    // console.log('podczas seleta szczegoly ' + row.id + ' ' + row.name)
                }
                db.all(`SELECT price_id, meme_id, price, price_author FROM memes_prices WHERE meme_id = '${id}' ORDER BY price_id;`, (err, rows) => {
                    if (err) {
                        console.error('rejectuje select cena');
                        reject('DB error while selecting prices');
                    }
                    for (const row of rows) {
                        meme.addPrice(row.price, row.price_author);
                        console.log(' podczas selecta cena ' + row.price + ' ' + row.price_author);
                    }
                });
                // console.log('zwracam memsa')
                resolve(meme);
            });
        });
    }
}
exports.MemeList = MemeList;
//# sourceMappingURL=MemeList.js.map