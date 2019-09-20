import React, { Component } from 'react';
import UserList from '../components/UserList.jsx'

class ListUser extends Component {
    render() {
        return <React.Fragment>
            <div className={'userList'}>
                <UserList></UserList>
            </div>
        </React.Fragment>
    }
}
export default ListUser;