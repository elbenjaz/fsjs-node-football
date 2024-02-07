const request = require("supertest");
const server = require("../index");
const { credentials, credentials_invalid, playerNew, getTeamID, generateToken } = require('./utils/data.js');

describe("Football CRUD", () => {
    it("GET /equipos : returns code 200 and array", async () => {
        const response = await request(server)
            .get("/equipos")
            .send();
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it("POST /login with valid credentials : returns object", async () => {
        const response = await request(server)
            .post("/login")
            .send(credentials);
        
        expect(response.body).toBeInstanceOf(Object);
    });

    it("POST /login with invalid credentials : returns code 400", async () => {
        const response = await request(server)
            .post("/login")
            .send(credentials_invalid);
        
        expect(response.statusCode).toBe(400);
    });

    it("POST /equipos/:teamID/jugadores : returns code 201", async () => {
        const jwt = generateToken();
        const id_equipo = await getTeamID();

        const response = await request(server)
            .post(`/equipos/${id_equipo}/jugadores`)
            .set("Authorization", `Bearer: ${jwt}`)
            .send(playerNew);

        expect(response.statusCode).toBe(201);
    });
});
