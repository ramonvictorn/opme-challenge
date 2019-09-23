import React, {Component} from 'react';
import axios from 'axios';
import UserRepositorie from '../components/UserRepositorie.jsx';
import Modal from 'react-bootstrap/Modal'

class DetailsUser extends Component {
  constructor(){
    super();
    this.state = {
      user : {},
    };
    this.fetchData = this.fetchData.bind(this);
    this.closeModalAndEraseData = this.closeModalAndEraseData.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  closeModalAndEraseData(){
    // console.log('closeModalAndEraseData ')
    this.props.closeModal();
    this.setState({user: {}})
  }
  fetchData(){
    // console.log('fechData on DetailsUser ', this.props)
    axios.get(`/api/users/${this.props.user.login}/details`)
        .then(res => {
        console.log('res.data', res.data)
        let userMoreInfo = res.data.data.user;
        let user = {...this.props.user,...userMoreInfo};
        this.setState({ user });
    })      
  }

  componentDidMount(){
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      alert('You clicked outside of me!');
    }
  }
  render(){
    console.log('DetailsUser - > props,', this.props, 'state -> ',this.state.user);
    if(!this.props.show){
      return <div></div>;
    }

    if(this.state.user.login == undefined){
      this.fetchData();
    }
    return (
      // <div className={'divDetails'}>
      //   <div className={'closeButton'} onClick={this.closeModalAndEraseData}>X</div>
      //   <h1><b>Id:</b> {this.state.user.id}</h1>
      //   <h1><b>Avatar profile:</b> {this.state.user.avatar_url}</h1>
      //   <h1><b>Login:</b> {this.state.user.login}</h1>
      //   <h1><b>Created at:</b> {this.state.user.created_at}</h1>
      //   <UserRepositorie username={this.state.user.login}></UserRepositorie>
      // </div>
      <Modal
        size="lg"
        show={this.props.show}
        onHide={this.closeModalAndEraseData}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Details User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={'divDetails'}>
            <h1><b>Id:</b> {this.state.user.id}</h1>
            <h1><b>Avatar profile:</b> {this.state.user.avatar_url}</h1>
            <h1><b>Login:</b> {this.state.user.login}</h1>
            <h1><b>Created at:</b> {this.state.user.created_at}</h1>
            <UserRepositorie username={this.state.user.login}></UserRepositorie>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}
export default DetailsUser;