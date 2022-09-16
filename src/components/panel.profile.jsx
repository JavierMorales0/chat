import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { GoogleLogout } from 'react-google-login';
import BackButton from './back.button';
import LastUsers from './last.users.jsx';

export default function PanelProfile({ onLogoutSuccess, onDisconnect }) {
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
  }, []);

  return (
    <div
      className="col-12 col-md-3 _panel-container"
      style={{ maxHeight: '30%' }}>
      <div className="d-flex justify-content-start align-items-center _border gap-1 py-1 py-md-2 px-1 px-md-2 gap-2">
        <BackButton onDisconnect={onDisconnect} />
        <span>Chat</span>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center py-4 px-1">
        <img
          src={user.data.imageUrl}
          alt="ProfileImage"
          className="_avatar"
          referrerPolicy="no-referrer"
        />
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
          onLogoutSuccess={onLogoutSuccess}
        />
      </div>{' '}
      <LastUsers />
    </div>
  );
}
