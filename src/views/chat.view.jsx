import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Chat() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  useEffect(() => {
    /* Checking if the user is logged in. If not, it will redirect to the login
    page. */
    if (!localStorage.getItem('username')) {
      navigate('/login');
    }
    setUsername(localStorage.getItem('username'));
  });

  return (
    <main>
      <h2>Sesion iniciada como {username}</h2>
    </main>
  );
}
