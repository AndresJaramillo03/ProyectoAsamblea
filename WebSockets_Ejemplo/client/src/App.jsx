import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import AdminDashboard from './components/AdminDashboard'
import ParticipantDashboard from './components/ParticipantDashboard'

const socket = io('http://localhost:3001')

function App() {
  const [role, setRole] = useState(null)

  useEffect(() => {
    if (role) {
      socket.emit('join', { role })
    }
  }, [role])

  return (
    <div className="d-flex flex-column vh-100">
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        {!role ? (
          <div className="text-center">
            <img src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png" className='img-primary' />
            <h2>Selecciona tu rol</h2>
            <button className="btn btn-primary m-2" onClick={() => setRole('admin')}>
              Entrar como Admin
            </button>
            <button className="btn btn-success m-2" onClick={() => setRole('participant')}>
              Entrar como Participante
            </button>
          </div>
        ) : role === 'admin' ? (
          <AdminDashboard socket={socket} />
        ) : (
          <ParticipantDashboard socket={socket} />
        )}
      </div>
      <footer className="text-center p-1 border-top">
        <small>Edwin Alexander González Blandon & Laura María Monsalve Arroyave </small>
        <br /><small>© 2025</small>
      </footer>
    </div>
  )
}

export default App