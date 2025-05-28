const { sql, dbConfig } = require('../config/dbConfig');

async function createMotion(motion) {
  console.log('📥 motion recibido:', motion);
  try {
    await sql.connect(dbConfig);

    const request = new sql.Request();
    request.input('codigo_asamblea_fk', sql.Int, motion.codigo_asamblea_fk);
    request.input('tipo_votacion', sql.VarChar, motion.tipo_votacion);
    request.input('pregunta', sql.VarChar, motion.pregunta);
    request.input('descripcion', sql.VarChar, motion.descripcion?.trim() || 'Sin descripción');

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
    await sql.query(
      
      `
      INSERT INTO Votos (codigo_mocion_fk, documento_usuario_fk, voto )
      VALUES (${motionId}, ${userId}, '${vote}');
    `);
  } catch (err) {
    console.error('❌ Error registrando voto:', err);
    console.log("Registrando voto para documento_usuario:", documento_usuario_fk);
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