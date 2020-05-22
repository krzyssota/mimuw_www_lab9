"use strict";
exports.__esModule = true;
exports.Meme = void 0;
var Meme = /** @class */ (function () {
    function Meme(id, name, price, url) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.url = url;
        this.priceListing = [price];
    }
    Meme.prototype.changePrice = function (newPrice) {
        this.priceListing.push(newPrice);
        this.price = newPrice;
    };
    Meme.prototype.getPrice = function () {
        return this.price;
    };
    Meme.prototype.getListing = function () {
        return this.priceListing;
    };
    Meme.prototype.getListingFromNewest = function () {
        var res = Object.assign([], this.priceListing);
        return res.reverse();
    };
    Meme.prototype.getId = function () {
        return this.id;
    };
    return Meme;
}());
exports.Meme = Meme;
