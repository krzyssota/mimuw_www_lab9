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
exports.get_meme = exports.headerMeme = exports.mostExpensive = exports.mList = void 0;
const MemeList_1 = require("./MemeList");
const Meme_1 = require("./Meme");
const DatabaseHandler_1 = require("./DatabaseHandler");
exports.mList = new MemeList_1.MemeList();
exports.mostExpensive = [
    { 'id': 10,
        'name': 'Gold',
        'price': 1000,
        'url': 'https://i.redd.it/h7rplf9jt8y21.png' },
    { 'id': 9,
        'name': 'Platinum',
        'price': 1100,
        'url': 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg' },
    { 'id': 8,
        'name': 'Elite',
        'price': 1200,
        'url': 'https://i.imgflip.com/30zz5g.jpg' }
];
const db = DatabaseHandler_1.make_db();
exports.mostExpensive.forEach((m) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meme = new Meme_1.Meme(m.id, m.name, m.url);
        meme.addPrice(m.price, 'admin');
        yield exports.mList.addMeme(db, meme);
    }
    catch (err) {
        throw err;
    }
}));
/* get_meme('10').changePrice(300);
get_meme('10').changePrice(400);
get_meme('10').changePrice(500);
get_meme('10').changePrice(600);
get_meme('9').changePrice(200);
get_meme('9').changePrice(150);
get_meme('8').changePrice(100); */
exports.headerMeme = new Meme_1.Meme(7, 'www', 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/99064183_2958683650874355_4126039502034567168_n.jpg?_nc_cat=111&_nc_sid=110474&_nc_ohc=Tg_cXzJMqzkAX8eXnIa&_nc_ht=scontent-waw1-1.xx&oh=edfe5f1f3f341cab45805435012023ee&oe=5EEC8DB2');
exports.headerMeme.addPrice(10, 'admin');
function get_meme(db, idStr) {
    const idNum = +idStr;
    if (!isNaN(idNum)) {
        // console.log('will look for ' + idNum)
        return exports.mList.getMeme(db, idNum);
    }
}
exports.get_meme = get_meme;
function f() {
    return __awaiter(this, void 0, void 0, function* () {
        const m = new Meme_1.Meme(101, 'a', 'a');
        m.addPrice(1, 'admin');
        m.save_to_db(db).then(() => {
            console.log('jestem w then');
            db.all(`SELECT id, name, url FROM memes WHERE id == '101';`, (err, row) => {
                if (err) {
                    console.error('DB error while selecting Meme');
                }
                console.log('row = ' + row[0] + ' ' + row[1]);
            });
        }).catch(() => { console.error('errrror'); });
        const clickedMeme = yield exports.mList.getMeme(db, 8);
        if (!clickedMeme) {
            console.error('nie znaleziono memsa dlaczego');
        }
        console.log('mems: ' + clickedMeme);
    });
}
// f();
//# sourceMappingURL=DataHandler.js.map