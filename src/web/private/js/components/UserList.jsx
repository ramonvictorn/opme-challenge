import React, { Component } from 'react';
import axios from 'axios';
import User from '../presentational/User.js';
import DetailsUser from '../components/DetailsUser.jsx'

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
        this.toggleModal = this.toggleModal.bind(this);
    }
    toggleModal(){
        let newShowCurrent = !this.state.showDetailsUser;
        this.setState({ showDetailsUser:newShowCurrent});
    }
    toggleDetails(idx){
        console.log('toggleDetails ', idx, this.state.showDetailsUser);
        this.setState({ currentUser:idx });
        let newShowCurrent = !this.state.showDetailsUser;
        console.log('newShowCurrent ', newShowCurrent);
        this.setState({ showDetailsUser:newShowCurrent});
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
        }).catch(
            err=>{
                console.log('erro')
                this.setState({ users: 'error' });
            }
        )        
    }
    componentDidMount() {
        this.fetchData(this.state.nextPage)
    }

    render() {
        console.log('render UserLIst -> ', this.state )
        let users = this.state.users != 'error' 
            ? this.state.users.map((ele,idx)=>{
                return <User
                    key={idx} 
                    user={ele}
                    show={()=>{this.toggleDetails(idx)}}
                ></User>
                })
            :  <h1>Ocorreu um erro, tento novamente mais tarde :(</h1>
            
        return <React.Fragment>
            <h1>GitHub users list</h1>
            <DetailsUser toggle={()=>this.toggleModal()} show={this.state.showDetailsUser} user={this.state.users[this.state.currentUser]}></DetailsUser>
            {users}
            <button onClick={this.getMore}>Get more</button>
        </React.Fragment>
    }
}

export default UserList;