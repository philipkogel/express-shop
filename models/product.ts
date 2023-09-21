const path = require('path');

interface IProduct {
  title: string;
}

const getProductFilePath = () => (path.join(path.dirname(require.main?.filename), 'data', 'products.json'));

const getProductsFromFile = async (): Promise<IProduct[]> => {
  return await Bun.file(getProductFilePath()).json()
}

module.exports = class Product implements IProduct {
  title: string;
  constructor(title: string) {
    this.title = title;
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