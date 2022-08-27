import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';

export default function Login() {
  const [username, setUsername] = useState('');
  const handleChangeUsername = _username => {
    setUsername(_username);
  };
  return (
    <div className="w-25">
      <p className="text-sm">Identificaci&oacute;n para ingresar al chat</p>
      <InputText
        className="w-full "
        value={username}
        placeholder="Ingrese su nombre de usuario"
        onChange={event =>
          handleChangeUsername(event.target.value)
        }></InputText>
    </div>
  );
}
