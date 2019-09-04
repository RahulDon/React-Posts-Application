import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

import { connect } from 'react-redux';
import * as actionCreator from '../store/action/action';

const pStyle = {
    marginTop: '150px',
};

class PostsList extends Component {
    constructor(props){
        super();
    }
    componentDidMount() {
        if(this.props.postlists.length == 0)
            this.props.getPostList();
        else{
            this.props.reInitializeDeleteFlag(); 
        }
    }
    render() {
        return (
            <div >
                <Navbar />
                <React.Fragment>
                    <h1 style={pStyle}>Home</h1>
                    <div className="container">
                        {this.props.postlists && this.props.postlists.length > 0 && this.props.postlists.map((list) => {
                            return (
                                <Link key={list.id} to={'/details/'+list.id}>
                                    <div className="row listBorder">
                                        <div className="col">
                                            <h4 className="title-heading">{list.title}</h4>
                                            <p className="list-group-item-text"><span className="bodyBox">Posts</span> : {list.body}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                        {this.props.loading && <h1>Loading.................</h1>}
                    </div>
                </React.Fragment>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        postlists: state.postlists,
        loading: state.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPostList: () => dispatch(actionCreator.getPostList()),
        reInitializeDeleteFlag: () => dispatch({'type':'DELETE_FLAG'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);


