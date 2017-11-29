import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import orgsReducer from './orgsReducer';
import userReducer from './userReducer';

export default combineReducers({
	auth: authReducer,
	orgs: orgsReducer,
	form: formReducer,
	user: userReducer 
})


//

// import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
// import PostsReducer from './reducer_posts';


// const rootReducer = combineReducers({
//   posts: PostsReducer,
//   form: formReducer
// });

// export default rootReducer;