import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { ListProductUseCase } from "./list.product.usecase";

describe("Unit test create product use case", () => {
  it("Should a list products", async () => {
    const repository = new ProductRepository();

    jest.spyOn(repository, "findAll").mockResolvedValue([
      new Product("1", "Product 1", 10),
      new Product("2", "Product 2", 20),
    ]);

    const usecase = new ListProductUseCase(repository);

    const output = {
      products: [
        {
          id: expect.any(String),
          name: "Product 1",
          price: 10,
        },
        {
          id: expect.any(String),
          name: "Product 2",
          price: 20,
        },
      ],
    };

    const result = await usecase.execute();

    expect(result).toEqual(output);
  })
})