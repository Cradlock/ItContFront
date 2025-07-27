import React from "react";
import auth_host from "../index.js";
import axios from "axios";
import Cookies from "js-cookie";



class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      "username":"",
      "password":"",
    }
  }
  

  loginClick = (e) => {
    
    e.preventDefault();
    axios.post(auth_host.auth_host +"/auth/login/",
    {
      username:this.state.username,
      password:this.state.password,
    },
    {
      withCredentials: true, 
      headers: {
        'Content-Type': 'application/json'
      }
    }
    )
       .then(res => {
        //  console.log(res.data);
        //  Cookies.set("session_id",res.data.token);
         console.log(res);
        })
       .catch(ee => console.log(ee))
  }
  

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <main className="login-section">
        <div className="container">
          <form className="login-form"  onSubmit={this.loginClick}>
            
            <input
              className="login-name"
              type="text"
              name="username"
              id="name"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleInputChange}
           
            />

            <input
              className="login-password"
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputChange}
             
            />
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>
        </div>
       
      </main>
    );
  }
}

export default Login;
