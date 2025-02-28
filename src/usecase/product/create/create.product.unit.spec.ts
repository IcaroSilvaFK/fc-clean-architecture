import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Unit test create product use case", () => {
  let productRepository: ProductRepository

  beforeEach(() => {
    productRepository = new ProductRepository();
  })


  it("should create a product", async () => {

    jest.spyOn(productRepository, "create").mockReturnValue(Promise.resolve());
    const usecase = new CreateProductUseCase(productRepository);
    const crypto = require("crypto");
    jest.spyOn(crypto, "randomUUID").mockReturnValue("123");
    const input = {
      name: "Product 1",
      price: 10,
    };

    const output = {
      id: expect.any(String),
      name: input.name,
      price: input.price,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
    expect(productRepository.create).toHaveBeenCalled();
    expect(crypto.randomUUID).toHaveBeenCalled();
  })

  it("Should not create a product when name is invalid", async () => {
    jest.spyOn(productRepository, "create").mockReturnValue(Promise.resolve());


    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      name: "",
      price: 10,
    };

    await expect(usecase.execute(input)).rejects.toThrow("Name is required");
  })

  it("Should not create a product when price is invalid", async () => {
    jest.spyOn(productRepository, "create").mockReturnValue(Promise.resolve());

    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      name: "Product 1",
      price: -10,
    };

    await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than zero");
  })
})