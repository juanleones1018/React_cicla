const db = require('./db');

const createIncidentReport = async (incidentData) => {
  const { fecha_hora, latitud, longitud, tipo_obstaculo, foto } = incidentData;
  const query = 'INSERT INTO incidentes (fecha_hora, coordenadas, tipo_obstaculo, foto) VALUES ($1, POINT($2, $3), $4, $5) RETURNING *';
  const values = [fecha_hora, latitud, longitud, tipo_obstaculo, foto];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const getAllIncidentReports = async () => {
  const query = 'SELECT * FROM incidentes';
  const { rows } = await db.query(query);
  return rows;
};

const getIncidentReportsByLocation = async (latitud, longitud) => {
  const query = 'SELECT * FROM incidentes WHERE latitud = $1 AND longitud = $2';
  const { rows } = await db.query(query, [latitud, longitud]);
  return rows;
};


const getIncidentReportsByObstacleType = async (tipo_obstaculo) => {
  const query = 'SELECT * FROM incidentes WHERE tipo_obstaculo = $1';
  const { rows } = await db.query(query, [tipo_obstaculo]);
  return rows;
};

module.exports = {
  createIncidentReport,
  getAllIncidentReports,
  getIncidentReportsByLocation,
  getIncidentReportsByObstacleType,
};
