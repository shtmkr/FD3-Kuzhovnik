interface IScalable {
    getName(): string;
    getScale(): number;
}

class Apple implements IScalable {
    constructor(public name: string, public scale: number) { };
    getName(): string {
        return this.name;
    };
    getScale(): number {
        return this.scale;
    };
}

class Tomato implements IScalable {
    constructor(public name: string, public scale: number) { };
    getName(): string {
        return this.name;
    };
    getScale(): number {
        return this.scale;
    };
}

class Scales {
    products: IScalable[] = [];
    add(product: IScalable): void {
        this.products.push(product);
    }
    getSumScale(): number {
        let sum: number = 0;
        this.products.forEach( product => {
            sum += product.getScale()
        });
        return sum;
    }
    getNameList(): Array<string> {
        let nameList: string[] = [];
        this.products.forEach( product => {
            nameList.push(product.getName());
        });
        return nameList;
    }
}


let scales: Scales = new Scales();

let apple1: Apple = new Apple("Big", 200);
let apple2: Apple = new Apple("small", 100);
let apple3: Apple = new Apple("green", 300);

let tomato1: Tomato = new Tomato("tomat1", 11);
let tomato2: Tomato = new Tomato("tomat2", 22);
let tomato3: Tomato = new Tomato("tomat3", 33);

scales.add(apple1);
scales.add(apple2);
scales.add(apple3);
scales.add(tomato1);
scales.add(tomato2);
scales.add(tomato3);

console.log(`Вес продуктов: ${scales.getSumScale()}`);
console.log(`Названия продуктов: ${scales.getNameList()}`);
