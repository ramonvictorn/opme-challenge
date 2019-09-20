import React from 'react';
function User({user,show}) {
  function log(){
    // console.log('aa');
    show()
  }
  return <div onClick={log}>Id:{user.id} Login: {user.login} on click aqui</div>;
  // return <div onClick={log}>on click aqui</div>;
}
export default User;