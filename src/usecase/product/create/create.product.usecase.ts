import { randomUUID } from 'crypto';
import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase {

  constructor(
    private readonly productRepository: ProductRepositoryInterface
  ) { }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const productId = randomUUID()
    const product = new Product(productId, input.name, input.price);

    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}