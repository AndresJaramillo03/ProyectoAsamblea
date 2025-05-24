const { createMotion, castVote } = require('../controllers/voteController');

function setupSocket(io) {
  io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado:', socket.id);

    socket.on('join', ({ role }) => {
      socket.join(role);
      console.log(`Usuario con rol ${role} se unió al canal`);
    });

    socket.on('send_motion', async (motion) => {
      console.log("Moción recibida del frontend:", motion);

      const motionId = await createMotion(motion);
      if (motionId) {
        const motionWithId = { ...motion, id: motionId };

        // Enviar a PartiCipantes
        io.to('participant').emit('new_motion', motionWithId);

        // Enviar al administrador
        io.to('admin').emit('motion_created', motionWithId);
      }
    });

    socket.on('vote', async ({ motionId, userId, vote }) => {
      await castVote(motionId, userId, vote);
      io.to('admin').emit('vote_update', { motionId, userId, vote });
    });
  });
}

module.exports = { setupSocket };
