"use strict";
exports.__esModule = true;
exports.get_meme = exports.headerMeme = exports.mList = exports.mostExpensive = void 0;
var MemeList_1 = require("./MemeList");
var Meme_1 = require("./Meme");
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
exports.mList = new MemeList_1.MemeList();
exports.mostExpensive.forEach(function (m) {
    exports.mList.addMeme(new Meme_1.Meme(m.id, m.name, m.price, m.url));
});
get_meme('10').changePrice(300);
get_meme('10').changePrice(400);
get_meme('10').changePrice(500);
get_meme('10').changePrice(600);
get_meme('9').changePrice(200);
get_meme('9').changePrice(150);
get_meme('8').changePrice(100);
exports.headerMeme = new Meme_1.Meme(7, 'www', 10, 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/99064183_2958683650874355_4126039502034567168_n.jpg?_nc_cat=111&_nc_sid=110474&_nc_ohc=Tg_cXzJMqzkAX8eXnIa&_nc_ht=scontent-waw1-1.xx&oh=edfe5f1f3f341cab45805435012023ee&oe=5EEC8DB2');
function get_meme(idStr) {
    var idNum = +idStr;
    if (!isNaN(idNum))
        return exports.mList.getMeme(idNum);
    return null;
}
exports.get_meme = get_meme;
