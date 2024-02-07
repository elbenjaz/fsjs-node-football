const { getTeam, getTeams, addTeam } = require('../db/consultas');

const obtenerEquipos = async (req, res) => {
    try {
        const equipos = await getTeams({});
        return res.status(200).json(equipos);    
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const agregarEquipo = async (req, res) => {
    try {
        const {name} = req.body;
        const teamExists = await getTeam({ name });

        if (teamExists) {
            return res.status(400).json({ error: "Equipo ya existe." });
        }

        const newTeam = await addTeam(req.body);
        return res.status(200).json(newTeam);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { obtenerEquipos, agregarEquipo };
