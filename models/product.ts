const path = require('path');

interface IProduct {
  title: string;
}

module.exports = class Product implements IProduct {
  title: string;
  constructor(title: string) {
    this.title = title;
  }

  async save() {
    let productsFile: IProduct[] = [];
    productsFile = await Bun.file(Product._getPath()).json();
    productsFile.push(this);
    await Bun.write(Product._getPath(), JSON.stringify(productsFile));
  }

  static async fetchAll(): Promise<IProduct[]> {
    return await Bun.file(Product._getPath()).json();
  }

  private static _getPath() {
    return path.join(path.dirname(require.main?.filename), 'data', 'products.json');
  }
}