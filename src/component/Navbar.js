import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

import { connect } from 'react-redux';
import * as actionCreator from '../store/action/action';

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar fixed-top navbar-expand-sm navbar-dark px-sm-5">
                    <ul className="navbar-nav align-items-center">
                        <li className="navbar-item ml-5">
                            <Link to="/posts" className="nav-link">Home</Link>
                        </li>
                    </ul>
                    <Link to="/login" className="ml-auto">
                        <button className="logoutBtn" type="submit" onClick={this.props.reInitializeStateValue}>Logout</button>
                    </Link>
                </nav>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reInitializeStateValue: () => dispatch({'type':'LOGOUT'})
    }
}

export default connect(null, mapDispatchToProps)(Navbar);
