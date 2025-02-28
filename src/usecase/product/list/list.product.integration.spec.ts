import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { ListProductUseCase } from "./list.product.usecase";

describe("Unit test create product use case", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });


    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should a list products", async () => {
    const repository = new ProductRepository();
    await repository.create(new Product("1", "Product 1", 10));
    await repository.create(new Product("2", "Product 2", 20));

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