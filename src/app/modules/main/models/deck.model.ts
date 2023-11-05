export class DeckModel {
    deckID!: string;
    categoryID!: string;
    priority!: number;
    constructor(data: any) {
        this.deckID = data.deckID || ""
        this.categoryID = data.categoryID || ""
        this.priority = data.priority || 0
     }
}