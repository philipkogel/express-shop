const path = require('path');

interface IProduct {
  id: string;
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
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  constructor(title: string, imageUrl: string, price: number, description: string, id?: string) {
    this.id = id ? id : crypto.randomUUID()
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  async save() {
    let productsFile: IProduct[] = [];
    productsFile = await getProductsFromFile();
    if (this.id) {
      const productIndex = productsFile.findIndex((p) => p.id === this.id);
      const updatedProducts = [...productsFile]
      if (productIndex !== -1) {
        updatedProducts[productIndex] = { ...this }
      }
      productsFile = updatedProducts;
    } else {
      productsFile.push(this);
    }
    await Bun.write(getProductFilePath(), JSON.stringify(productsFile));
  }

  static async fetchAll(): Promise<IProduct[]> {
    return await getProductsFromFile();
  }

  static async fetch(productId: string): Promise<IProduct | undefined> {
    return (await this.fetchAll()).find((product: IProduct) => product.id === productId)
  }
}