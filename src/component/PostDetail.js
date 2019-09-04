import React, { Component } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionCreator from '../store/action/action';

import { Redirect } from "react-router-dom";

const pStyle = {
    marginTop: '150px'
};

const commentStyle = {
    marginTop: '15px'
};

const textArea = {
    height: '100px',
    width: '1100px'
};

class PostDetail extends Component {
    constructor(props){
        super();
        this.state = {
            title: props.postDetailList.title,
            postBody: props.postDetailList.body
        }
    }
    componentDidMount() {
        this.props.getPostDetails(this.props.match.params.id);
        this.props.getComments(this.props.match.params.id);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    savePost = (e) => {
        let editObj = {'editValues': this.state, 'id': this.props.match.params.id}
        this.props.saveEditedPost(editObj);
    }

    render() {
        return (
            <div>
                <Navbar />
                <React.Fragment>
                    {
                        this.props.deleteClicked && (
                            <Redirect to="/posts" />
                        )
                    }
                    <h1 style={pStyle}>Post Detail</h1>
                    <div className="container">
                        <div className="row listBorder">
                            <div className="col">
                                {
                                    !this.props.editCommentFlag ? (
                                        <React.Fragment>
                                            <button style={commentStyle} className="btn btn-primary" onClick={this.props.editPost}>Edit Post</button>
                                            <h5 className="title-heading">{this.props.postDetailList.title}</h5>
                                            <p className="list-group-item-text"><span className="bodyBox">Posts</span> : {this.props.postDetailList.body}</p>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <input style={commentStyle} type="text" id="title" className="form-control" placeholder="Enter your new title" required autoFocus onChange={this.handleChange}/>
                                            <br/>
                                            <textarea style={textArea} id="postBody" type="text" placeholder="Enter your new body" onChange={this.handleChange}></textarea>
                                            <br />
                                            <button className="btn btn-success" onClick={this.savePost}>Save Post</button>
                                            <br /><br/>
                                        </React.Fragment>
                                    )
                                }
                                
                            </div>
                        </div>
                    </div>
                    <br />
                    {
                        this.props.loading && (
                            <h3>Loading Please wait .............</h3>
                        )
                    }
                    {
                        !this.props.loading && (
                            <button className="btn btn-danger" type="submit" onClick={()=> this.props.postDelete(this.props.match.params.id)}>Delete Post</button>
                        )
                    }
                     <br />
                    <br />
                    <h1>Comments : </h1>
                    {
                        this.props.selectedComments && this.props.selectedComments.length && this.props.selectedComments.map(comment => {
                            return (
                                <React.Fragment key={comment.id}>
                                    <div className="container">
                                        <div className="row listCommentBorder">
                                            <div className="col">
                                                <p className="list-group-item-text" style={commentStyle}><span className="bodyBox">Posts</span> : {comment.body}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                            </React.Fragment>
                            )
                        })
                    }
                    <br />
                    <button className="btn btn-primary" type="submit" onClick={()=> this.props.loadMoreComments(this.props.lastSelectedCommentId)}>Load More...</button>
                </React.Fragment>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        postDetailList: state.postDetailList,
        comments: state.comments,
        loading: state.loading,
        selectedComments: state.selectedComments,
        lastSelectedCommentId: state.lastSelectedCommentId,
        deleteClicked: state.deleteClicked,
        editCommentFlag: state.editCommentFlag
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPostDetails: (id) => dispatch(actionCreator.getPostDetails(id)),
        getComments: (id) => dispatch(actionCreator.getComments(id)),
        loadMoreComments: (id) => dispatch({'type':'LOAD_COMMENTS', action: id}),
        postDelete: (id) => dispatch(actionCreator.deletePost(id)),
        editPost: () => dispatch({'type':'EDIT_POST'}),
        saveEditedPost: (data) => dispatch({'type':'SAVE_EDIT_POST', action: data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);


