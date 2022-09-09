import { useState, useEffect } from 'react';
import SendIcon from '../assets/illustrations/send.svg';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { GoogleLogout } from 'react-google-login';

export default function PanelMembers(props) {
  const [user, setUser] = useState({
    data: { username: null, email: null, imageUrl: null },
  });

  useEffect(() => {
    setUser({
      ...user,
      data: {
        username: localStorage.getItem('mome:username'),
        email: localStorage.getItem('mome:email'),
        imageUrl: localStorage.getItem('mome:imageUrl'),
      },
    });
    console.log(user);
  }, []);

  return (
    <div className="">
      <div className="d-flex justify-content-start align-items-center _border gap-1 py-1 px-1 gap-2">
        <img
          src={SendIcon}
          alt="message icon"
          style={{ width: '16px', height: '16px' }}
        />
        <span>Chat</span>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center py-4 px-1">
        <img src={user.data.imageUrl} alt="ProfileImage" />
        <p className="_font-bold my-2 mb-0">{user.data.username}</p>
        <p className="_text-xxsmall my-0">{user.data.email}</p>
        <GoogleLogout
          clientId={process.env.REACT_APP_GAPI_CLIENT_ID}
          render={renderProps => (
            <Button
              label="Sign off"
              className="mt-3 _w-50 py-1"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            />
          )}
          buttonText={'Logout'}
          onLogoutSuccess={props.onLogoutSuccess}
        />
      </div>
      <InputText className="w-100 mt-3" placeholder="Buscar un usuario" />
    </div>
  );
}
