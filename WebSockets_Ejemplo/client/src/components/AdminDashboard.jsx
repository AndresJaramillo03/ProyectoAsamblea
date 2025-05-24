import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function AdminDashboard({ socket }) {
  const [motion, setMotion] = useState({
    asamblea_id: 1,
    pregunta: '',
    descripcion: '',
    opcion: 'Sí',
    tipo_votacion: 'Votación electrónica'
  });

  const [votes, setVotes] = useState([]);

  const sendMotion = () => {
    if (!motion.pregunta.trim() || !motion.descripcion.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa la pregunta y la descripción antes de enviar la moción.',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas enviar esta moción?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, enviar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        socket.emit('send_motion', motion);
      }
    });
  };

  useEffect(() => {
    socket.on('vote_update', data => {
      setVotes(prev => [...prev, data]);
    });

    socket.on('motion_created', data => {
      Swal.fire({
        icon: 'success',
        title: 'Moción enviada',
        html: `<p>La moción se ha enviado correctamente.</p><p><strong>ID de moción: ${data.id}</strong></p>`,
        timer: 3000,
        showConfirmButton: false
      });

      setMotion({
        asamblea_id: 1,
        pregunta: '',
        descripcion: '',
        opcion: 'Sí',
        tipo_votacion: 'Votación electrónica'
      });
    });

    return () => {
      socket.off('vote_update');
      socket.off('motion_created');
    };
  }, []);

  return (
    <div className="container mt-4">
      <h2 className='mt-3'>Panel del Administrador</h2>

      <div className="mb-3">
        <label className="form-label">Pregunta</label>
        <input
          type="text"
          className="form-control"
          value={motion.pregunta}
          onChange={e => setMotion({ ...motion, pregunta: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          className="form-control"
          value={motion.descripcion}
          onChange={e => setMotion({ ...motion, descripcion: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Tipo de votación</label>
        <select
          className="form-select"
          value={motion.tipo_votacion}
          onChange={e => setMotion({ ...motion, tipo_votacion: e.target.value })}
        >
          <option value="Votación electrónica">Votación electrónica</option>
          <option value="Presencial">Presencial</option>
          <option value="Votación mixta">Votación mixta</option>
        </select>
      </div>

      <button className="btn btn-primary" onClick={sendMotion}>
        Enviar Moción
      </button>

      <h4 className="mt-4">Votos recibidos:</h4>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <ul className="list-group">
          {votes.map((v, i) => (
            <li key={i} className="list-group-item">
              Moción ID: <strong>{v.motionId} </strong>|
              Participante ID: <strong>{v.userId ?? 'Anónimo'} </strong>|
              Votó: <strong>{v.vote}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
