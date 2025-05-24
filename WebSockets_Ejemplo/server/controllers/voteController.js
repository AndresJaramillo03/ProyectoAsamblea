const { sql, dbConfig } = require('../config/dbConfig');

async function createMotion(motion) {
  try {
    await sql.connect(dbConfig);
    console.log("✅ Conectado a la base de datos");

    const result = await sql.query`
      INSERT INTO Mocion (
        asamblea_id,
        pregunta,
        descripcion,
        estado,
        tipo_votacion,
        creada_en
      )
      VALUES (
        ${motion.asamblea_id},
        ${motion.pregunta},
        ${motion.descripcion},
        ${motion.estado || 'Pendiente'},
        ${motion.tipo_votacion},
        GETDATE()
      );
      SELECT SCOPE_IDENTITY() AS id;
    `;

    const id = result.recordset[0].id;
    console.log("✅ Moción creada con ID:", id);
    return id;

  } catch (err) {
    console.error('❌ Error creando moción:', err);
    return null;
  }
}

async function castVote(motionId, userId, vote) {
  try {
    await sql.connect(dbConfig);
    console.log("✅ Conectado a la base de datos");

 
    let votoTexto;
    if (vote === 'Sí' || vote === 'No' || vote === 'Abstención') {
      votoTexto = vote;
    } else {
      throw new Error("Voto inválido, solo se permiten 'Sí', 'No' o 'Abstención'");
    }

   
    if (userId === 29 || userId === 30) {
      console.warn('ID de participante inválido:', userId);
      return;
    }

    await sql.query`
      INSERT INTO Voto (mocion_id, participante_id, voto)
      VALUES (${motionId}, ${userId}, ${votoTexto});
    `;

    console.log("🗳️ Voto registrado correctamente");
  } catch (err) {
    console.error('❌ Error registrando voto:', err);
  }
}


module.exports = { createMotion, castVote };
