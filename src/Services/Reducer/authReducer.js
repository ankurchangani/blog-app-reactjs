const initialState = {
  user: { uid: localStorage.getItem("userId") || null }, 
  login: localStorage.getItem("userId") ? true : false,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'LoginSuccess':
          return { ...state, user: action.payload, login: true };
      case 'LoginError':
          return { ...state, error: action.payload };
      case 'LogoutSuccess':
          return { ...state, user: null, login: false };
      default:
          return state;
  }
};

export default authReducer;
