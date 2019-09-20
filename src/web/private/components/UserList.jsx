import React, { Component } from 'react';
import axios from 'axios';
import User from '../presentational/User.js';
import DetailsUser from '../presentational/DetailsUser.js'

class UserList extends Component {
    constructor(){
        super();
        this.state = {
            users : [],
            nextPage:0,
            showDetailsUser: false,
            currentUser: null,
        }
        this.getMore = this.getMore.bind(this);
        this.toggleDetails = this.toggleDetails.bind(this);
    }

    toggleDetails(idx){
        console.log('toggleDetails ', idx)
        this.setState({ currentUser:idx });
        // this.setState({ showDetailsUser:!this.state.showDetailsUser });
    }

    getMore(){
        this.fetchData(this.state.nextPage);
    }

    fetchData(sinceNumber){
        axios.get(`/api/users?since=${this.state.nextPage}`)
            .then(res => {
            let users = res.data.data.users;
            let nextPage = res.data.data.nextPage.split('=')[1];
            users = [...this.state.users,...users]
            this.setState({ users });
            this.setState({ nextPage });
        })      
    }
    componentDidMount() {
        this.fetchData(this.state.nextPage)
    }

    render() {
        console.log('render UserLIst -> ', this.state )
        let users = this.state.users.map((ele,idx)=>{
            console.log('idx ->', idx)
            return <User
                key={idx} 
                user={ele}
                show={()=>{this.toggleDetails(idx)}}
            ></User>
        })
        let DetailsUser = this.state.showDetailsUser ? <DetailsUser></DetailsUser> : '';
        return <React.Fragment>
            <h1>My React listtt</h1>
            {DetailsUser}
            {users}
            <button onClick={this.getMore}>Get more</button>
        </React.Fragment>
    }
}

export default UserList;