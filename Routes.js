const express = require('express');
const multer = require('multer');
const { validarIncidente } = require('./middlewares');
const { Incidente } = require('./models');

const router = express.Router();

// Configuración de multer para manejar la carga de imágenes
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // Máximo 5 MB
});

// Ruta para crear un nuevo incidente
router.post('/incidentes', upload.single('foto'), async (req, res) => {
  const { fecha_hora, ubicacion, tipo_obstaculo } = req.body;
  const foto = req.file ? req.file.buffer : null;

  const incidente = await Incidente.create({ fecha_hora, ubicacion, tipo_obstaculo, foto });
  res.status(201).json(incidente);
});

// Ruta para obtener todos los incidentes
router.get('/incidentes', async (req, res) => {
  const incidentes = await Incidente.findAll();
  res.json(incidentes);
});

// Ruta para obtener un incidente por su ID
router.get('/incidentes/:id', validarIncidente, (req, res) => {
  res.json(req.incidente);
});

// Ruta para eliminar un incidente por su ID
router.delete('/incidentes/:id', validarIncidente, async (req, res) => {
  await req.incidente.destroy();
  res.sendStatus(204);
});

module.exports = router;
