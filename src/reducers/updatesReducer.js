import { FETCH_UPDATE } from '../actions';

export default function (state = {}, action) {
	switch(action.type) {
		case FETCH_UPDATE:
			console.log('action in FETCH_UPDATE reducer: ', action)
			return action.payload.data
		default:
			return state;
	}
}