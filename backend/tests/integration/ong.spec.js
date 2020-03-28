import request from "supertest";
import app from "../../src/app";
import connection from "../../src/database/connection";

describe("ong", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Should be able to create a new ONG.", async () => {
    const response = await request(app)
      .post("/ongs")
      .send({
        name: "ASFA Palotina",
        email: "asfa@teste.com",
        whatsapp: "45 99999999",
        city: "Palotina",
        uf: "PR"
      });
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
  });
});
