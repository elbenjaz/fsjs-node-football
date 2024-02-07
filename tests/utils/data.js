const { getTeams, addTeam } = require('../../db/consultas');
const jwt = require('jsonwebtoken');
const { secretKey } = require("../../utils");
const { faker } = require('@faker-js/faker');

const credentials = {
    username : "admin",
    password : "1234"
};

const credentials_invalid = {
    username : "user",
    password : "12345"
};

const playerNew =   {
    name      : faker.person.fullName(),
    position  : Math.floor(Math.random() * 4) + 1
};

const generateToken = () => {
    return jwt.sign({ username: credentials.username }, secretKey, {
        expiresIn : "1m"
    });
};

const getTeamID = async () => {
    const teams = await getTeams({});

    if (!teams.length) {
        const newTeam = await addTeam({ name: faker.company.name() });
        return newTeam.id;
    }

    return teams[0].id;
};

module.exports = { credentials, credentials_invalid, playerNew, getTeamID, generateToken };
