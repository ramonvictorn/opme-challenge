import React from 'react';
import DetailsUser from './DetailsUser.js'
function User({user,show}) {
  return <h1 onClick={show}>Id:{user.id} Login: {user.login}</h1>;
}
export default User;