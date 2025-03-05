import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { FindProductUseCase } from "./find.product.usecase";

describe("Unit test create product use case", () => {
  it("should find a product", async () => {
    const productRepository = new ProductRepository();

    jest.spyOn(productRepository, "find").mockResolvedValue(new Product("1", "Product 1", 10));

    const usecase = new FindProductUseCase(productRepository);


    const output = {
      id: expect.any(String),
      name: "Product 1",
      price: 10,
    }

    const result = await usecase.execute({ id: "1" });

    expect(result).toEqual(output);
  });
  it("should not find a product", async () => {
    const productRepository = new ProductRepository();

    jest.spyOn(productRepository, "find").mockRejectedValue(new Error("Product not found"));

    const usecase = new FindProductUseCase(productRepository);

    await expect(() => usecase.execute({ id: "1" })).rejects.toThrow("Product not found");
  });
})