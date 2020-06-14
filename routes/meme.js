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
var express = require("express");
var DataHandler_1 = require("../src/DataHandler");
var csurf = require("csurf");
var DatabaseHandler_1 = require("../src/DatabaseHandler");
var router = express.Router();
var csrfProtection = csurf({ cookie: true });
router.get('/:memeId(\\d+)', csrfProtection, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var db, clickedMeme, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    db = DatabaseHandler_1.make_db();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, DataHandler_1.get_meme(db, req.params.memeId)
                        // await new Promise(r => setTimeout(r, 50)); // todo why doesnt it wait
                    ];
                case 2:
                    clickedMeme = _a.sent();
                    // await new Promise(r => setTimeout(r, 50)); // todo why doesnt it wait
                    db.close();
                    res.render('meme', { meme: clickedMeme, csrfToken: req.csrfToken() });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    db.close();
                    throw err_1;
                case 4: return [2 /*return*/];
            }
        });
    });
});
router.post('/:memeId(\\d+)', csrfProtection, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var db, modifiedMeme, priceAny, price, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!req.session.user) {
                        // res.render('meme', { meme: modifiedMeme, csrfToken: req.csrfToken() })
                        res.redirect('/meme' + req.path);
                        return [2 /*return*/];
                    }
                    db = DatabaseHandler_1.make_db();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, DataHandler_1.get_meme(db, req.params.memeId)
                        // await new Promise(r => setTimeout(r, 500)); // resolve był w złym miejscu
                    ];
                case 2:
                    modifiedMeme = _a.sent();
                    priceAny = +req.body.price;
                    if (!!isNaN(priceAny)) return [3 /*break*/, 4];
                    price = priceAny;
                    return [4 /*yield*/, modifiedMeme.changePrice(db, price, req.session.user)
                        // await new Promise(r => setTimeout(r, 500)); // todo why doesnt it wait
                    ];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    db.close();
                    res.render('meme', { meme: modifiedMeme, csrfToken: req.csrfToken() });
                    return [3 /*break*/, 6];
                case 5:
                    err_2 = _a.sent();
                    db.close();
                    throw err_2;
                case 6: return [2 /*return*/];
            }
        });
    });
});
module.exports = router;
