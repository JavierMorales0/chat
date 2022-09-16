import { getLastUsers as getLastUsersApi } from '../api';
import { useState, useEffect } from 'react';

export default function LastUsers() {
  const [lastUsers, setLastUsers] = useState([]);
  const [currentSelectedUser, setCurrentSelectedUser] = useState('');
  useEffect(() => {
    getLastUsers();
  }, []);

  async function getLastUsers() {
    try {
      const response = await getLastUsersApi();
      setLastUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  const mountAvatarStyle = { marginLeft: '-10px' };

  return (
    <section className="px-2 py-1 text-center _only-desktop">
      <p className="_text-xxsmall _font-bold mb-1">last connected users...</p>
      <div className="text-center">
        {lastUsers.map((item, index) => {
          return (
            <img
              className=" _avatar-min"
              key={index}
              style={index > 0 ? mountAvatarStyle : {}}
              src={item.avatar}
              data-email={item.email}
              data-avatar={item.avatar}
              onMouseOver={e => {
                e.preventDefault();
                setCurrentSelectedUser(e.nativeEvent.srcElement.dataset.email);
                setTimeout(() => {
                  setCurrentSelectedUser('');
                }, 3000);
              }}
              referrerPolicy="no-referrer"
            />
          );
        })}
        <p className="my-0 _text-xxsmall">{currentSelectedUser}</p>
      </div>
    </section>
  );
}
