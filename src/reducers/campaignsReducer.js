import { FETCH_CAMPAIGN } from '../actions';

export default function (state = {}, action) {
	switch(action.type) {
		case FETCH_CAMPAIGN:
			return action.payload.data
		default:
			return state;
	}
}