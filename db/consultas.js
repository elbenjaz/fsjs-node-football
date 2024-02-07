const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'futscript',
    allowExitOnIdle: true
})

const getTeam = async ({ id, name }) => {
    if (!id && !name) {
        throw new Error("Campos requeridos faltantes.");
    }

    const equipo = await getTeams({ id, name });

    return equipo ? equipo[0] : false;
};

const getTeams = async ({ id, name }) => {
    try {
        const where  = [];
        const values = [];

        let sql = `
            SELECT 
                equipos.id,
                equipos.name
            FROM
                equipos`;

        if (id) {
            where.push(`id = $${values.length + 1}`);
            values.push(id);
        }
        
        if (name) {
            where.push(`name = $${values.length + 1}`);
            values.push(name);
        }

        if (where.length) {
            sql += ` WHERE ${where.join(" AND ")}`;
        }

        const equipos = await pool.query(sql, values);
        
        return equipos.rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getPlayer = async ({ name }) => {
    if (!name) {
        throw new Error("Campos requeridos faltantes.");
    }

    const player = await getPlayers({ name });

    return player ? player[0] : false;
};

const getPlayers = async ({ name, id_equipo }) => {
    try {
        const where  = [];
        const values = [];

        let sql = `
            SELECT 
                jugadores.id,
                jugadores.name,
                jugadores.position,
                jugadores.id_equipo,
                posiciones.name AS posicion
            FROM
                jugadores

            INNER JOIN posiciones ON posiciones.id = jugadores.position`;

        if (name) {
            where.push(`jugadores.name = $${values.length + 1}`);
            values.push(name);
        }

        if (id_equipo) {
            where.push(`jugadores.id_equipo = $${values.length + 1}`);
            values.push(id_equipo);
        }

        if (where.length) {
            sql += ` WHERE ${where.join(" AND ")}`;
        }

        const jugadores = await pool.query(sql, values);
        
        return jugadores.rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

const addTeam = async ({ name }) => {
    if (!name) {
        throw new Error("Campos requeridos faltantes.");
    }

    try {
        const sql = "INSERT INTO equipos (name) VALUES ($1) RETURNING *";

        const result = await pool.query(sql, [name]);

        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

const addPlayer = async ({ name, position }, id_equipo ) => {
    if (!name || !position || !id_equipo) {
        throw new Error("Campos requeridos faltantes.");
    }

    if (![1,2,3,4].includes(position)) {
        throw new Error("Posición inválida.");
    }

    try {
        const sql = "INSERT INTO jugadores (id_equipo, name, position) VALUES ($1, $2, $3) RETURNING *";

        const result = await pool.query(sql, [
            id_equipo, name, position
        ]);

        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }    
};

module.exports = { getTeam, getTeams, addTeam, getPlayer, getPlayers, addPlayer };
