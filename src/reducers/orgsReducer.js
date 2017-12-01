import _ from 'lodash';
import { FETCH_ORGANIZATIONS, FETCH_ORGANIZATION } from '../actions';

export default function (state = {}, action) {
	switch(action.type) {
		case FETCH_ORGANIZATION:
			// console.log(action)
			return [...state, action.payload.data.organization, action.payload.data.campaigns, action.payload.data.userFavourite]
			// return  { ...state, action.payload.data.organization, action.payload.data.campaigns }
		case FETCH_ORGANIZATIONS:
			return _.mapKeys(action.payload.data, 'id');
		default:
			return state;
	}
}


// import _ from 'lodash';
// import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

// export default function(state = {}, action) {
// 	switch (action.type) {
// 		case DELETE_POST:
// 			return _.omit(state, action.payload);
// 			//look at the state object. If the stat has a key of the action.payload (our id)
// 			//just omit it from the state
// 			//returns a new state object with that particular post id not there anymore
// 		case FETCH_POST:
// 			// with ES5:
// 			// const post = action.payload.data;
// 			// const newState = { ...state }; 
// 			// // ...state ensures we get all the posts we've already fetched (and put into application state)
// 			// newState[post.id] = post;
// 			// return newState;

// 			//With ES6:
// 			return { ...state, [action.payload.data.id]: action.payload.data }
// 		case FETCH_POSTS:
// 			return _.mapKeys(action.payload.data, 'id');
// 		default:
// 			return state;
// 	}
// }