export const loading = () => {
    return {type: 'LOADING'};
}

export const postList = (data) => {
    return {type: 'POST_LIST', value: data};
}

export const postDetailList = (data) => {
    return {type: 'DETAIL_LIST', value: data};
}

export const getCommentList = (data) => {
    return {type: 'COMMENT_LIST', value: data};
}

export const deletePostList = (data) => {
    return {type: 'DELETE_POST', value: data};
}

export const getPostList = () => {
    return dispatch => {
        dispatch(loading());
        fetch(' https://jsonplaceholder.typicode.com/posts', {method: 'GET'}).then(response => response.json())
        .then(result => {
            dispatch(postList(result));
        }).catch(e => {
            //this.setState({lists: []});
        });
    }
};

export const getPostDetails = (id) => {
    return dispatch => {
        dispatch(loading());
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{method: 'GET'}).then(response => response.json())
        .then(result => {
            dispatch(postDetailList(result));
        }).catch(e => {
            //this.setState({lists: {}});
        });
    }
}

export const getComments = (id) => {
    return dispatch => {
        dispatch(loading());
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`,{method: 'GET'}).then(response => response.json())
        .then(result => {
            dispatch(getCommentList(result));

        }).catch(e => {
            //this.setState({lists: {}});
        });
    }
}

export const deletePost = (id) => {
    return dispatch => {
        dispatch(loading());
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{method: 'DELETE'}).then(response => response.json())
        .then(result => {
            dispatch(deletePostList(id));
        }).catch(e => {
            //this.setState({lists: {}});
        });
    }
}