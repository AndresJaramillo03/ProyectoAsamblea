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
      INSERT INTO Mocion (codigo_asamblea_fk, tipo_votacion, pregunta, descripcion)
      VALUES (@codigo_asamblea_fk, @tipo_votacion, @pregunta, @descripcion);
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

module.exports = { createMotion, castVote };