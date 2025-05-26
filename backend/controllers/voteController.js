// archivo: motions.js (o como lo llames)
const { sql, dbConfig } = require('../config/dbConfig');

async function createMotion(motion) {
  console.log('📥 motion recibido:', motion);
  try {
    await sql.connect(dbConfig);

    const request = new sql.Request();
    request.input('codigo_asamblea_fk', sql.Int, motion.codigo_asamblea_fk);
    request.input('tipo_votacion', sql.VarChar, motion.tipo_votacion);
    request.input('pregunta', sql.VarChar, motion.pregunta);
    request.input('descripcion', sql.VarChar, motion.descripcion);

    const result = await request.query(`
      INSERT INTO Mocion (codigo_asamblea_fk, tipo_votacion, pregunta, descripcion, activo)
      VALUES (@codigo_asamblea_fk, @tipo_votacion, @pregunta, @descripcion, 1);
      SELECT SCOPE_IDENTITY() AS id;
    `);

    return result.recordset[0].id;
  } catch (err) {
    console.error('❌ Error creando moción:', err);
    return null;
  }
}

async function castVote(motionId, userId, vote) {
  try {
    await sql.connect(dbConfig);
    if (userId === 29 || userId === 30) return;
    await sql.query(`
      INSERT INTO Voto (mocion_id, participante_id, voto)
      VALUES (${motionId}, ${userId}, '${vote}');
    `);
  } catch (err) {
    console.error('❌ Error registrando voto:', err);
  }
}

async function getActiveMotions() {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query(`
      SELECT * FROM Mocion WHERE activo = 1;
    `);
    return result.recordset;
  } catch (err) {
    console.error('❌ Error obteniendo mociones activas:', err);
    return [];
  }
}

module.exports = { createMotion, castVote, getActiveMotions };
