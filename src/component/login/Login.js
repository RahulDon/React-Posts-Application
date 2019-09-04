import React, { Component } from 'react';
import './Login.css';

export default class Login extends Component {
    constructor(props){
        super();
        this.state =  {
            username : '',
            email :'',
            password : ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    routeChange = (e) => {
        e.preventDefault();
        if(this.state.username == 'abc' && this.state.email == 'abc@abc.com' && this.state.password == '7654'){
            let path = `posts`;
            this.props.history.push(path);
        }else{
            alert('Sorry you are not a authorize person');
        }
    }
    render() {
        return (
            <div className="container logn-backround">
                <div className="row">
                    <div className="col-lg-10 col-xl-9 mx-auto">
                        <div className="card card-signin flex-row my-5">
                            <div className="card-img-left d-none d-md-flex">
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center">Login</h5>
                                <form className="form-signin" onSubmit={this.routeChange}>
                                    <div className="form-label-group">
                                        <input type="text" id="username" className="form-control" placeholder="Username" required autoFocus onChange={this.handleChange}/>
                                        <label htmlFor="username">Username</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input type="email" id="email" className="form-control" placeholder="Email address" required  onChange={this.handleChange}/>
                                        <label htmlFor="email">Email address</label>
                                    </div>
                                    
                                    <hr></hr>

                                    <div className="form-label-group">
                                        <input type="password" id="password" className="form-control" placeholder="Password" required  onChange={this.handleChange}/>
                                        <label htmlFor="password">Password</label>
                                    </div>

                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
