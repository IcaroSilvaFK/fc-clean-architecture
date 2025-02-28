import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindPoductDto } from "./find.product.dto";

export class FindProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) { }


  async execute(input: InputFindProductDto): Promise<OutputFindPoductDto> {
    const product = await this.productRepository.find(input.id);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}