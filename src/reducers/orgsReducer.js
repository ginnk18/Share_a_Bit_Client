import _ from 'lodash';
import { FETCH_ORGANIZATIONS, FETCH_ORGANIZATION } from '../actions';

export default function (state = {}, action) {
	switch(action.type) {
		case FETCH_ORGANIZATION:
			return action.payload.data
		case FETCH_ORGANIZATIONS:
			return _.mapKeys(action.payload.data, 'id');
		default:
			return state;
	}
}