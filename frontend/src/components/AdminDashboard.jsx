import { useState, useEffect } from 'react';

function AdminDashboard({ socket }) {
  const [motion, setMotion] = useState('');
  const [motions, setMotions] = useState([]);
  const [votes, setVotes] = useState({});
  const [descripcion, setDescripcion] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  if (motion.trim()) {
    socket.emit('send_motion', {
      codigo_asamblea_fk: 1,
      pregunta: motion,
      descripcion: descripcion.trim() || 'Sin descripción',
      tipo_votacion: 'Sí/No/Abstenerse'
    });
    setMotion('');
    setDescripcion('');
  }
};

useEffect(() => {
  const handleNewMotion = (motion) => {
    setMotions((prev) => {
      const exists = prev.some((m) => m.id === motion.id);
      return exists ? prev : [...prev, motion];
    });
  };

  const handleVoteUpdate = ({ motionId, vote }) => {
    setVotes((prev) => {
      const current = prev[motionId] || { yes: 0, no: 0, abstain: 0 };
      return {
        ...prev,
        [motionId]: {
          ...current,
          [vote]: (current[vote] || 0) + 1,
        },
      };
    });
  };

  socket.on('new_motion', handleNewMotion);
  socket.on('vote-update', handleVoteUpdate);

  return () => {
    socket.off('new_motion', handleNewMotion);
    socket.off('vote-update', handleVoteUpdate);
  };
}, [socket]);

  return (
    <div className="dashboard">
      <h2>Panel del Administrador</h2>

      <form onSubmit={handleSubmit} className="motion-form">
        <input
          type="text"
          value={motion}
          onChange={(e) => setMotion(e.target.value)}
          placeholder="Escribe una moción"
        />
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción de la moción"
        />
        <button type="submit">Enviar Moción</button>
      </form>

      <div className="motion-list">
        <h3>Mociones activas</h3>
        {motions.map((m, index) => (
          <div key={index} className="motion">
            <strong>{m.pregunta}</strong>
            <p>Votos a favor: {votes[m.id]?.yes || 0}</p>
            <p>Votos en contra: {votes[m.id]?.no || 0}</p>
            <p>Abstenciones: {votes[m.id]?.abstain || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;