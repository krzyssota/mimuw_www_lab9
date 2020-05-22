import { Meme } from './Meme'

export class MemeList {
    private list: Meme[]

    constructor() {
        this.list = [];
    }

    public addMeme(meme: Meme): void {
        this.list.push(meme);
    }

    public getMostExpensive(): Meme[] {
        this.list.sort((m1,m2) => m2.getPrice() - m1.getPrice());
        return this.list.slice(0, 3);
    }

    public getMeme(id: number): Meme {
        const ans: Meme = this.list.find((m) => m.getId() === id)
        if(typeof ans === 'undefined') return null;
        else return ans;
    }
}