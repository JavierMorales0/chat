import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Chat() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  useEffect(() => {
    /* Checking if the user is logged in. If not, it will redirect to the login
    page. */
    if (!localStorage.getItem('mome:username')) {
      navigate('/login');
    }
    setUsername(localStorage.getItem('mome:username'));
  });

  return (
    <main>
      <p className="_text-small">Sesion iniciada como {username}</p>
    </main>
  );
}
