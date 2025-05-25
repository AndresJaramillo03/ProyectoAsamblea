import { useEffect, useState } from 'react';

function ParticipantDashboard({ socket }) {
  const [motions, setMotions] = useState([]);
  const [voted, setVoted] = useState({});

  useEffect(() => {
    socket.on('new_motion', (motion) => {
    setMotions((prev) => [...prev, motion]);
    });

    return () => {
      socket.off('motion-list');
    };
  }, [socket]);

const handleVote = (motion, vote) => {
  if (!voted[motion.id]) {
    socket.emit('vote', {
      motionId: motion.id,
      userId: 1,
      vote
    });
    setVoted((prev) => ({ ...prev, [motion.id]: vote }));
  }
};

  return (
    <div className="dashboard">
      <h2>Panel del Participante</h2>

      <div className="motion-list">
        {motions.length === 0 ? (
          <p>No hay mociones en este momento.</p>
        ) : (
    motions.map((motion) => (
    <div key={motion.id} className="motion">
     <strong>{motion.pregunta}</strong>
              {voted[motion.id] ? (
                <p>Ya votaste: {voted[motion.id] === 'yes' ? '✅ Sí' : '❌ No'}</p>
              ) : (
                <div className="vote-buttons">
                  <button onClick={() => handleVote(motion, 'yes')}>Sí</button>
                  <button onClick={() => handleVote(motion, 'no')}>No</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ParticipantDashboard;