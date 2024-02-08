const { getPlayer, getPlayers, addPlayer, getTeam } = require('../db/consultas');

const obtenerJugadores = async (req, res) => {
    try {
        const { teamID } = req.params;

        const teamExists = await getTeam({ id: teamID });

        if (!teamExists) {
            return res.status(400).json({ error: "Equipo no está registrado." });
        }

        const jugadores = await getPlayers({ id_equipo: teamID });

        return res.status(200).json(
            jugadores.map((jugador) => ({ name: jugador.name, posicion: jugador.posicion }))
        );
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const registrarJugador = async (req, res) => {
    try {
        const { teamID } = req.params
        const player = req.body;

        const teamExists = await getTeam({ id: teamID });

        if (!teamExists) {
            return res.status(400).json({ error: "Equipo no está registrado." });
        }

        const playerExists = await getPlayer(player);

        if (playerExists) {
            return res.status(400).json({ error: "Jugador ya está registrado." });
        }

        const newPlayer = await addPlayer(player, teamID);
        return res.status(201).json(newPlayer);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { obtenerJugadores, registrarJugador };
