import React, {Component} from 'react';
import axios from 'axios';
class UserRepositorie extends Component {
    constructor(){
        super();
        this.state = {
            repos : [],
        };
        this.fetchData = this.fetchData.bind(this);
        this.getRepositories = this.getRepositories.bind(this);
    }
    fetchData(){
        axios.get(`/api/users/${this.props.username}/repos`)
            .then(res => {
                // console.log('fetch repo ', res.data)
            let repos = res.data.data.repositories;
            // let nextPage = res.data.data.nextPage.split('=')[1];
            // repos = [...this.state.users,...users]
            this.setState({ repos });
        })      
    }
    getRepositories(){
        // console.log('getRepositories');
        this.fetchData();
    }
    render(){
        // console.log('UserRepositorie render props ', this.props , 'state - > ', this.state)
        // if(this.state.repos.length == 0){
        //     this.fetchData();
        // }
        let lines =  this.state.repos.length   
            ? this.state.repos.map((el,index)=>{
                return <tr key={index}><td>{el.id}</td><td>{el.name}</td><td>{el.git_url}</td></tr>
            })
            : <tr><td></td><td></td><td></td></tr>
        return (
            <React.Fragment>
                <div className={'divTable'}>
                    <table border="1" className={'tableStyle'}><tbody><tr><td>ID</td><td>Name</td><td>Url</td></tr>{lines}</tbody></table>
                </div>
                <button onClick={this.getRepositories}>Buscar repositórios</button>
            </React.Fragment>
        )
    }
}
export default UserRepositorie;