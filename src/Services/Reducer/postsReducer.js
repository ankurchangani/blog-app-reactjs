const initialState = {
    posts: [],
    selectedPost: null,
    loading: false,
    error: null,
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "AddPostSuccess":
            return { ...state, posts: [...state.posts, action.payload] };

        case "FETCH_POSTS":
            return { ...state, posts: action.payload };

        case "REMOVE_POST":
            return{
                ...state,
            }

        case "EDIT_POST":
            return {
                ...state,
                posts: state.posts.map(post =>
                    post.id === action.payload.id ? { ...post, ...action.payload } : post
                ),
                selectedPost: action.payload, 
            };

        case "SET_SELECTED_POST":
            return { ...state, selectedPost: action.payload };

        default:
            return state;
    }
};

export default postsReducer;
