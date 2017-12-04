import { FETCH_UPDATE } from '../actions';

export default function (state = {}, action) {
	switch(action.type) {
		case FETCH_UPDATE:
			return action.payload.data
		default:
			return state;
	}
}