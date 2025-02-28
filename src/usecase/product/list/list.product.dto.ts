interface OutputFindPoductDto {
  name: string
  price: number
  id: string
}


export interface OutputListProductDto {
  products: OutputFindPoductDto[];
}
