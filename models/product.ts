const path = require('path');

interface IProduct {
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

const getProductFilePath = () => (path.join(path.dirname(require.main?.filename), 'data', 'products.json'));

const getProductsFromFile = async (): Promise<IProduct[]> => {
  return await Bun.file(getProductFilePath()).json()
}

module.exports = class Product implements IProduct {
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  constructor(title: string, imageUrl: string, price: number, description: string,) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  async save() {
    let productsFile: IProduct[] = [];
    productsFile = await getProductsFromFile();
    productsFile.push(this);
    await Bun.write(getProductFilePath(), JSON.stringify(productsFile));
  }

  static async fetchAll(): Promise<IProduct[]> {
    return await getProductsFromFile();
  }
}