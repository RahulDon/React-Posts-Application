const initialState = {
    postlists: [],
    postDetailList: {},
    comments: [],
    loading: false,
    selectedComments: [],
    selectedCommentLength: 10,
    lastSelectedCommentId: 0,
    deletedPostID: [],
    deleteClicked: false,
    editCommentFlag: false
};

const reducer = (state = initialState, action) => {
    const newState = {...state};

    switch (action.type){
        case 'POST_LIST':{
            newState.postlists = action.value;
            newState.loading = false;
            break;
        }
        case 'DETAIL_LIST':{
            newState.postDetailList = action.value;
            newState.loading = false;
            break;
        }
        case 'COMMENT_LIST':{
            newState.comments = action.value;
            newState.loading = false;
            for(var i=newState.lastSelectedCommentId;i<newState.selectedCommentLength;i++){
                newState.selectedComments.push(newState.comments[i]);
                newState.lastSelectedCommentId = newState.comments[i].id;
            }
            newState.selectedCommentLength += 10;
            break;
        }
        case 'LOAD_COMMENTS':{
            for(var i=newState.lastSelectedCommentId;i<newState.selectedCommentLength;i++){
                newState.selectedComments.push(newState.comments[i]);
                newState.lastSelectedCommentId = newState.comments[i].id;
            }
            newState.selectedCommentLength += 10;
            return newState;
        }
        case 'LOGOUT':{
            newState.postlists = [];
            newState.postDetailList = {};
            newState.comments = [];
            newState.loading = false;
            newState.selectedComments = [];
            newState.selectedCommentLength = 10;
            newState.lastSelectedCommentId = 0;
            newState.deletedPostID = [];
            newState.deleteClicked = false;
            newState.editCommentFlag = false;
            
            return newState;
        }
        case 'DELETE_POST':{
            newState.deletedPostID.push(Number(action.value));
            let currentPost = newState.postlists.filter((value)=>{
                if(newState.deletedPostID.indexOf(value.id) == -1){
                    return true;
                }
            })
            newState.postlists = currentPost;
            newState.deleteClicked = true;

            break;
        }
        case 'DELETE_FLAG':{
            newState.deleteClicked = false;
            break;
        }
        case 'EDIT_POST':{
            newState.editCommentFlag = true;
            break;
        }
        case 'SAVE_EDIT_POST':{
            if(newState.postDetailList.id == action.action.id){
                newState.postDetailList.title = action.action.editValues.title;
                newState.postDetailList.body = action.action.editValues.postBody;
            }
            newState.editCommentFlag = false;
            newState.postlists.map((value) => {
                if(value.id == action.action.id){
                    value.title = action.action.editValues.title;
                    value.body = action.action.editValues.postBody;
                }
            })
            return newState;
        }
        case 'LOADING':{
            newState.loading = true;
            break;
        }
    }

    return newState;
};

export default reducer;