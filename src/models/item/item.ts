export interface Item {
    _id: number;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
    brand: string;
    categoryIds: string[];
    description: string;
    countInStock: number;
    size: string;
}