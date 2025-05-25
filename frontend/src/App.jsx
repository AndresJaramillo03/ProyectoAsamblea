import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import AdminDashboard from './components/AdminDashboard';
import ParticipantDashboard from './components/ParticipantDashboard';
import './styles.css';

const socket = io('http://localhost:3000');

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (role) socket.emit('join', { role });
  }, [role]);

  return (
    <div className="container">
      {!role ? (
        <div className="role-selector">
          <h2>Selecciona tu rol</h2>
          <button onClick={() => setRole('admin')}>Admin</button>
          <button onClick={() => setRole('participant')}>Participante</button>
        </div>

      ) : role === 'admin' ? (
        <AdminDashboard socket={socket} />
      ) : (
        <ParticipantDashboard socket={socket} />
      )}
    </div>
  );
}

export default App;