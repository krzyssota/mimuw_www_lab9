"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.make_db = void 0;
const sqlite = __importStar(require("sqlite3"));
sqlite.verbose();
function createMemeTable(db) {
    return __awaiter(this, void 0, void 0, function* () {
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
              name TEXT,
              url TEXT
              );`, [], (err) => {
                    if (err) {
                        reject('DB Error2');
                        return;
                    }
                    console.log('Done 1.');
                    resolve();
                });
            });
        });
    });
}
function createMemePricesTable(db) {
    return __awaiter(this, void 0, void 0, function* () {
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
                db.run(`CREATE TABLE memes_prices (
                price_id INTEGER,
                meme_id INTEGER,
                price INTEGER,
                price_author TEXT,
                PRIMARY KEY(price_id, meme_id));`, [], (err) => {
                    if (err) {
                        reject('DB Error2');
                        return;
                    }
                    console.log('Done 2.');
                    resolve();
                });
            });
        });
    });
}
function make_db() {
    sqlite.verbose();
    const db = new sqlite.Database('memes.db', (err) => {
        if (err)
            return console.error(err.message);
    });
    return db;
}
exports.make_db = make_db;
const db = make_db();
createMemeTable(db).then(() => {
    createMemePricesTable(db).catch((err) => { console.log(err); });
}).catch((err) => { console.log(err); });
//# sourceMappingURL=DatabaseHandler.js.map