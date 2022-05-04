import React, { Component } from "react";
import { Form, Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import axios from "axios";
class Register extends Component {
  
  constructor(props){
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  


 async handleSubmit(event){

    event.preventDefault();

    const {displayName, email, password, confirmPassword} = this.state; 

    const user = {displayName: displayName, email: email, password: password}
    console.log(user)
    axios.post("/user/register", {
      email: email,
      password: password,
      displayName: displayName
    }).then(response => {
      if (response.status === 200) {
      window.location = '/login';
    }
  })
  .catch(error => {
    console.log(error.response)
  });;

  };

  render() {

    return ( 
      
    <div>
        <Container>
        <div class="container" style={{width:"40%"}}>
            <br />
        <div>
            <h1 style={{textAlign: "center"}}>Join the Stack Overflow community</h1>
        </div>
        <br/>
            <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="formDisplayName">
              <Form.Label>Display name</Form.Label>
              <Form.Control type="text" placeholder="Enter Display Name" name="displayName" value={this.state.displayName} onChange={this.handleChange}  />
            </Form.Group>
            <br/>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange}  />
            </Form.Group>
            <br/>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
              <Form.Text className="text-muted">
               Passwords must contain at least eight characters, including at least 1 letter and 1 number.
              </Form.Text>
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
          <br />
          <Form.Text className="text-muted">
             By clicking “Sign up”, you agree to our terms of service, privacy policy and cookie policy
              </Form.Text>
        </div>
        <br />
        <br />
        <div class="container" style={{textAlign:"center"}}>
        Already have an account? <a href="/">Log In </a>
        <br />
        <br />
        Are you an employer? <a href="/">Sing up on Talent</a>
        </div>
        </Container>
    </div>
      );
    } 
}

export default Register;