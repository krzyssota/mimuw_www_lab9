"use strict";
exports.__esModule = true;
exports.MemeList = void 0;
var MemeList = /** @class */ (function () {
    function MemeList() {
        this.list = [];
    }
    MemeList.prototype.addMeme = function (meme) {
        this.list.push(meme);
    };
    MemeList.prototype.getMostExpensive = function () {
        this.list.sort(function (m1, m2) { return m2.getPrice() - m1.getPrice(); });
        return this.list.slice(0, 3);
    };
    MemeList.prototype.getMeme = function (id) {
        var ans = this.list.find(function (m) { return m.getId() === id; });
        if (typeof ans === 'undefined')
            return null;
        else
            return ans;
    };
    return MemeList;
}());
exports.MemeList = MemeList;
