import React from 'react';
function User({user,show}) {
  return <div onClick={show}>Id:{user.id} Login: {user.login} on click aqui</div>;
}
export default User;