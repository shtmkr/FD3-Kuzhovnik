interface IStorageEngine {
    addItem(item: Product): any;
    getItem(index: number): Product;
    getCount(): number;
}
class Product {
    constructor(private name: string, private scale: number) { };
    public getScale(): number {
        return this.scale;
    }
    public getName(): string {
        return this.name;
    }
}
class ScalesStorageEngineArray implements IStorageEngine {
    items: Product[] = [];
    addItem(item: Product): void {
        this.items.push(item);
    }
    getItem(index: number): Product {
        return this.items[index];
    }
    getCount(): number {
        return this.items.length;
    }
}
class ScalesStorageEngineLocalStorage implements IStorageEngine {
    addItem(item: Product): void {
        let key: string = localStorage.length.toString();
        let value: string = JSON.stringify(item);
        localStorage.setItem('product' + key, value);
    }
    getItem(index: number): Product {
        let product: string = localStorage.getItem('product' + index.toString());
        let parsed: object = JSON.parse(product);
        return Object.assign(new Product('', null), parsed);
    }
    getCount(): number {
        return localStorage.length;
    }
}
class Scales<StorageEngine extends IStorageEngine> {
    constructor(private storage: StorageEngine) { };
    add(product: Product): void {
        this.storage.addItem(product);
    }
    getSumScale(): number {
        let sum: number = 0;
        let item: Product;
        for (let i = 0; i < this.storage.getCount(); i++){
            item = this.storage.getItem(i);
            console.log(item);
            sum += item.getScale();
        }
        return sum;
    }
    getNameList(): string[] {
        let nameList: string[] = [];
        let item: Product;
        for (let i = 0; i < this.storage.getCount(); i++){
            item = this.storage.getItem(i);
            nameList.push(item.getName());
        }
        return nameList;
    }
}
console.log('******************ScalesStorageEngineArray******************');
let storage = new ScalesStorageEngineArray;
let scales_array = new Scales<ScalesStorageEngineArray>(storage);
let product1 = new Product('product1', 100);
let product2 = new Product('product2', 200);
let product3 = new Product('product3', 100);

scales_array.add(product1);
scales_array.add(product2);
scales_array.add(product3);

console.log(`Вес продуктов: ${scales_array.getSumScale()}`);
console.log(`Названия продуктов: ${scales_array.getNameList()}`);
console.log('******************ScalesStorageEngineArray******************');

console.log('******************ScalesStorageEngineLocalStorage******************');
localStorage.clear();
let storage2 = new ScalesStorageEngineLocalStorage;
let scales_array2 = new Scales<ScalesStorageEngineLocalStorage>(storage2);
let product11 = new Product('product11', 100);
let product22 = new Product('product22', 200);
let product33 = new Product('product33', 100);

scales_array2.add(product11);
scales_array2.add(product22);
scales_array2.add(product33);

console.log(`Вес продуктов: ${scales_array2.getSumScale()}`);
console.log(`Названия продуктов: ${scales_array2.getNameList()}`);
console.log('******************ScalesStorageEngineLocalStorage******************');
