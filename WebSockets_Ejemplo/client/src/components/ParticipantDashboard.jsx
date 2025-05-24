import { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


function ParticipantDashboard({ socket }) {
  const [motions, setMotions] = useState([]);


  useEffect(() => {
    socket.emit('join', { role: 'participant' });

    socket.on('new_motion', data => {
      console.log('📩 Moción recibida:', data);
      setMotions(prev => [...prev, data]);
    });

    return () => {
      socket.off('new_motion');
    };
  }, []);

  let userId;

  do {
    userId = Math.floor(Math.random() * 104) + 1; 
  } while (userId === 29);

  const vote = (motionId, voteValue) => {
  Swal.fire({
    title: `¿Confirmas tu voto?`,
    text: `Vas a votar: ${voteValue}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, votar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33'
  }).then((result) => {
    if (result.isConfirmed) {
      socket.emit('vote', {
        motionId: motionId,
        vote: voteValue,
        userId: userId
      });

      Swal.fire({
        title: 'Voto enviado',
        text: `Tu voto: ${voteValue} ha sido registrado`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });

      setMotions(prev => prev.filter(m => m.id !== motionId));
    }
  });
};



  return (
    <div>
      <h2>Panel del Participante</h2>
      {motions.length > 0 ? (
        motions.map((m) => (
          <div key={m.id} className="alert alert-info mb-3">
            <h5>Moción recibida:</h5>
            <p><strong>{m.pregunta}</strong></p>
            <p>{m.descripcion}</p>
            <button className="btn btn-success me-2" onClick={() => vote(m.id, 'Sí')}>Sí</button>
            <button className="btn btn-danger me-2" onClick={() => vote(m.id, 'No')}>No</button>
            <button className="btn btn-warning" onClick={() => vote(m.id, 'Abstención')}>Abstención</button>
          </div>
        ))
      ) : (
        <p>Esperando nueva moción...</p>
      )}

    </div>
  )
}

export default ParticipantDashboard
