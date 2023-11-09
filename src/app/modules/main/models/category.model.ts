export class CategoryModel {
    categoryID!: string;
    iconName!: string;
    categoryName!: string;
    constructor(data: any) {
        this.categoryID = data.categoryID || ""
        this.iconName = data.iconName || ""
        this.categoryName = data.categoryName || ""
     }
}