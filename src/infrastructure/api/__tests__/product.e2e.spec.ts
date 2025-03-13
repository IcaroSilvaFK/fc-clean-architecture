import supertest from "supertest";
import { app, sequelize } from "../express";


describe("E2E suite for product", () => {

  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })


  it("Should create a product", async () => {

    const { body } = await supertest(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 10
      })
      .expect(201)
      .expect("Content-Type", /json/)

    const expected = {
      id: expect.any(String),
      name: "Product 1",
      price: 10
    }

    expect(body).toStrictEqual(expected)
  })

  it("Should not create a product with status code 500", async () => {
    await supertest(app)
      .post("/product")
      .send({
        name: "P"
      })
      .expect(500)
  })

  it("Should list a products", async () => {
    await supertest(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 20
      })
      .expect(201)
    await supertest(app)
      .post("/product")
      .send({
        name: "Product 2",
        price: 10
      })
      .expect(201)

    const { body } = await supertest(app)
      .get("/product")
      .expect(200)

    const expected = [
      {
        id: expect.any(String),
        name: "Product 1",
        price: 20
      },
      {
        id: expect.any(String),
        name: "Product 2",
        price: 10
      }
    ]

    expect(body.products.length).toBe(2)
    expect(body.products).toStrictEqual(expected)
  })
})