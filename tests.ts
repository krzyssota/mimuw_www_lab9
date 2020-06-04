import { expect } from 'chai';
import { driver } from 'mocha-webdriver';
import { Meme } from './src/Meme';
import { MemeList } from './src/MemeList';
// export TS_NODE_COMPILER_OPTIONS='{"lib": ["ES2015"]}';
// npx mocha -r ts-node/register --timeout 20000 tests.ts

describe('Meme class methods', function () {

    it('price be changed', () => {
        const meme: Meme = new Meme(1, 'a', 1, 'a');
        const newPrice: number = 2;
        meme.changePrice(newPrice);
        expect(meme.getPrice()).to.be.equal(newPrice);
    });

    it('price listing updated', () => {
        const meme: Meme = new Meme(1, 'a', 1, 'a');
        const newPrice: number = 2;
        meme.changePrice(newPrice);
        expect(meme.getListing()).to.eql([1, newPrice]);
    });

})

describe('MemeList class methods', function () {

    it('return 3 most expensive memes', () => {

        const m1: Meme = new Meme(1, 'a', 1, 'a');
        const m2: Meme = new Meme(2, 'a', 2, 'a');
        const m3: Meme = new Meme(3, 'a', 3, 'a');
        const m4: Meme = new Meme(4, 'a', 4, 'a');
        const m5: Meme = new Meme(5, 'a', 1, 'a');
        const mList: MemeList = new MemeList();

        mList.addMeme(m1);
        mList.addMeme(m2);
        mList.addMeme(m3);
        mList.addMeme(m4);
        mList.addMeme(m5);

        expect(mList.getMostExpensive()).to.eql([m4, m3, m2]);
    });

})

describe('MemeList class methods 2', function () {

    it('return sensible data when when calling get most expensive memes for memeList containing < 3 memes', () => {

        const m1: Meme = new Meme(1, 'a', 1, 'a');
        const m2: Meme = new Meme(2, 'a', 2, 'a');
        const mList: MemeList = new MemeList();

        mList.addMeme(m1);
        mList.addMeme(m2);

        expect(mList.getMostExpensive()).to.eql([m2, m1]);
    });

})

describe('MemeList class methods 3', function () {

    it('return sensible data when when calling get most expensive memes for empty memeList', () => {

        const mList: MemeList = new MemeList();

        expect(mList.getMostExpensive()).to.eql([]);
    });

})
