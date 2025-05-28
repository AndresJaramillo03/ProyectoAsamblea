const { createMotion, castVote } = require('../controllers/voteController');

function setupSocket(io) {
  io.on('connection', (socket) => {
    socket.on('join', ({ role }) => socket.join(role));

    socket.on('send_motion', async (motion) => {
      const motionId = await createMotion(motion);
      if (motionId) {
        const fullMotion = { ...motion, id: motionId };
        io.to('participant').emit('new_motion', fullMotion);
        io.to('admin').emit('new_motion', fullMotion);
      }
    });

    socket.on('vote', async ({ motionId, userId, vote }) => {
      await castVote(motionId, userId, vote);
      io.to('admin').emit('vote-update', { motionId, userId, vote });
    });
  });
}

module.exports = { setupSocket };