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
exports.Meme = void 0;
var Meme = /** @class */ (function () {
    function Meme(id, name, url) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.priceListing = new Array();
        this.currectPriceId = 1;
    }
    Meme.prototype.addPrice = function (p, u) {
        this.priceListing.push([p, u]);
    };
    Meme.prototype.getPrice = function () {
        return [this.priceListing[this.priceListing.length - 1][0], this.priceListing[this.priceListing.length - 1][1]];
    };
    Meme.prototype.changePrice = function (db, newPrice, author) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var sqlQ = "BEGIN TRANSACTION;\n                            INSERT OR ROLLBACK INTO memes_prices (price_id, meme_id, price, price_author)\n                            VALUES ((\n                                SELECT MAX(price_id)\n                                FROM memes_prices AS p\n                                WHERE p.meme_id = " + _this.id + "\n                            ) + 1, " + _this.id + ", '" + escape(newPrice.toString()) + "', '" + escape(author) + "');\n                        COMMIT;";
            db.exec(sqlQ, function (err) { return __awaiter(_this, void 0, void 0, function () {
                var sqliteBusyErrno;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!err) return [3 /*break*/, 3];
                            sqliteBusyErrno = 5;
                            if (!(err.errno === sqliteBusyErrno)) return [3 /*break*/, 2];
                            return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 100); })];
                        case 1:
                            _a.sent();
                            db.exec(sqlQ, function (err2) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (err2) {
                                        console.error('rejectuje change price 2. try');
                                        reject(new Error('DB error while change price 2. try'));
                                    }
                                    this.addPrice(newPrice, author);
                                    resolve();
                                    return [2 /*return*/];
                                });
                            }); });
                            _a.label = 2;
                        case 2:
                            console.error('rejectuje change price');
                            reject(new Error('DB error while change price'));
                            _a.label = 3;
                        case 3:
                            this.addPrice(newPrice, author);
                            resolve();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    Meme.prototype.getListing = function () {
        return this.priceListing.slice(0);
    };
    Meme.prototype.getListingFromNewest = function () {
        var res = this.priceListing.slice(0);
        return res.reverse();
    };
    Meme.prototype.getId = function () {
        return this.id;
    };
    Meme.prototype.save_to_db = function (db) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            db.run("INSERT OR REPLACE INTO memes (id, name, url) VALUES (?, ?, ?);", [_this.id, _this.name, _this.url], function (err) {
                if (err) {
                    reject("DB Error while inserting into memes");
                    return;
                }
            });
            db.run("INSERT OR REPLACE INTO memes_prices (price_id, meme_id, price, price_author) VALUES (?, ?, ?, ?);", [_this.currectPriceId, _this.id, _this.priceListing[0][0], _this.priceListing[0][1]], function (err) {
                if (err) {
                    reject("DB Error while inserting into memes_prices");
                    return;
                }
                resolve();
            });
        });
    };
    return Meme;
}());
exports.Meme = Meme;
