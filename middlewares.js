const { Incidente } = require('./models');

const validarIncidente = async (req, res, next) => {
  const { id } = req.params;
  const incidente = await Incidente.findOne({ where: { id } });
  if (!incidente) {
    return res.status(404).json({ error: 'Incidente no encontrado' });
  }
  req.incidente = incidente;
  next();
};

module.exports = { validarIncidente };
