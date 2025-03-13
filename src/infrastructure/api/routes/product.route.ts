import { Router } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import { ListProductUseCase } from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

const productRouter = Router()

productRouter.post("/", async (req, res) => {
  try {
    const usecase = new CreateProductUseCase(new ProductRepository())
    const input = {
      name: req.body.name,
      price: req.body.price
    }

    const output = await usecase.execute(input)

    return res.status(201).json(output)
  } catch (err) {
    res.status(500).send(err)
  }
})

productRouter.get("/", async (_, res) => {
  try {
    const usecase = new ListProductUseCase(new ProductRepository())

    const output = await usecase.execute()

    return res.status(200).json(output)
  } catch (err) {
    res.status(500).send(err)
  }
})


export { productRouter };
