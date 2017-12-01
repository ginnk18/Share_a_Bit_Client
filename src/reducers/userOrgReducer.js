import { FETCH_ORGUSER } from '../actions';

export default function (state = {}, action) {
	switch(action.type) {
		case FETCH_ORGUSER:
			return action.payload.data
		default:
			return state;
	}
}

////


// import { FETCH_DONOR } from '../actions';

// export default function (state = {}, action) {
// 	switch(action.type) {
// 		case FETCH_DONOR:
// 			// console.log(action);
// 			// return [...state, action.payload.data.donor, action.payload.data.favouriteOrgs]
// 			// return [action.payload.data.donor, action.payload.data.favouriteOrgs]
// 			return action.payload.data
// 		default:
// 			return state;
// 	}
// }