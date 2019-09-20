import React, {Component} from 'react';
import axios from 'axios';
import UserRepositorie from '../components/UserRepositorie.jsx';
class DetailsUser extends Component {
  constructor(){
    super();
    this.state = {
      user : {},
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(){
    console.log('fechData on DetailsUser ', this.props)
    axios.get(`/api/users/${this.props.user.login}/details`)
        .then(res => {
        console.log('res.data', res.data)
        let userMoreInfo = res.data.data.user;
        let user = {...this.props.user,...userMoreInfo}
        this.setState({ user });
    })      
  }
  render(){
    console.log('DetailsUser - > props,', this.props, this.state.user);
    if(!this.props.show){
      return <div></div>;
    }
    if(this.state.user.login == undefined){
      this.fetchData();
    }
    return (
      <div className={'divDetails'}>
        <h1>Id: {this.state.user.id}</h1>
        <h1>Avatar profile: {this.state.user.avatar_url}</h1>
        <h1>Login: {this.state.user.login}</h1>
        <h1>Created at: {this.state.user.created_at}</h1>
        <UserRepositorie></UserRepositorie>
      </div>
    )
    
  }
}
export default DetailsUser;