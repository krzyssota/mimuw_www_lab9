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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.MemeList = void 0;
var Meme_1 = require("./Meme");
var DataHandler_1 = require("./DataHandler");
var MemeList = /** @class */ (function () {
    function MemeList() {
        this.list = [];
    }
    MemeList.prototype.addMeme = function (db, meme) {
        return meme.save_to_db(db);
    };
    MemeList.prototype.getMostExpensive = function (db) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var sqlQ = "SELECT meme_id, price FROM memes_prices WHERE price_id = (SELECT MAX(price_id) FROM memes_prices AS p WHERE p.meme_id = memes_prices.meme_id) ORDER BY price DESC LIMIT 3;";
            var best3 = [];
            db.all(sqlQ, function (err, rows) { return __awaiter(_this, void 0, void 0, function () {
                var _i, rows_1, row, _a, _b, err_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (err) {
                                console.error('rejectuje 3 best memes');
                                reject('DB error while 3 best memes');
                            }
                            _i = 0, rows_1 = rows;
                            _c.label = 1;
                        case 1:
                            if (!(_i < rows_1.length)) return [3 /*break*/, 6];
                            row = rows_1[_i];
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            _b = (_a = best3).push;
                            return [4 /*yield*/, DataHandler_1.get_meme(db, row.meme_id)];
                        case 3:
                            _b.apply(_a, [_c.sent()]);
                            return [3 /*break*/, 5];
                        case 4:
                            err_1 = _c.sent();
                            console.error('getting one of top 3 memes');
                            return [3 /*break*/, 5];
                        case 5:
                            _i++;
                            return [3 /*break*/, 1];
                        case 6:
                            resolve(best3);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    MemeList.prototype.getMeme = function (db, id) {
        return new Promise(function (resolve, reject) {
            var meme;
            // no sql injection because id is a number
            db.all("SELECT id, name, url FROM memes WHERE id == ?;", [id], function (err, rows) {
                if (err) {
                    console.error('rejectuje selecting meme');
                    reject('DB error while selecting Meme');
                }
                for (var _i = 0, rows_2 = rows; _i < rows_2.length; _i++) {
                    var row = rows_2[_i];
                    meme = new Meme_1.Meme(row.id, row.name, row.url);
                }
                db.all("SELECT price_id, meme_id, price, price_author FROM memes_prices WHERE meme_id = ? ORDER BY price_id;", [id], function (err, rows) {
                    if (err) {
                        console.error('rejectuje select cena');
                        reject('DB error while selecting prices');
                    }
                    for (var _i = 0, rows_3 = rows; _i < rows_3.length; _i++) {
                        var row = rows_3[_i];
                        meme.addPrice(row.price, row.price_author);
                    }
                    resolve(meme);
                });
            });
        });
    };
    return MemeList;
}());
exports.MemeList = MemeList;
