const express = require('express');
const { json } = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Ciclas',
  password: 'juan',
  port: 5433,
});

const app = express();

app.use(cors()); // Agrega el middleware cors al servidor Express
app.use(json());

app.get('/incidentes', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM incidentes');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error obteniendo incidentes');
  }
});

app.post('/incidentes', async (req, res) => {
  const { fecha_hora, latitud, longitud, tipo_obstaculo, foto } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO incidentes (fecha_hora, latitud, longitud, tipo_obstaculo, foto) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [fecha_hora, latitud, longitud, tipo_obstaculo, foto]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creando incidente');
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
