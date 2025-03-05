import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { UpdateProductUseCase } from "./update.product.usecase";


const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(new Product("1", "Product 1", 10))),
    update: jest.fn(),
  };
};


describe("Unit test create product use case", () => {
  it("Should update product", async () => {
    const productUpdateUseCase = new UpdateProductUseCase(MockRepository());

    const input = {
      id: "1",
      name: "Product 2",
      price: 20,
    };

    const output = {
      id: expect.any(String),
      name: "Product 2",
      price: 20,
    }

    const result = await productUpdateUseCase.execute(input);

    expect(result).toEqual(output);
  })
  it("Should not update product", async () => {
    const productRepository = new ProductRepository();

    jest.spyOn(productRepository, "find").mockRejectedValue(
      new Error("Product not found")
    );

    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "1",
      name: "Product 2",
      price: 20,
    };
    await expect(() => productUpdateUseCase.execute(input)).rejects.toThrow("Product not found");

  })
})