export class Meme {
    private id: number
    private name: string
    private price: number
    private url: string
    private priceListing: number[]

    constructor(id: number, name: string, price: number, url: string) {
        this.id = id
        this.name = name
        this.price = price
        this.url = url
        this.priceListing = [price]
    }

    public changePrice(newPrice: number): void {
        this.priceListing.push(newPrice);
        this.price = newPrice;
    }

    public getPrice(): number {
        return this.price;
    }

    public getListing(): number[] {
        return this.priceListing;
    }

    public getListingFromNewest(): number[] {
        const res: number[]  = Object.assign([], this.priceListing);
        return res.reverse();
    }

    public getId(): number {
        return this.id;
    }
}