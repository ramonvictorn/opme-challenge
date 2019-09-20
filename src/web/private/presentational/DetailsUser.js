import React from 'react';
function DetailsUser({user}) {
  const greeting = 'Hello Function Component! USER';
  return <h1>DetailsUser:{user.id} DetailsUser: {user.login}</h1>;
}
export default DetailsUser;