import { useState, useEffect } from 'react';

function AdminDashboard({ socket }) {
  const [motion, setMotion] = useState('');
  const [motions, setMotions] = useState([]);
  const [votes, setVotes] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (motion.trim()) {
        socket.emit('send_motion', {
        codigo_asamblea_fk: 1,
        pregunta: motion,
        descripcion: 'Sin descripción',
        tipo_votacion: 'Sí/No'
        });
        setMotion('');
    }
  };

  useEffect(() => {
    socket.on('new_motion', (motion) => {
    setMotions((prev) => [...prev, motion]);
    });

    socket.on('vote-update', (voteData) => {
      setVotes(voteData);
    });

    return () => {
      socket.off('motion-list');
      socket.off('vote-update');
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
        <button type="submit">Enviar Moción</button>
      </form>

      <div className="motion-list">
        <h3>Mociones activas</h3>
        {motions.map((m, index) => (
          <div key={index} className="motion">
            <strong>{m.pregunta}</strong>
            <p>Votos a favor: {votes[m.id]?.yes || 0}</p>
            <p>Votos en contra: {votes[m.id]?.no || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;